import base64
import json
import cv2
from flask import Response, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Namespace, Resource, fields
import requests
from sqlalchemy import or_
from models import Users, CameraDetails, DispatchDetails, Incidents, Dispatch_Active
from flask import request
from datetime import datetime, timezone, timedelta
import calendar

from extensions import db, jwt

# Import your existing modules and code here, including your models, validation functions, etc.

rest_api= Namespace("user",version="1.0", description="Regular user related operations")

user_details_model = rest_api.model('userDetailsModel', {
    "ID": fields.String(required=True),
    "Name": fields.String(required=True, min_length=2, max_length=32),
    "EmailAddress": fields.String(required=True),
    "JoiningDate": fields.String(required=True),
    "Role": fields.String(required=True),
    "Access": fields.String(required=True)
})


contact_details_model = rest_api.model('contactDetailsModel', {
    "FirstName": fields.String(required=True, min_length=2, max_length=32),
    "LastName": fields.String(required=True, min_length=2, max_length=32),
    "Email": fields.String(required=True),
    "ContactNumber": fields.String(required=True),
    "Address1": fields.String(required=True),
    "Address2": fields.String(required=True)
})

camera_details_model = rest_api.model('cameraDetailsModel', {
    "CameraName": fields.String(required=True, min_length=2, max_length=32),
    "CameraType": fields.String(required=True),
    "IPAddress": fields.String(required=True),
    "Port": fields.String(required=True),
    "OwnerName": fields.String(required=True, min_length=2, max_length=32),
    "Description": fields.String(required=True)
})

dispatch_details_model = rest_api.model('dispatchDetailsModel', {
    'Name': fields.String(required=True, min_length=2, max_length=32),
    'Type': fields.String(required=True),
    'Number': fields.String(required=True),
    'Location': fields.String(required=True),
    'Description': fields.String(required=True,  min_length=2, max_length=150)
})


golang_server_url = "http://root:foresight@127.0.0.1:8083"

#Dashboard APIS

#Testing
@rest_api.route('/dashboard/getUname')
class Dashboard(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        User = Users.get_by_id (user_id)
        userName= User.username

        return {"success": True, "userName": userName,"msg": "done"}, 200
    
#Get Fire count 
@rest_api.route('/incidents/count/fire')
class CountFireIncidents(Resource):
    def get(self):
        try:
            # Count incidents with type='fire'
            fire_incident_count = Incidents.query.filter(or_(Incidents.module == 'fire', Incidents.module == 'smoke')
).count()

            return {
                "success": True,
                "fire_incident_count": fire_incident_count,
                "message": "Successfully retrieved the count of fire incidents"
            }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching fire incident count: {str(e)}"
            }, 500



# Count incidents with type='weapon'
@rest_api.route('/incidents/count/weapon')
class CountWeaponIncidents(Resource):
    def get(self):
        try:
            # Count incidents with type='weapon'
            weapon_incident_count = Incidents.query.filter(
    or_(Incidents.module == 'rifle', Incidents.module == 'handgun')
).count()
            db.session.close()
            return {
                "success": True,
                "weapon_incident_count": weapon_incident_count,
                "message": "Successfully retrieved the count of weapon incidents"
            }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching weapon incident count: {str(e)}"
            }, 500

# Count all incidents with status='verified'
@rest_api.route('/incidents/count/verified')
class CountVerifiedIncidents(Resource):
    def get(self):
        try:
            # Count all incidents with status='verified'
            verified_incident_count = Incidents.query.filter_by(type='Verified').count()

            return {
                "success": True,
                "verified_incident_count": verified_incident_count,
                "message": "Successfully retrieved the count of verified incidents"
            }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching verified incident count: {str(e)}"
            }, 500

#Dispatch count by type
@rest_api.route('/dispatch/count')
class CountDispatchesByType(Resource):
    def get(self):
        # Predefined dispatch types with default counts
        dispatch_counts = {
            "fire": 0,
            "weapon": 0,
            "others": 0
        }

        # Querying the database for counts
        results = db.session.query(
        Incidents.type, db.func.count(Dispatch_Active.id).label('count')
        ).join(Incidents, Dispatch_Active.incident_id == Incidents.incidents_id).group_by(Incidents.type).all()

        db.session.close()
        # Update the counts based on database results
        for result in results:
            dispatch_counts[result.type] = result.count

        # Map types to colors
        type_colors = {
            "fire": "#3f51b5",  
            "weapon": "#ff5722",  
            "others": "#000000"           
        }

        # Format the response
        data = [{
            "id": dispatch_type,
            "label": dispatch_type.replace('_', ' ').capitalize(),
            "value": count,
            "color": type_colors.get(dispatch_type, "#fefffe")  # Default color if type not found
        } for dispatch_type, count in dispatch_counts.items()]

        return jsonify(data)

#monthly summery count 
@rest_api.route('/incidents/monthly-count')
class IncidentsMonthlyCount(Resource):
    def get(self):
        try:
            # Query the database to get monthly counts of incidents
            monthly_counts = db.session.query(
                db.func.to_char(Incidents.date, 'YYYY-MM').label('month'),
                db.func.count().label('total')
            ).group_by('month').order_by('month').all()

            db.session.close()

            # Create a list of months (abbreviated)
            months = [calendar.month_abbr[i] for i in range(1, 13)]

            # Format the result for the response
            formatted_data = [{'x': month, 'y': 0} for month in months]
            for count in monthly_counts:
                month_index = int(count[0].split('-')[1])  # Get the month number
                formatted_data[month_index - 1]['y'] = count[1]  # Update the count for the month

            result = [
                {
                    'id': 'Incidents',
                    'color': '#3f51b5',
                    'data': formatted_data
                }
            ]

            return jsonify(result)
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching monthly counts of incidents: {str(e)}"
            }, 500

#User Management API's

#Add User to the Database
# Using the same Auth/Register API

#Edit User in the Database


#Delete User in the Database
# Using the same Auth/Delete API

#Get User from Database
@rest_api.route('/usermgnt/get_users', defaults={'user_id': None})
class UsersResource(Resource):
    def get(self, user_id=None):
        try:
            if user_id:
                # If a user_id is provided, fetch a single user
                user = Users.query.get_or_404(user_id)
                return {"success": True, "user": user.to_dict()}, 200
            else:
                # Fetch all users
                users = Users.query.all()
                return {
                    "success": True,
                    "users": [user.to_dict() for user in users]
                }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching users: {str(e)}"
            }, 500





# Setting API's #

#Add camera to the database 
@rest_api.route('/settings/camsettings/add')
class addCamera(Resource):
    
    @rest_api.expect(camera_details_model, validate=True)
    def post(self):
        # Parse the incoming JSON data
        camera_data = request.get_json()
        print (camera_data)

        # Create a new CameraDetails object with the received data
       
        CameraName=camera_data['CameraName']
        CameraType=camera_data['CameraType']
        IPAddress=camera_data['IPAddress']
        Port=camera_data['Port']
        OwnerName=camera_data['OwnerName']
        Option=camera_data['Option']
        Description=camera_data['Description']
        
        portactive=""


        camera_exist= CameraDetails.get_by_IP(IPAddress)


         # Check if email exists
        if  camera_exist:
            
            return {"success": False, "msg": "This camera already exists."}, 400
        
        if not Port:

            portactive=""
        else:
            portactive=":"+Port

        # Save the new camera details to the database
        new_camera=CameraDetails(CameraName=CameraName, CameraType=CameraType, IPAddress=IPAddress,Port=Port,OwnerName=OwnerName,Option=Option,Description=Description)
        new_camera.save()

        # Return the added camera details as the response

        # Craft the Add Stream request for the Golang server
        stream_id = new_camera.id  # Assuming CameraDetails.id is the stream ID
        add_stream_request = {
            "name": CameraName,
            "channels": {
                "0": {
                    "name": f"ch1_{stream_id}",
                    "url": f"rtsp://{IPAddress}{portactive}/{Option}",
                    "on_demand": True,
                    "debug": False,
                    "status": 0
                },
            }
        }

        # Send the Add Stream request to the Golang server
        add_stream_endpoint = f"/stream/{stream_id}/add"
        add_stream_url = f"{golang_server_url}{add_stream_endpoint}"
        headers = {"Content-Type": "application/json"}
        response = requests.post(add_stream_url, json=add_stream_request, headers=headers)

        # Check the response from the Golang server
        if response.status_code == 200:
            return {"success": True, "CameraID": new_camera.id, "message": "Camera added successfully"}, 201
        else:
            return {"success": False, "msg": f"Failed to add stream to Golang server. {response.text}"}, 500

    
#Edit Camera In db
@rest_api.route('/settings/camsettings/edit')
class editCamera(Resource):

    @rest_api.expect(camera_details_model, validate=True)
    def post(self):
        # Parse the incoming JSON data
        camera_data = request.get_json()

        # Retrieve the existing camera from the database
        existing_camera = CameraDetails.get_by_IP(self)

        # Update the camera details with the received data
        newCameraName = camera_data.get('CameraName')
        newCameraType = camera_data.get('CameraType')
        newIPAddress = camera_data.get('IPAddress')
        newPort = camera_data.get('Port')
        newOwnerName = camera_data.get('OwnerName')
        newDescription = camera_data.get('Description')

        # Check if camera exists
        if  existing_camera:
            return {"success": False, "msg": "This camera already exists."}, 400

        if newCameraName:
                self.set_camera_name(newCameraName)
        
        if newCameraType:
                self.set_camera_type(newCameraType)

        if newIPAddress:
                self.set_ip_address(newIPAddress)
        
        if newPort:
                self.set_port(newPort)

        if newOwnerName:
                self.set_owner_name(newOwnerName)

        if newDescription:
                self.set_description(newDescription)



        # Save the updated camera details to the database
        self.save()

        # Return the updated camera details as the response
        return {
            "success":True,
            "CameraID":existing_camera.id,
            "message": "Camera updated successfully"
        }, 201  # HTTP status code for Created
    

#Delete Camera In db
@rest_api.route('/settings/camsettings/delete/<int:camera_id>')
class deleteCamera(Resource):
    #Delete Camera In db
    def delete(self, camera_id):
        # Retrieve the existing camera from the database
        existing_camera = CameraDetails.get_by_id(camera_id)

        # Delete the camera from the database
        db.session.delete(existing_camera)
        db.session.commit()
        db.session.close()

        delete_stream_endpoint = f"/stream/{camera_id}/delete"
        delete_stream_url = f"{golang_server_url}{delete_stream_endpoint}"
        print(delete_stream_url)
        response = requests.get(delete_stream_url)

        # Return a success message as the response

        # Check the response from the Golang server
        if response.status_code == 200:
            return {
            "message": "Camera deleted successfully"
        }, 200  # HTTP status code for OK
        else:
            return {"success": False, "msg": f"Failed to delete stream from Golang server. {response.text}"}, 500
        

#Get Camera In db
@rest_api.route('/settings/camsettings', defaults={'camera_id': None})
@rest_api.route('/settings/camsettings/<int:camera_id>')
class GetIncidents(Resource):
    
    def get(self, camera_id=None):
        try:
            if camera_id:
                # If an camera_id is provided, fetch a single incident
                Camera = CameraDetails.query.get_or_404(camera_id)
                CameraDetails.query.session.close()
                return {"success": True, "camera": Camera.to_dict()}, 200
            else:
                # Fetch all camera
                Cameras = CameraDetails.query.all()
                return {
                    "success": True,
                    "camera": [Camera.to_dict() for Camera in Cameras]
                }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching cameras: {str(e)}"
            }, 500




#Add dispatch to the database 
@rest_api.route('/settings/dispatchsettings/add')
class DispatchSettingsResource(Resource):

    @rest_api.expect(dispatch_details_model, validate=True)
    def post(self):
        # Parse the incoming JSON data
        dispatch_data = request.get_json()

        # Create a new DispatchDetails object with the received data
       
        Name=dispatch_data['Name'],
        Type=dispatch_data['Type'],
        Number=dispatch_data['Number'],
        Location=dispatch_data['Location'],
        Description=dispatch_data['Description']

        dispatch_exist=DispatchDetails.get_by_number(Number)
        if  dispatch_exist:
            
            return {"success": False, "msg": "This dispatch already exists."}, 400
        
        
        # Save the new dispatch details to the database
        new_dispatch=DispatchDetails(Name=Name, Type=Type,Number=Number, Location=Location,Description=Description)
        new_dispatch.save()

        # Return the added dispatch details as the response
        return {
            "success":True,
            "CameraID":new_dispatch.id,
            "message": "Camera added successfully"
        }, 201  # HTTP status code for Created
    
# Edit Dispatch in db
@rest_api.route('/settings/dispatchsettings/edit')
class EditDispatch(Resource):

    @rest_api.expect(dispatch_details_model, validate=True)
    def post(self):
        # Parse the incoming JSON data
        dispatch_data = request.get_json()

        # Retrieve the existing dispatch from the database
        existing_dispatch = DispatchDetails.get_by_id(dispatch_data['DispatchID'])

        # Update the dispatch details with the received data
        new_name = dispatch_data.get('Name')
        new_type = dispatch_data.get('Type')
        new_number = dispatch_data.get('Number')
        new_location = dispatch_data.get('Location')
        new_description = dispatch_data.get('Description')

        # Check if dispatch exists
        if not existing_dispatch:
            return {"success": False, "msg": "This dispatch does not exist."}, 404

        if new_name:
            existing_dispatch.set_name(new_name)

        if new_type:
            existing_dispatch.set_type(new_type)

        if new_number:
            existing_dispatch.set_number(new_number)

        if new_location:
            existing_dispatch.set_location(new_location)

        if new_description:
            existing_dispatch.set_description(new_description)

        # Save the updated dispatch details to the database
        existing_dispatch.save()

        # Return the updated dispatch details as the response
        return {
            "success": True,
            "DispatchID": existing_dispatch.id,
            "message": "Dispatch updated successfully"
        }, 200  # HTTP status code for OK


# Delete Dispatch in db
@rest_api.route('/settings/dispatchsettings/delete/<int:dispatch_id>')
class DeleteDispatch(Resource):

    def delete(self, dispatch_id):
        # Retrieve the existing dispatch from the database
        existing_dispatch = DispatchDetails.get_by_id(dispatch_id)

        # Check if dispatch exists
        if not existing_dispatch:
            return {"success": False, "msg": "This dispatch does not exist."}, 404

        # Delete the dispatch from the database
        db.session.delete(existing_dispatch)
        db.session.commit()
        db.session.close()

        # Return a success message as the response
        return {
            "message": "Dispatch deleted successfully"
        }, 200  # HTTP status code for OK


# Get Dispatches from the database
@rest_api.route('/settings/dispatchsettings', defaults={'dispatch_id': None})
@rest_api.route('/settings/dispatchsettings/<int:dispatch_id>')
class GetDispatches(Resource):

    def get(self, dispatch_id=None):
        try:
            if dispatch_id:
                # If a dispatch_id is provided, fetch a single dispatch
                dispatch = DispatchDetails.query.get_or_404(dispatch_id)
                return {"success": True, "dispatch": dispatch.to_dict()}, 200
            else:
                # Fetch all dispatches
                dispatches = DispatchDetails.query.all()
                return {
                    "success": True,
                    "dispatch": [dispatch.to_dict() for dispatch in dispatches]
                }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching dispatches: {str(e)}"
            }, 500



