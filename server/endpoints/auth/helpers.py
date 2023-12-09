from datetime import datetime
from functools import wraps

from flask import current_app as app, jsonify, request
from flask_jwt_extended import decode_token
from flask_jwt_extended import get_jwt, get_jwt_identity,decode_token

from sqlalchemy.exc import NoResultFound


from models.auth import TokenBlocklist

#Add the token to our DB
def add_token_to_database(encoded_token):
    decoded_token = decode_token(encoded_token)
    jti = decoded_token["jti"]
    token_type = decoded_token["type"]
    user_id = decoded_token[app.config.get("JWT_IDENTITY_CLAIM")]
    expires = datetime.fromtimestamp(decoded_token["exp"])

    db_token = TokenBlocklist(
        jti=jti,
        token_type=token_type,
        user_id=user_id,
        expires=expires,
    )
    db_token.save()

# Revoke User token and save revocation
def revoke_token(token_jti, user_id):
    try:
        token = TokenBlocklist.Get_token_by_id(token_jti, user_id)
        token.revoked_at = datetime.utcnow()
        token.save()
    except NoResultFound:
        raise Exception(f"Could not find token {token_jti}")


# Check if the token is revoked successfully 

def is_token_revoked(jwt_payload):
    print (jwt_payload)
    jti = jwt_payload["jti"]
    user_id = jwt_payload[app.config.get("JWT_IDENTITY_CLAIM")]
    try:
        token = TokenBlocklist.Get_token_by_id(jti, user_id)
        return token.revoked_at is not None
    except NoResultFound:
        # Log the exception or return False
        app.logger.warning(f"Token {jti} not found in the blocklist.")
        return False
    

#This function chesks the role of token in the request for RBAC

def requires_role(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing!'}), 403
            try:
                data = decode_token(token)
                if required_role not in data['roles']:
                    return jsonify({'message': 'Permission Denied'}), 403
            except:
                return jsonify({'message': 'Token is invalid!'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator