from flask.templating import render_template
from models import db, connect_db, User, Post, Tag, PostTag
from datetime import datetime


def pretty_date(time=False):
    """
    Get a datetime object or a int() Epoch timestamp and return a
    pretty string like 'an hour ago', 'Yesterday', '3 months ago',
    'just now', etc
    """
    now = datetime.now()
    if type(time) is int:
        diff = now - datetime.fromtimestamp(time)
    elif isinstance(time, datetime):
        diff = now - time
    elif not time:
        diff = now - now
    second_diff = diff.seconds
    day_diff = diff.days

    if day_diff < 0:
        return ''

    if day_diff == 0:
        if second_diff < 10:
            return "just now"
        if second_diff < 60:
            return str(second_diff) + " seconds ago"
        if second_diff < 120:
            return "a minute ago"
        if second_diff < 3600:
            return str(second_diff / 60) + " minutes ago"
        if second_diff < 7200:
            return "an hour ago"
        if second_diff < 86400:
            return str(second_diff / 3600) + " hours ago"
    if day_diff == 1:
        return "Yesterday"
    if day_diff < 7:
        return str(day_diff) + " days ago"
    if day_diff < 31:
        return str(day_diff / 7) + " weeks ago"
    if day_diff < 365:
        return str(day_diff / 30) + " months ago"
    return str(day_diff / 365) + " years ago"


def create_postag(title, user_id, tags):
    post = Post.query.filter(
        (Post.title == title) & (Post.user_id == user_id)).one()
    post_id = post.id
    for tag in tags:
        new_postag = PostTag(post_id=post_id, tag_id=tag.id)
        db.session.add(new_postag)
    try:
        db.session.commit()
    except Exception as error:
        msg = 'oh my god theres an error'
        return render_template('error.html', msg=msg)


def update_postag(post, tags):
    for tag in tags:
        post.tag_id = tag.id
        db.session.add(post)
    try:
        db.session.commit()
    except Exception as error:
        msg = 'failed to update post'
        return render_template('error.html', msg=msg)


def add_or_die(object):
    db.session.add(object)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return render_template('error.html')
