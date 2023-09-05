from flask_restx import Api

from .api.routes import rest_api as user_api
from .auth.routes import rest_api as auth_api

Foresight_API = Api(
    title="Foresight API's",
    version="1.0",
    description="All the API calls we will be using for the operations in the Foresight Application",
)

Foresight_API.add_namespace(user_api)
Foresight_API.add_namespace(auth_api)