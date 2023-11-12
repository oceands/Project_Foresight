import json
from flask import Flask, jsonify
from flask_cors import CORS
import logging

#Handel token releated operations
from endpoints.auth.helpers import add_token_to_database, revoke_token, is_token_revoked

# Importing the rest_api from routes.py
from endpoints import Foresight_API
# Importing the extensions
from extensions import db, jwt

# Creating the Flask app instance
app = Flask(__name__)

# Loading configuration from BaseConfig class in the config module
app.config.from_object('config.BaseConfig')

# Initializing the database with the app instance
db.init_app(app)

# Initializing the rest_api with the app instance
Foresight_API.init_app(app)


# Initializing the JWTManager extension with the app instance
jwt.init_app(app)



# Enabling Cross-Origin Resource Sharing (CORS)
CORS(app)

#Initialize boolean
initialized = False

# @jwt.token_in_blocklist_loader
# def check_if_token_revoked(jwt_header, jwt_data):
#         try:
#             return is_token_revoked(jwt_data)
#         except Exception:
#             return True 

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    try:
        if is_token_revoked(jwt_data):

            # Provide a generic response
            
            print("hit token already revoked")
            return jsonify({"message": "Authentication failed", "error": "token_revoked"}), 401
        else:
            jti = jwt_data["jti"]
            user_id = jwt_data[app.config.get("JWT_IDENTITY_CLAIM")]
            revoke_token(jti,user_id);
            # Provide a generic response
            return jsonify({"message": "Authentication failed", "error": "token_expired"}), 401
    except Exception as e:

        # Provide a generic response
        print("hit exception")
        return jsonify({"message": "Authentication failed", "error": "token_expired"}), 401



@jwt.invalid_token_loader
def invalid_token_callback(error):
        return (
            jsonify(
                {"message": "Signature verification has failed", "error": "invalid_token"}
            ),
            401,
        )

@jwt.unauthorized_loader
def missing_token_callback(error):
        return (
            jsonify(
                {
                    "message": "Request doesnt contain valid token",
                    "error": "authorization_header",
                }
            ),
            401,
        )

# Setup the database prior to the first request
@app.before_request
def initialize_database():
    global initialized

    if not initialized:
        try:
            db.create_all()
            print('> Success: All relevant tables have been created')
            initialized = True
        except Exception as e:
            print('> Error: DBMS Table creation exception: ' + str(e))

# Custom response for debugging
@app.after_request
def after_request(response):
    # Check if the response status code indicates an error (400 or higher)
    if response.status_code >= 400:
        try:
            response_data = json.loads(response.get_data())
            if "errors" in response_data:
                # If "errors" key exists in the response data, transform it
                response_data = {"success": False,
                                 "msg": list(response_data["errors"].items())[0][1]}
                response.set_data(json.dumps(response_data))
            response.headers.add('Content-Type', 'application/json')
        except json.JSONDecodeError as e:
            # If JSON decoding fails, log the error and leave the response unchanged
            logging.error(f"JSON decoding error: {e}")

    return response

# This part runs the Flask app if this script is being executed directly
if __name__ == '__main__':
    app.run()
