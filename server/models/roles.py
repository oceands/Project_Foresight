from extensions import db
#Roles Class
class Roles(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(36), nullable=False)
    slug = db.Column(db.String(36), nullable=False, unique=True)

    users = db.relationship("Users", secondary="user_roles", back_populates="roles")
# Method to save the object to the database
    def save(self):
        db.session.add(self)  # Add the object to the database session
        db.session.commit()  # Commit the changes to the database (save the object)


    def close(self):
        db.session.close()

    @classmethod
    def get_by_id(cls, role_id):
        return cls.query.get_or_404(role_id)

    @classmethod
    def get_by_name(cls, role_name):
        return cls.query.filter_by(name=role_name).first()

    @classmethod
    def get_by_slug(cls, role_slug):
        return cls.query.filter_by(slug=role_slug).first()