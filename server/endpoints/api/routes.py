
from flask import jsonify
from flask_jwt_extended import jwt_required
from flask_restx import Namespace, Resource, fields

# Import your existing modules and code here, including your models, validation functions, etc.

rest_api= Namespace("user",version="1.0", description="Regular user related operations")

# Define your route for "/dashboard"
@rest_api.route('/dashboard')
class Dashboard(Resource):

    @jwt_required()
    def post(self):
        # Add any functionality specific to your dashboard route here
        return {"success": True, "msg": "done"}, 200
