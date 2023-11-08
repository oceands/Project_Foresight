from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restx import Namespace, Resource, fields
from models import Users
from flask import request
from datetime import datetime, timezone, timedelta

from extensions import db, jwt
# Import your existing modules and code here, including your models, validation functions, etc.

rest_api= Namespace("user",version="1.0", description="Regular user related operations")

# Define your route for "/dashboard"
@rest_api.route('/dashboard/getUname')
class Dashboard(Resource):

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        User = Users.get_by_id (user_id)
        userName= User.username

        return {"success": True, "userName": userName,"msg": "done"}, 200
    
