from extensions import db

class Dispatch_Active(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    dispatch_id = db.Column(db.Integer, db.ForeignKey('dispatch_details.id'))
    incident_id = db.Column(db.Integer, db.ForeignKey('incidents.incidents_id'))
    camera_id = db.Column(db.Integer, db.ForeignKey('camera_details.id'))
    notification_id = db.Column(db.Integer, db.ForeignKey('notifications.id'))

    dispatch = db.relationship('DispatchDetails', backref='dispatch_active')
    incident = db.relationship('Incidents', backref='dispatch_active')
    camera = db.relationship('CameraDetails', backref='dispatch_active')
    notification = db.relationship('Notifications', backref='dispatch_active')


    def __repr__(self):

        return f'<DispatchActive {self.id}>'
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id': self.id,
            'dispatch_id': self.dispatch_id,
            'incident_id': self.incident_id,
            'camera_id': self.camera_id,
            'notification_id': self.notification_id,
            'dispatch': self.dispatch.to_dict() if self.dispatch else None,
            'incident': self.incident.to_dict() if self.incident else None,
            'camera': self.camera.to_dict() if self.camera else None,
            'notification': self.notification.to_dict() if self.notification else None
        }
    
    def close(self):
        db.session.close()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

   
