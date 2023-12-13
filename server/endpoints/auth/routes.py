
#Flask Imports
from flask import request
from flask_restx import Namespace, Resource, fields


#JWT imports
from flask_jwt_extended import create_refresh_token, get_jwt, get_jwt_identity, create_access_token, jwt_required, decode_token

#Email validation
from email_validator import EmailNotValidError, validate_email

#Databse Models
from models import Users, Roles, UserRole

#custom in built modules created
from .password_validation import is_strong_password
from .helpers import add_token_to_database, revoke_token

#extensions
from extensions import db, jwt



rest_api= Namespace("auth",version="1.0", description="Authentication related operations")


#Required Feilds/Models while using the flask_restex APIs

signup_model = rest_api.model('SignUpModel', {
    "Fname": fields.String(required=True, min_length=2, max_length=32),
    "Lname": fields.String(required=True, min_length=2, max_length=32),
    "email": fields.String(required=True, min_length=10, max_length=254),
    "role": fields.String(required=True, min_length=4, max_length=32),
    "password": fields.String(required=True, min_length=8, max_length=128)
})

login_model = rest_api.model('LoginModel', {
    "email": fields.String(required=True, min_length=10, max_length=64),
    "password": fields.String(required=True, min_length=8, max_length=128)
})

user_edit_model = rest_api.model('UserEditModel', {
    "user_id": fields.Integer(required=True),
    "username": fields.String(required=True, min_length=2, max_length=32),
    "email": fields.String(required=True, min_length=4, max_length=64)
})


# Password Update Model
password_update_model = rest_api.model('PasswordUpdateModel', {
    "user_id": fields.Integer(required=True),
    "old_password": fields.String(required=True, min_length=8, max_length=128),
    "new_password": fields.String(required=True, min_length=8, max_length=128)
})

#Signup Api / CREATE User
@rest_api.route('/api/users/register')
class Register(Resource):

    @rest_api.expect(signup_model, validate=True)
    def post(self):


        request_data=request.get_json()
        _Fname =request_data.get("Fname")
        _Lname =request_data.get("Lname")
        _email = request_data.get("email")
        _role = request_data.get("role")
        _passwd = request_data.get("password")

        email_exist = Users.get_by_email(_email)

        #check how valid the email is 
        try:
            valid=validate_email(_email)
            

        except EmailNotValidError as e:

            return {"success": False, "msg": "This email format is invalid"}


        # Check if email exists
        if  email_exist:
            
            return {"success": False, "msg": "This email already exists."}, 400
        


        # Check the role 
        role = Roles.get_by_slug(_role)
        if not role:
            return {'error': f'Role "{role}" not found'}, 400


        # Check password strength
        if is_strong_password(_passwd)==False:
       
            return {"success": False, "msg": "strong password must have at least one uppercase letter (A-Z), at least one lowercase letter (a-z), at least one digit (0-9), at least one special character from the set: !@#$%^&*, and a minimum length of 8 characters."}, 400
        

        #Save the user in the DB
        _uname= _Fname+"."+_Lname
        new_user = Users(username=_uname, email= _email )
        new_user.set_password(_passwd)

        new_user.save()
        

        print(new_user.id)
      
        user_role = UserRole(user_id=new_user.id, role_id=role.id)
        user_role.save()
 
      
        return {"success": True, "UserID": new_user.id,"msg": "The user was successfully registered"}, 201


#login for the registered user
@rest_api.route('/api/users/login')
class LoginUser(Resource):
    
    @rest_api.expect(login_model, validate= True)
    def post(self):

        if not request.is_json:
            return {"msg": "Missing JSON in request"}, 400

        req_data = request.get_json()
       
        _email = req_data.get("email")
        _passwd = req_data.get("password")

        user_exist = Users.get_by_email(_email)

        if not user_exist:
            return {"success": False, "msg": "Incorrect Credentials"}, 400
        
        if not user_exist.check_password(_passwd):
            return {"success": False, "msg": "Incorrect Credentials"}, 400
        
        #create_access_token
        access_token = create_access_token(identity=user_exist.id)
        refresh_token = create_refresh_token(identity=user_exist.id)

        user=Users.get_by_id(user_exist.id)
        user.set_jwt_auth_active(True)
        role= user_exist.get_role()
        user_info=user_exist.to_dict()
        user.save()
        

        #Add the tokens to the database
        add_token_to_database(access_token)
        add_token_to_database(refresh_token)
        return {"success": True, "Access_token": access_token, "Refresh_token": refresh_token,"Role": role ,"user": user_info}, 200



# Password Update Endpoint
@rest_api.route('/api/users/update_password')
class UpdatePassword(Resource):
    @rest_api.expect(password_update_model, validate=True)
    @jwt_required()
    def post(self):
        req_data = request.get_json()
        user_id = req_data.get("user_id")
        old_password = req_data.get("old_password")
        new_password = req_data.get("new_password")

        # Fetch the user object based on user_id
        user = Users.query.get(user_id)
        if not user:
            return {"success": False, "msg": "User not found"}, 404

        # Check if old password is correct
        if not user.check_password(old_password):
            return {"success": False, "msg": "Incorrect old password"}, 401

        # Check new password strength
        if not is_strong_password(new_password):
            return {"success": False, "msg": "New password is not strong enough"}, 400

        # Set new password
        user.set_password(new_password)
        user.save()

        return {"success": True, "msg": "Password updated successfully"}, 200
    
    
#Deleteing the user
@rest_api.route('/api/users/delete/<int:user_id>')  
class UserDeletionResource(Resource):
    def delete(self,user_id):

        # Delete the user by ID
        user = Users.get_by_id(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            db.session.close()
            return {'message': 'User deleted successfully'}, 200
        else:
            return {'error': 'User not found'}, 404
        


#Editing username or email or both 
#protected route 2
@rest_api.route('/api/users/edit')  
class EditUser(Resource):
        
    @rest_api.expect(user_edit_model, validate=True)
    @jwt_required()
    def post(self):
        req_data = request.get_json()
        target_user_id = req_data.get("user_id")  # Get the target user ID from the request
        new_uname = req_data.get("username")
        new_email = req_data.get("email")
        new_role_id = req_data.get("role_id")

        # Fetch the target user object based on user_id
        user = Users.query.get(target_user_id)
        if not user:
            return {"success": False, "msg": "User not found"}, 404

        # Email format validation
        if new_email:
            try:
                valid = validate_email(new_email)
            except EmailNotValidError as e:
                return {"success": False, "msg": "This email format is invalid."}

            # Check if email exists for another user
            email_exist = Users.query.filter(Users.id != target_user_id, Users.email == new_email).first()
            if email_exist:
                return {"success": False, "msg": "This email already exists."}, 400
            user.email = new_email  # Update email

        if new_uname:
            user.username = new_uname  # Update username

        # Update role
        if new_role_id is not None:
            self.update_user_role(target_user_id, new_role_id)

        user.save()  # Save user updates

        return {"success": True, "msg": "User records updated successfully!"}, 200

    def update_user_role(self, user_id, new_role_id):
        # Find existing user role
        existing_user_role = UserRole.query.filter_by(user_id=user_id).first()

        if existing_user_role:
            # Update existing role
            existing_user_role.role_id = new_role_id
        else:
            # Add new role
            new_user_role = UserRole(user_id=user_id, role_id=new_role_id)
            new_user_role.save()

        db.session.commit()  # Commit the changes to the database
        
    #Refresh the Token
    #protected route 3
    @rest_api.route('/api/users/refresh')
    class RefreshToken(Resource):
        @jwt_required(refresh=True)
        def post(self):
            user_id = get_jwt_identity()
            Access_token = create_access_token(identity=user_id)
            add_token_to_database(Access_token)
            return {"success": True,"Access_token": Access_token}, 201


    #Logout User 
    #protected route 4           
    @rest_api.route('/api/users/logout')
    class LogoutUser(Resource):
        @jwt_required()
        def post(self):
            req=request.get_data().decode('UTF-8').replace('"','')  
            decode_token(req)
            reftoken=decode_token(req)
            jtiref=reftoken["jti"]

            jti=get_jwt()["jti"]
            user_id = get_jwt_identity()
            revoke_token(jti, user_id)
            revoke_token(jtiref,user_id)


            user=Users.get_by_id(user_id)
            print("> User LoggedOut:"+user.username)
            user.set_jwt_auth_active(False)
            user.save()
            return {"success": True, "msg": "User logged-out successfully !"}, 200
    
        
