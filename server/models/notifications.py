from extensions import db
from datetime import datetime

class Notifications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    type = db.Column(db.String(50), nullable=False)
    module = db.Column(db.String(50), nullable=False)
    camera = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    conf_score = db.Column(db.Float)
    

    def __repr__(self):
        return f"Notifications {self.id} - {self.module}"
    
    # Method to save the object to the database
    def save(self):
        db.session.add(self)
        db.session.commit()

    def close(self):
        db.session.close()

    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat() if self.date else None,
            'type': self.type,
            'module': self.module,
            'camera': self.camera,
            'status': self.status
        }

    @classmethod
    def get_all(cls):
        return cls.query.all()