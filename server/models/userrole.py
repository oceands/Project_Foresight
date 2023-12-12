from extensions import db

# Define the UserRole model, which represents the many-to-many relationship between User and Role
class UserRole(db.Model):
    __tablename__ = "user_roles"  # Table name for the UserRole model

    # Primary keys as foreign keys to the User and Role tables
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    role_id = db.Column(db.Integer, db.ForeignKey("roles.id"), primary_key=True)
# Method to save the object to the database
    def save(self):
        db.session.add(self)  # Add the object to the database session
        db.session.commit()  # Commit the changes to the database (save the object)
        db.session.close()

    