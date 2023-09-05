import json
from flask import Flask
from flask_cors import CORS
import logging

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

# Setup the database prior to the first request
@app.before_request
def initialize_database():
    try:
        db.create_all()
        print('> Success: All relevant tables have been created')
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
