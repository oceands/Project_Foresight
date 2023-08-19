import json
from flask import Flask
from flask_cors import CORS

# Importing the rest_api from routes.py
from auth.routes import rest_api

# Importing the extensions
from extensions import db, jwt

# Creating the Flask app instance
app = Flask(__name__)

# Loading configuration from BaseConfig class in the config module
app.config.from_object('config.BaseConfig')

# Initializing the database with the app instance
db.init_app(app)

# Initializing the rest_api with the app instance
rest_api.init_app(app)

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
    if int(response.status_code) >= 400:
        response_data = json.loads(response.get_data())
        if "errors" in response_data:
            response_data = {"success": False,
                             "msg": list(response_data["errors"].items())[0][1]}
            response.set_data(json.dumps(response_data))
        response.headers.add('Content-Type', 'application/json')
    return response

# This part runs the Flask app if this script is being executed directly
if __name__ == '__main__':
    app.run()
