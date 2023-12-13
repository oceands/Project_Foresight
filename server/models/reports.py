from extensions import db
from datetime import datetime

class Reports(db.Model):
    report_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    incident_id = db.Column(db.Integer, db.ForeignKey('incidents.incidents_id'), nullable=False)
    created_by = db.Column(db.String(255), db.ForeignKey('users.username'), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    comments = db.Column(db.Text)
    report_file = db.Column(db.LargeBinary)  # For binary file data
    system_data = db.Column(db.LargeBinary)  # New column for system-generated PDF data


    def __repr__(self):
        return f"<Report {self.report_id} - {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def to_dict(self):
        return {
            'report_id': self.report_id,
            'title': self.title,
            'incident_id': self.incident_id,
            'created_by': self.created_by,
            'date_created': self.date_created.isoformat(),
            'comments': self.comments,
            # 'report_file': self.report_file.decode('utf-8') if self.report_file else None
            # You might need to handle binary file data appropriately here
        }

    @classmethod
    def get_all(cls):
        return cls.query.all()
