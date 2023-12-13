from extensions import db

#EXPIRED TOKEN MODEL
# Define the jwt_token_blocklist class that inherits from db.Model
class TokenBlocklist(db.Model):

    # Define the name of the database table associated with this class
    __tablename__ = 'tokenblocklist'

    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    jti = db.Column(db.String(), nullable=False, unique=True)
    token_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
   
    revoked_at = db.Column(db.DateTime)
    expires = db.Column(db.DateTime, nullable=False)

    user = db.relationship("Users", backref=db.backref("tokenblocklist", cascade="all, delete"))

    # Method to define the string representation of the object (for debugging and display purposes)
    def __repr__(self):
        return f"Expired Token: {self.jti}"
    

    # Method to save the object to the database
    def save(self):
        db.session.add(self)  # Add the object to the database session
        db.session.commit()  # Commit the changes to the database (save the object)
   
    @classmethod
    def Get_token_by_id(cls,jti,user_id):
        return cls.query.filter_by(jti=jti, user_id=user_id).one()
    
    def close(self):
        db.session.close()
