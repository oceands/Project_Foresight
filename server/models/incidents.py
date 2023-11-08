from extensions import db
from datetime import datetime

class Incidents(db.Model):
    # Assuming 'incidents_id' to match the column name in your actual database
    incidents_id = db.Column(db.Integer, primary_key=True)
    notification_id = db.Column(db.Integer, db.ForeignKey('notifications.id'), nullable=True)  # This assumes your notifications table is named 'notifications'
    # ... other fields ...

    # If you want to define a relationship between Incidents and Notifications
    notification = db.relationship('Notifications', backref=db.backref('incidents', lazy=True))

    # Other attributes match the columns in your database table 'incidents'
    date = db.Column(db.DateTime, default=datetime.utcnow)  # Defaults to the current time
    type = db.Column(db.String(50), nullable=False)         # Must be provided (can't be NULL)
    module = db.Column(db.String(50), nullable=False)       # Must be provided (can't be NULL)
    camera = db.Column(db.String(100), nullable=False)      # Must be provided (can't be NULL)
    status = db.Column(db.String(50), nullable=False)       # Must be provided (can't be NULL)
    # ... Add other fields as needed ...

    def __repr__(self):
        # This is a special method used to represent a class's objects as a string
        return f"Incident {self.incidents_id} - {self.module}"
    
    def save(self):
        # Saves the instance to the database
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        # Serializes the instance for JSON responses
        return {
            'incidents_id': self.incidents_id,
            'date': self.date.isoformat() if self.date else None,
            'type': self.type,
            'module': self.module,
            'camera': self.camera,
            'status': self.status
        }

    @classmethod
    def get_all(cls):
        # A class method to get all records from the database
        return cls.query.all()