from extensions import db  # Assuming 'db' is your SQLAlchemy instance

# Dispatch Details Model
class DispatchDetails(db.Model):
    __tablename__ = 'dispatch_details'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    Name = db.Column(db.String(32), nullable=False)
    Type = db.Column(db.String(32), nullable=False)
    Number = db.Column(db.String(32), nullable=False)
    Location = db.Column(db.String(255), nullable=False)
    Description = db.Column(db.String(255), nullable=False)

    # Getter and Setter for Name
    def get_name(self):
        return self.Name

    def set_name(self, value):
        self.Name = value

    # Getter and Setter for Type
    def get_type(self):
        return self.Type

    def set_type(self, value):
        self.Type = value

    # Getter and Setter for Number
    def get_number(self):
        return self.Number

    def set_number(self, value):
        self.Number = value

    # Getter and Setter for Location
    def get_location(self):
        return self.Location

    def set_location(self, value):
        self.Location = value

    # Getter and Setter for Description
    def get_description(self):
        return self.Description

    def set_description(self, value):
        self.Description = value

    def to_dict(self):
        return {
            'id': self.id,
            'Name': self.Name,
            'Type': self.Type,
            'Number': self.Number,
            'Location': self.Location,
            'Description': self.Description
        }

    # Method to save the object to the database
    def save(self):
        db.session.add(self)
        db.session.commit()
        db.session.close()

    # Method to retrieve an object from the database by its primary key 'id'
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_by_number(cls,Number ):
        return cls.query.filter_by(Number=Number).first()
    
