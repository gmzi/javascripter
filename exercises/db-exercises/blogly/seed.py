from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add users
juancho = User(first_name='Juan Carlos', last_name="Correa",
               username='juancho', image_url='www.google.com')
pucho = User(first_name='Pedro', last_name="Lopez",
             username='pucho', image_url='www.google.com')
toto = User(first_name='Robert', last_name="Piss",
            username='toto123', image_url='www.google.com')

# Add new objects to session, so they'll persist
db.session.add(juancho)
db.session.add(pucho)
db.session.add(toto)

# Commit to database
db.session.commit()

# run file: 'python seed.py', beware database will be erased
