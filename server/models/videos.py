from extensions import db
from datetime import datetime

class Videos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    notification_id = db.Column(db.Integer, db.ForeignKey('notifications.id'), nullable=False)
    video_data = db.Column(db.LargeBinary, nullable=True)  # or use db.BLOB based on your specific needs

    # Relationship (optional, if you need to access notification from video)
    notification = db.relationship('Notifications', backref=db.backref('videos', lazy=True))

    def _repr_(self):
        return f"Videos {self.id} - Notification ID: {self.notification_id}"

    def save(self):
        db.session.add(self)
        db.session.commit()


    def close(self):
        db.session.close()

        
    def to_dict(self):
        """Serialize the Videos object to a Python dictionary."""
        return {
            'id': self.id,
            'notification_id': self.notification_id,
            # Assuming video_data is too large and not needed in dict representation
            # You can include it if necessary
        }

    @classmethod
    def get_by_notification_id(cls, notification_id):
        return cls.query.filter_by(notification_id=notification_id).all()