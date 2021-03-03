from flask.helpers import send_file
from sqlalchemy.orm import selectinload_all
from models import User, Post, db, Tag, PostTag
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add users
juancho = User(first_name='Juan Carlos', last_name="Correa",
               username='juancho', image_url='https://i.pinimg.com/originals/95/4c/fc/954cfc6aa84ad78920afdb0adda1d75f.jpg')
pucho = User(first_name='Peter', last_name="Denis",
             username='pucho', image_url='https://upload.wikimedia.org/wikipedia/commons/4/4d/Charles_Bronson_-_1966.JPG')
toto = User(first_name='Robert', last_name="Prim",
            username='toto123', image_url='https://static.billboard.com/files/2020/10/Justin-Bieber-Justin-Bieber-Seasons-Premiere-2020-Billboard-1548-1604003367-compressed.jpg')

# Add new objects to session, so they'll persist
db.session.add(juancho)
db.session.add(pucho)
db.session.add(toto)

db.session.commit()

new_pet = Post(title="New Pet in the house",
               content='We have a new pet!!!!', user_id=1)
house = Post(title="house", content='We have a new house!!!!', user_id=2)
car = Post(title="car", content='We have a new car!!!!', user_id=3)

db.session.add(new_pet)
db.session.add(house)
db.session.add(car)

db.session.commit()

funny = Tag(name='funny')
sad = Tag(name='sad')
cool = Tag(name='cool')

db.session.add(funny)
db.session.add(sad)
db.session.add(cool)
db.session.commit()

tagged1 = PostTag(post_id=1, tag_id=1)
tagged2 = PostTag(post_id=2, tag_id=2)
tagged3 = PostTag(post_id=3, tag_id=3)

db.session.add(tagged1)
db.session.add(tagged2)
db.session.add(tagged3)
db.session.commit()

# run file: 'python seed.py', beware database will be erased
