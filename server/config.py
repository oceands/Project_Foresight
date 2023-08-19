import os, random , string
from dotenv import load_dotenv
from datetime import timedelta


# This Class peices our constants and makes a connection to the Datbase also initialises our databse sucessfully.
class BaseConfig():

    load_dotenv()

    #This variable checks if JWT secret key is available in the .env
    JWT_SECRET_KEY = os.getenv('JWT_SECRET', None)
    JWT_IDENTITY_CLAIM = "user_id"  # default == sub

    #if it is not available we will generate one
    if not JWT_SECRET_KEY:
        JWT_SECRET_KEY = ''.join(random.choice( string.ascii_lowercase  ) for i in range( 32 ))

    #Tells when the tokens will expire    
    JWT_ACCESS_TOKEN_EXPIRES= timedelta(minutes=15)

    # Pull all Database constants from thE .ENV File
    db_username = os.getenv('DB_USERNAME', None)
    db_name = os.getenv('DB_NAME', None)
    db_password =os.getenv('DB_PASS', None)
    db_host = os.getenv('DB_HOST', None)
    db_port = os.getenv('DB_PORT', None)
    db_engine = os.getenv('DB_ENGINE', None)

    # if the nessecary variables for the database connection are present then
    if db_username and db_name and db_password:
        try:
            #connect to our postgres database
            SQLALCHEMY_DATABASE_URI = '{}://{}:{}@{}:{}/{}'.format(
                db_engine,
                db_username,
                db_password,
                db_host,
                db_port,
                db_name
            )
        #if an exception is caught then we can print the errors    
        except Exception as e:
            print('> Error: DBMS Exception: ' + str(e) )  