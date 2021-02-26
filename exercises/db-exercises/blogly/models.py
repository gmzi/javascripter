from flask_sqlalchemy import SQLAlchemy
import datetime

from sqlalchemy.orm import backref

current_dt = datetime.datetime.now()

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    """Users table/class"""
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    username = db.Column(db.String(15), nullable=False, unique=True)
    image_url = db.Column(db.String)


class Post(db.Model):
    """Multiple posts by single user"""
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=current_dt)
    # ForeIGN KEY CONSTRAINT
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # METHOD:
    created_by = db.relationship('User', backref='my_posts')
