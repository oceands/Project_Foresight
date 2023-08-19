from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager


#Declarations
db = SQLAlchemy()
jwt= JWTManager()