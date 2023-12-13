from extensions import db
from datetime import datetime

class Detections(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notification_id = db.Column(db.Integer, db.ForeignKey('notifications.id'), nullable=False)
    image_data = db.Column(db.LargeBinary, nullable=False)  # For storing the image data

    # Relationship (optional, for back-reference)
    notification = db.relationship('Notifications', backref=db.backref('detections', lazy=True))

    def _repr_(self):
        return f"Detections {self.id} - Notification ID: {self.notification_id}"
    
    # Method to save the object to the database
    def save(self):
        db.session.add(self)
        db.session.commit()

    def close(self):
        db.session.close()

    def to_dict(self):
        """Serialize the Detections object to a Python dictionary."""
        return {
            'id': self.id,
            'notification_id': self.notification_id,
            # The image and video data are binary, so they're not included in the to_dict
        }

    @classmethod
    def get_by_notification_id(cls, notification_id):
        return cls.query.filter_by(notification_id=notification_id).all()