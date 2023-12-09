from datetime import datetime, timezone, timedelta
from io import BytesIO
import time
import cv2

#Flask Imports
from flask import request, Response, send_file
from flask_restx import Namespace, Resource, fields

#ML requirments
import numpy as np
from ultralytics import YOLO
import torch
#JWT imports
from flask_jwt_extended import create_refresh_token, get_jwt, get_jwt_identity, create_access_token, jwt_required, decode_token

#Email validation
from email_validator import EmailNotValidError, validate_email

#Databse Models
from models import Users, Roles, UserRole, Detections, Notifications, Incidents,Videos, Reports
from models import TokenBlocklist

#custom in built modules created
from .password_validation import is_strong_password
from .helpers import add_token_to_database, revoke_token, is_token_revoked

#extensions
from extensions import db, jwt
from twilio.rest import Client


modelWeapons = YOLO("C:/Users/Ocean/Project_Foresight/server/endpoints/auth/weaponmodel.pt")
modelFire = YOLO("C:/Users/Ocean/Project_Foresight/server/endpoints/auth/firemodel.pt")
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
    "userID": fields.String(required=True, min_length=1, max_length=32),
    "username": fields.String(required=True, min_length=2, max_length=32),
    "email": fields.String(required=True, min_length=4, max_length=64)
})



@rest_api.route('/api/users/notifications', defaults={'notification_id': None})
@rest_api.route('/api/users/notifications/<int:notification_id>')
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

    
@rest_api.route('/api/users/incidents', defaults={'incident_id': None})
@rest_api.route('/api/users/incidents/<int:incident_id>')
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

# New Api's

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



@rest_api.route('/api/users/process_weapon')
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
        

@rest_api.route('/api/users/process_fire')
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

@rest_api.route('/api/users/videos/<int:notification_id>')
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

@rest_api.route('/api/users/get_image/<int:notification_id>')
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
    

@rest_api.route('/api/users/reports')
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

        # Create a new Report object
        new_report = Reports(
            title=title,
            incident_id=incident_id,
            created_by=created_by,
            comments=comments,
            report_file=file_content
        )

        # Add and commit the new report to the database
        db.session.add(new_report)
        db.session.commit()
        db.session.close()

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
        user.save()

        #Add the tokens to the database
        add_token_to_database(access_token)
        add_token_to_database(refresh_token)
        return {"success": True, "Access_token": access_token, "Refresh_token": refresh_token,"Role": user_exist.get_role() ,"user": user_exist.to_dict()}, 200

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
        new_uname = req_data.get("username")
        new_email = req_data.get("email")
        #validation
        email_exist= Users.get_by_email(self)


         #check email format
        try:
            valid=validate_email(new_email)

        except EmailNotValidError as e:

            return {"success": False, "msg": "This email format is invalid."}


        # Check if email exists
        if  email_exist:
            return {"success": False, "msg": "This email already exists."}, 400
        

        if new_uname:
                self.update_username(new_uname)

        if new_email:
                self.update_email(new_email)

        self.save()

        return {"success": True, "msg": "User records updates successfully !"}, 200
    

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
    
        
