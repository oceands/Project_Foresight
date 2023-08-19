import os

from sqlalchemy import text
from app import db, app

result = os.scandir("seed")

with app.app_context():
    for item in result:
        if item.is_file:
            sql = open(item.path, "r")
            statement = sql.read()
            db.session.execute(text(statement))

    db.session.commit()