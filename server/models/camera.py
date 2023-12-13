from extensions import db 

# Camera Details Model
class CameraDetails(db.Model):
    __tablename__ = 'camera_details'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    CameraName = db.Column(db.String(32), nullable=False)
    CameraType = db.Column(db.String(32), nullable=False)
    IPAddress = db.Column(db.String(15), nullable=False)
    Port = db.Column(db.String(17), nullable=False)
    OwnerName = db.Column(db.String(32), nullable=False)
    Option = db.Column(db.String(32), nullable=False)
    Description = db.Column(db.String(255), nullable=False)

    # Getter and Setter for CameraName
    def get_camera_name(self):
        return self.CameraName

    def set_camera_name(self, value):
        self.CameraName = value

    # Getter and Setter for CameraType
    def get_camera_type(self):
        return self.CameraType

    def set_camera_type(self, value):
        self.CameraType = value

    # Getter and Setter for IPAddress
    def get_ip_address(self):
        return self.IPAddress

    def set_ip_address(self, value):
        self.IPAddress = value

    # Getter and Setter for MACAddress
    def get_port(self):
        return self.Port

    def set_port(self, value):
        self.Port = value

    # Getter and Setter for OwnerName
    def get_owner_name(self):
        return self.OwnerName
    

    # Getter and Setter for OwnerName
    def set_option(self, value):
        self.Option = value

    def get_option(self):
        return self.Option

    def set_owner_name(self, value):
        self.OwnerName = value

    # Getter and Setter for Description
    def get_description(self):
        return self.Description

    def set_description(self, value):
        self.Description = value


    def to_dict(self):
        return {
            'id': self.id,
            'CameraName': self.CameraName,
            'CameraType': self.CameraType,
            'IPAddress': self.IPAddress,
            'Port': self.Port,
            'OwnerName': self.OwnerName,
            'Option':self.Option,
            'Description': self.Description
        }

    # Method to save the object to the database
    def save(self):
        db.session.add(self)
        db.session.commit()

    # Method to retrieve an object from the database by its primary key 'id'
    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)
    
    @classmethod
    def get_by_IP(cls,IPAddress ):
        return cls.query.filter_by(IPAddress=IPAddress).first()
    
    @classmethod
    def get_by_Port(cls,Port ):
        return cls.query.filter_by(Port=Port).first()
    
    def close(self):
        db.session.close()
 
