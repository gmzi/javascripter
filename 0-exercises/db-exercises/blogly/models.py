from enum import unique
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
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='cascade'))
    # RELATIONSHIPS:
    created_by = db.relationship('User', backref='my_posts')
    show_tags = db.relationship(
        'Tag', secondary='posts_tags', backref='show_posts')
    # dependence = db.relationship('PostTag', ondelete='cascade')


class Tag(db.Model):
    """relate tags to posts"""
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)


class PostTag(db.Model):
    """relates posts with tags"""
    __tablename__ = 'posts_tags'

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id', ondelete='cascade'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)
