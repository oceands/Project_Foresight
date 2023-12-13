from datetime import datetime, timedelta
from io import BytesIO
import time
import cv2
import requests
import calendar
import os

#Flask Imports
from flask import Response, jsonify, send_file
from flask_restx import Namespace, Resource, fields

#JWT imports
from flask_jwt_extended import jwt_required, get_jwt_identity

#ML requirments
import numpy as np
from ultralytics import YOLO

from sqlalchemy import or_
from models import Users, CameraDetails, DispatchDetails, Dispatch_Active , Detections, Notifications, Incidents,Videos, Reports
from flask import request

#extensions
from extensions import db, jwt
from twilio.rest import Client
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from PIL import Image


# Get the directory of the current file (routes.py)
current_dir = os.path.dirname(__file__)


# Construct paths relative to the current directory
modelWeapons_path = os.path.join(current_dir, '..', 'auth', 'weaponmodel.pt')
modelFire_path = os.path.join(current_dir, '..', 'auth', 'firemodel.pt')

# Initialize your models with the relative paths
modelWeapons = YOLO(modelWeapons_path)
modelFire = YOLO(modelFire_path)


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

# Dashboard API's #

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


# Notification API #
@rest_api.route('/notifications', defaults={'notification_id': None})
@rest_api.route('/notifications/<int:notification_id>')
class GetNotifications(Resource):
    
    def get(self, notification_id=None):
        try:
            
            notifications = Notifications.query.filter(Notifications.type != 'Ignored').order_by(Notifications.id).all()


            return {
                "success": True,
                "notifications": [
                    {
                        'id': n.id, 
                        'date': n.date.isoformat() if n.date else None,
                        'type': n.type, 
                        'module': n.module, 
                        'camera': n.camera, 
                        'status': n.status
                    } for n in notifications
                ]
            }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching notifications: {str(e)}"
            }, 500
    
    def post(self, notification_id=None):
        try:
            data = request.get_json()
            new_notification = Notifications(
                date=data.get("date", datetime.utcnow()),
                type=data["type"],
                module=data["module"],
                camera=data["camera"],
                status=data["status"]
            )
            db.session.add(new_notification)
            db.session.commit()
            db.session.close()
            return {"success": True, "msg": "Notification created successfully."}, 201
        except Exception as e:
            return {"success": False, "msg": f"Error creating notification: {str(e)}"}, 500
    
    def put(self, notification_id=None):
        if notification_id is None:
         return {"success": False, "msg": "Notification ID not provided"}, 400

        try:
            notification = Notifications.query.get(notification_id)
            if not notification:
                return {"success": False, "msg": "Notification not found"}, 404
        
            data = request.get_json()
            status = data.get('status')
            type_ = data.get('type')

            updated = False
            if status:
                notification.status = status
                updated = True

            if type_:
                notification.type = type_
                updated = True

            if updated:

                db.session.commit()
                db.session.close()
                return {"success": True, "msg": "Notification updated successfully."}, 200
            else:
                return {"success": False, "msg": "Status not provided"}, 400
        except Exception as e:
            return {"success": False, "msg": f"Error updating notification: {str(e)}"}, 500
        
@rest_api.route('/notifications/videos/<int:notification_id>')
class GetVideoByNotification(Resource):
    def get(self, notification_id):
        try:
            # Retrieve the video associated with the notification ID
            video = Videos.get_by_notification_id(notification_id)
            if video is None or len(video) == 0:
                return {"success": False, "msg": "No video found for the provided notification ID."}, 404

            video_data = video[0].video_data

            # Create a response object with the binary data
            response = Response(video_data, mimetype='video/mp4')
            response.headers['Content-Disposition'] = f'attachment; filename=video_{notification_id}.mp4'

            return response

        except Exception as e:
            return {"success": False, "msg": str(e)}, 500

@rest_api.route('/notifications/get_image/<int:notification_id>')
class GetImage(Resource):
    
 def get(self, notification_id):
    detection = Detections.query.filter_by(notification_id=notification_id).first()
    if detection and detection.image_data:
        return send_file(
                   BytesIO(detection.image_data),
                   mimetype='image/jpeg',
                   as_attachment=False)
    else:
        return 'Image not found', 404
    


# Incidents API's #
@rest_api.route('/incidents', defaults={'incident_id': None})
@rest_api.route('/incidents/<int:incident_id>')
class GetIncidents(Resource):
    
    def get(self, incident_id=None):
        try:
            if incident_id:
                # If an incident_id is provided, fetch a single incident
                incident = Incidents.query.get_or_404(incident_id)
                return {"success": True, "incident": incident.to_dict()}, 200
            else:
                # Fetch all incidents
                incidents = Incidents.query.all()
                return {
                    "success": True,
                    "incidents": [incident.to_dict() for incident in incidents]
                }, 200
        except Exception as e:
            return {
                "success": False,
                "msg": f"Error fetching incidents: {str(e)}"
            }, 500

    # Implement POST, PUT, DELETE methods for Incidents similar to Notifications if needed

    def post(self, incident_id = None):
        try:
            data = request.get_json()
            
            # Check if 'notification_id' is provided and if it's a valid integer
            notification_id = data.get('notification_id')
            if notification_id is None:
                return {"success": False, "msg": "notification_id is required"}, 400

            # Fetch the associated notification
            notification = Notifications.query.get(notification_id)
            if notification is None:
                return {"success": False, "msg": f"No Notification found with id {notification_id}"}, 404

            # Use data from the notification to create the incident
            new_incident = Incidents(
                notification_id=notification.id,
                date=notification.date, # Assuming you want to use the same date as the notification
                type=notification.type, # You may also use data from the 'notification' object
                module=notification.module,
                camera=notification.camera,
                status=notification.status
            )

            incident_info= new_incident.to_dict()

            db.session.add(new_incident)
            db.session.commit()
            db.session.close()
            
            
            return {"success": True, "msg": "Incident created successfully.", "incident": incident_info}, 201
        
            
        except Exception as e:
            db.session.rollback()
            db.session.close()
            return {"success": False, "msg": f"Error creating incident: {e}"}, 500
        


# User Management API's #

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




# Twillio functions #

def send_sms(to_numbers, body):
    account_sid = 'AC019dcd518115af52aba58ddc27f9f644'  # Replace with your Twilio account SID
    auth_token = 'cb7795fa17ecc131747603c10b61083e'    # Replace with your Twilio auth token
    from_number = '+16464034549' # Replace with your Twilio phone number

    client = Client(account_sid, auth_token)

    for number in to_numbers:
        message = client.messages.create(
            body=body,
            from_=from_number,
            to=number
        )
        print(f"Message sent to {number}: {message.sid}")

# Function to send whatsapp message on dispatch #
def send_whatsapp_message(to_numbers, body):
    account_sid = 'AC019dcd518115af52aba58ddc27f9f644'  # Replace with your Twilio account SID
    auth_token = 'cb7795fa17ecc131747603c10b61083e'    # Replace with your Twilio auth token
    from_whatsapp_number = 'whatsapp:+14155238886'      # Replace with your Twilio WhatsApp number

    client = Client(account_sid, auth_token)

    for number in to_numbers:
        whatsapp_destination = f'whatsapp:{number}'
        message = client.messages.create(
            body=body,
            from_=from_whatsapp_number,
            to=whatsapp_destination
        )
        print(f"WhatsApp message sent to {number}: {message.sid}")

    
# Function to send call on dispatch #
def make_phone_call(to_numbers, message):
    account_sid = 'AC019dcd518115af52aba58ddc27f9f644'  # Replace with your Twilio account SID
    auth_token = 'cb7795fa17ecc131747603c10b61083e'    # Replace with your Twilio auth token
    twilio_number = '+16464034549'                      # Replace with your Twilio phone number

    client = Client(account_sid, auth_token)

    for number in to_numbers:
        call = client.calls.create(
            twiml=f'<Response><Say>{message}</Say></Response>',
            to=number,
            from_=twilio_number
        )
        print(f"Call initiated to {number}: {call.sid}")


# Function to detect motion between two frames
def is_motion_detected(current_frame, reference_frame, threshold=50):
    # Convert frames to grayscale
    gray_current = cv2.cvtColor(current_frame, cv2.COLOR_BGR2GRAY)
    gray_reference = cv2.cvtColor(reference_frame, cv2.COLOR_BGR2GRAY)

    # Compute the absolute difference between the current frame and reference frame
    frame_delta = cv2.absdiff(gray_reference, gray_current)

    # Threshold to get the regions with significant changes
    thresh = cv2.threshold(frame_delta, threshold, 255, cv2.THRESH_BINARY)[1]

    # If there are white pixels in the thresholded image, motion is detected
    return np.sum(thresh) > 0

# Reports API's #

@rest_api.route('/reports', methods=['GET', 'POST'])
class ReportResource(Resource):
    
    def post(self):
        # Extract username from request headers or form data
        username = request.headers.get('username') or request.form.get('username')

        # Find user by username
        user = Users.query.filter_by(username=username).first()

        # Proceed only if user is found
        if not user:
            return {"success": False, "message": "User not found."}, 404

        # Extract form data
        title = request.form.get('title')
        incident_id = request.form.get('incident_id')
        comments = request.form.get('comments')

        # Extract the file from the form data
        report_file = request.files.get('report_file')
        file_content = None
        if report_file:
            file_content = BytesIO(report_file.read()).getvalue()

        # Use the username directly
        created_by = username

         # Fetch Incident related to this report
        incident = Incidents.query.get(incident_id)
        if not incident or not incident.notification:
            return {"success": False, "message": "Incident or related notification not found"}, 404
        

        notification = incident.notification
        
        # Fetch Detections related to this notification
        detections = Detections.get_by_notification_id(notification.id)


        pdf_buffer = BytesIO()
        p = canvas.Canvas(pdf_buffer, pagesize=letter)
        current_height = 350  # Start from top of the page

        p.drawString(72, 770, f"Incident ID: {incident.incidents_id}")  # Add this line to include Incident ID
        p.drawString(72, 750, f"Notification ID: {notification.id}")
        p.drawString(72, 735, f"Type: {notification.type}")
        p.drawString(72, 720, f"Module: {notification.module}")
        p.drawString(72, 705, f"Camera: {notification.camera}")
        p.drawString(72, 690, f"Status: {notification.status}")
        p.drawString(72, 675, f"Confidence Score: {notification.conf_score}")
        p.drawString(72, 660, f"Date: {notification.date.strftime('%Y-%m-%d %H:%M:%S')}")



        # Add images
        for detection in detections:
            if detection.image_data:
                # Load image from binary data
                image = Image.open(BytesIO(detection.image_data))
                image_path = f"temp_image_{detection.id}.png"  # Temporary file name
                image.save(image_path)

                # Draw image on PDF
                current_height -= 100  # Adjust height for each image
                p.drawImage(image_path, 72, current_height, width=200, height=80)  # Adjust size as needed

        p.save()

        # Convert PDF to binary
        system_data = pdf_buffer.getvalue()

        # Create a new Report object
        new_report = Reports(
            title=title,
            incident_id=incident_id,
            created_by=created_by,
            comments=comments,
            report_file=file_content,
            system_data=system_data  # Save the generated PDF
        )

        # Add and commit the new report to the database
        db.session.add(new_report)
        db.session.commit()

        return {
            'success': True, 
            'message': 'Report created successfully',
            'report_id': new_report.report_id
        }, 201

    def get(self):
        # Extract username from request headers
        username = request.headers.get('username')

        # Find user by username
        user = Users.query.filter_by(username=username).first()

        # Proceed only if user is found
        if not user:
            return {"success": False, "message": "User not found."}, 404

        try:
            reports = Reports.query.filter_by(created_by=username).all()
            report_data = []

            for report in reports:
                data = {
                    "id": report.report_id,
                    "title": report.title,
                    "incident_id": report.incident_id,
                    "created_by": report.created_by,
                    "date_created": report.date_created.strftime("%Y-%m-%d %H:%M:%S"),
                    "comments": report.comments
                }
                report_data.append(data)

            return {"success": True, "reports": report_data}

        except Exception as e:
            return {"success": False, "message": "An error occurred: " + str(e)}, 500
        
@rest_api.route('/reports/<int:report_id>/file')
class ReportFileResource(Resource):
    def get(self, report_id):
        report = Reports.query.get(report_id)
        if not report or not report.report_file:
            return {"success": False, "message": "Report or file not found"}, 404

        # Create a BytesIO object from your binary data
        file_data = BytesIO(report.report_file)

        # You may also want to set an appropriate filename
        filename = f"report_{report_id}.pdf"  # Adjust the extension as per your file's format

        return send_file(
           file_data,
           as_attachment=True,
           download_name=filename
        )

@rest_api.route('/reports/<int:report_id>/system_data')
class SystemDataFileResource(Resource):
    def get(self, report_id):
        report = Reports.query.get(report_id)
        if not report or not report.system_data:
            return {"success": False, "message": "System data file not found"}, 404

        return send_file(
           BytesIO(report.system_data),
           as_attachment=True,
           download_name=f"system_data_{report_id}.pdf"
        )

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


# Process Weapon footage API #
@rest_api.route('/api/process_weapon')
class ProcessRTSPFootage(Resource):
    def post(self):
        try:
            data = request.get_json()
            rtsp_url = data['rtsp_url']  # URL of the RTSP feed

            # Setup for video capture
            cap = cv2.VideoCapture(rtsp_url)
            fps = cap.get(cv2.CAP_PROP_FPS)  # Frame rate of the video
            frame_count = int(fps * 4)  # Number of frames for 4 seconds

            # Initialize debounce mechanism
            last_notification_time = {}
            reference_frame = None  # Reference frame for motion detection

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                # Initialize the reference frame
                if reference_frame is None:
                    reference_frame = frame
                    continue

                # Check for motion in the frame
                if is_motion_detected(frame, reference_frame):

                    start_time = time.time()  # Start timing

                    # Run the model on the current frame
                    results = modelWeapons.predict(source=frame, device='mps' ,show=False, iou=0.45, conf=0.7)

                    end_time = time.time()  # End timing
                    processing_time = end_time - start_time
                    print("running weapon model")
                    print(f"Model processing time per frame: {processing_time:.3f} seconds")


                    # Process results
                    for frame_results in results:
                        if frame_results.boxes is not None:
                            img = cv2.cvtColor(frame_results.orig_img, cv2.COLOR_RGB2BGR)

                            for i, box in enumerate(frame_results.boxes):
                                cls = int(box.cls)
                                conf = box.conf.item()
                                if conf > 0.7:
                                    # Check for debounce
                                    current_time = datetime.utcnow()
                                    if cls not in last_notification_time or (current_time - last_notification_time[cls]) > timedelta(seconds=3):
                                        last_notification_time[cls] = current_time

                                        # Draw bounding box and label on the image
                                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                                        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                                        label = f'{modelWeapons.names[cls]}: {conf:.2f}'
                                        cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                                        # Create and add notification to the database
                                        new_notification = Notifications(
                                            date=datetime.utcnow(),
                                            type="Pending",
                                            module=modelWeapons.names[cls],
                                            camera="RTSP Camera",
                                            status="Active",
                                            conf_score=conf  # Set the confidence score
                                        )
                                        db.session.add(new_notification)
                                        db.session.flush()

                                        notify_numbers = ['+971545034934', '+971505191211']  # Replace with actual numbers
                                        message_body = f"Alert: {modelWeapons.names[cls]} detected with high confidence. Camera: {new_notification.camera}"

                                        call_numbers = ['+971545034934']  # Replace with actual numbers
                                        call_message = f"Alert: {modelWeapons.names[cls]} detected with high confidence. Camera: {new_notification.camera}"


                                        # Send the WhatsApp message
                                        send_whatsapp_message(notify_numbers, message_body)



                                        # Save the image with bounding boxes as binary data
                                        is_success, buffer = cv2.imencode(".jpg", img)
                                        if is_success:
                                            binary_image = BytesIO(buffer).read()

                                            # Save to detections table
                                            detection = Detections(notification_id=new_notification.id, image_data=binary_image)
                                            db.session.add(detection)

                                        # Process for video capture
                                        video_buffer = []
                                        cap.set(cv2.CAP_PROP_POS_FRAMES, cap.get(cv2.CAP_PROP_POS_FRAMES) - 1)
                                        for _ in range(frame_count):
                                            ret, vid_frame = cap.read()
                                            if not ret:
                                                break
                                            video_buffer.append(vid_frame)

                                        # Encoding the video buffer as MP4 with H.264 codec
                                        mp4_filename = 'temp.mp4'
                                        video = cv2.VideoWriter(mp4_filename, cv2.VideoWriter_fourcc(*'H264'), fps, (frame.shape[1], frame.shape[0]))
                                        for vid_frame in video_buffer:
                                            video.write(vid_frame)
                                        video.release()

                                        # Reading the video file and converting to binary
                                        with open(mp4_filename, 'rb') as file:
                                            video_data = file.read()

                                        # Add video to the database
                                        new_video = Videos(notification_id=new_notification.id, video_data=video_data)
                                        db.session.add(new_video)
                                        db.session.commit()
                                        db.session.close()

                    # Update the reference frame
                    reference_frame = frame

            return {"success": True, "msg": "RTSP feed processed successfully."}, 201

        except Exception as e:
            return {"success": False, "msg": str(e)}, 500

# Process Fire footage API's #
@rest_api.route('/api/process_fire')
class ProcessFireFootage(Resource):
    def post(self):
        try:
            data = request.get_json()
            rtsp_url = data['rtsp_url']  # URL of the RTSP feed or MP4 file

            # Setup for video capture
            cap = cv2.VideoCapture(rtsp_url)
            fps = cap.get(cv2.CAP_PROP_FPS)  # Frame rate of the video
            frame_count = int(fps * 4)  # Number of frames for 4 seconds

            # Initialize debounce mechanism
            last_notification_time = {}
            reference_frame = None  # Reference frame for motion detection

            while cap.isOpened():
                ret, frame = cap.read()
                if not ret:
                    break

                if reference_frame is None:
                    reference_frame = frame
                    continue

                if is_motion_detected(frame, reference_frame):
                    start_time = time.time()

                    results = modelFire.predict(source=frame, device="mps", show=False, iou=0.45, conf=0.7)
                    end_time = time.time()
                    processing_time = end_time - start_time
                    print("running fire model")
                    print(f"Model processing time per frame: {processing_time:.3f} seconds")

                    for frame_results in results:
                        if frame_results.boxes is not None:
                            img = cv2.cvtColor(frame_results.orig_img, cv2.COLOR_RGB2BGR)

                            for i, box in enumerate(frame_results.boxes):
                                cls = int(box.cls)
                                conf = box.conf.item()
                                if conf > 0.7:
                                    current_time = datetime.utcnow()
                                    if cls not in last_notification_time or (current_time - last_notification_time[cls]) > timedelta(seconds=3):
                                        last_notification_time[cls] = current_time

                                        x1, y1, x2, y2 = map(int, box.xyxy[0])
                                        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                                        label = f'{modelFire.names[cls]}: {conf:.2f}'
                                        cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

                                        new_notification = Notifications(
                                            date=datetime.utcnow(),
                                            type="Pending",
                                            module=modelFire.names[cls],
                                            camera="RTSP Camera",
                                            status="Active",
                                            conf_score=conf
                                        )
                                        db.session.add(new_notification)
                                        db.session.flush()

                                        notify_numbers = ['+971545034934', '+971505191211'] 
                                        message_body = f"Alert: {modelFire.names[cls]} detected. Camera: {new_notification.camera}"
                                        
                                        send_whatsapp_message(notify_numbers, message_body)

                                        is_success, buffer = cv2.imencode(".jpg", img)
                                        if is_success:
                                            binary_image = BytesIO(buffer).read()
                                            detection = Detections(notification_id=new_notification.id, image_data=binary_image)
                                            db.session.add(detection)

                                        video_buffer = []
                                        cap.set(cv2.CAP_PROP_POS_FRAMES, cap.get(cv2.CAP_PROP_POS_FRAMES) - 1)
                                        for _ in range(frame_count):
                                            ret, vid_frame = cap.read()
                                            if not ret:
                                                break
                                            video_buffer.append(vid_frame)

                                        mp4_filename = 'temp.mp4'
                                        video = cv2.VideoWriter(mp4_filename, cv2.VideoWriter_fourcc(*'H264'), fps, (frame.shape[1], frame.shape[0]))
                                        for vid_frame in video_buffer:
                                            video.write(vid_frame)
                                        video.release()

                                        with open(mp4_filename, 'rb') as file:
                                            video_data = file.read()

                                        new_video = Videos(notification_id=new_notification.id, video_data=video_data)
                                        db.session.add(new_video)
                                        db.session.commit()
                                        db.session.close()

                    reference_frame = frame

            return {"success": True, "msg": "RTSP feed processed successfully."}, 201

        except Exception as e:
            return {"success": False, "msg": str(e)}, 500
