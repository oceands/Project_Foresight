# Import necessary libraries and modules

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db


#USER DB MODEL

# Define the Users class that inherits from db.Model
class Users(db.Model):
    # Define the name of the database table associated with this class
    __tablename__ = 'users'

    # Define the columns of the table along with their data types and properties
    id = db.Column(db.Integer, autoincrement=True,primary_key=True)  # Primary key column
    username = db.Column(db.String(64), unique=True)  # Unique username column
    email = db.Column(db.String(64), unique=True, index=True)  # Unique email column, indexed for faster lookups
    #role = db.Column(db.String(64))  # Role column
    password = db.Column(db.String(128))  # Password column (hashed and stored securely)
    jwt_auth_active = db.Column(db.Boolean()) #Status of JWT Auth token
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)  # Date of user registration
    


    roles = db.relationship("Roles", secondary="user_roles", back_populates="users")
    # Define the __repr__ method to customize the string representation of the object

    def __repr__(self):
        return f"User {self.username}"

    # Define a method to save the user object to the database
    def save(self):
        db.session.add(self)
        db.session.commit()
        db.session.close()

    # Define a method to set the user's password securely (using hashing)
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # Define a method to check if a provided password matches the user's stored password (hashed)
    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Define a method to update the user's email
    def update_email(self, new_email):
        self.email = new_email

    # Define a method to update the user's username
    def update_username(self, new_username):
        self.username = new_username

    # Define a method to check if JWT (JSON Web Token) authentication is active for the user
    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    # Define a method to set the JWT authentication status for the user
    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    def get_role(self):
        return [role.name for role in self.roles]

    # Class method to retrieve an object from the database by its primary key 'id'
    # It takes the class itself (cls) and the 'id' as arguments
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    # Class method to retrieve an object from the database by its 'email' attribute
    # It takes the class itself (cls) and the 'email' as arguments
    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
    
    @classmethod
    def get_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
    

    #creating JSON objects of our class
    def to_dict(self):
        user_dict = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'date_joined': self.date_joined.strftime('%d-%m-%Y'),  # Convert datetime to ISO format
            'roles': [role.name for role in self.roles],
        }

        return user_dict


    