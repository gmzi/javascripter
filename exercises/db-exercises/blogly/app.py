from flask import Flask, request, render_template, redirect
from flask.helpers import total_seconds
from models import db, connect_db, User, Post
from datetime import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'caca'

connect_db(app)

# Reload with no cache for styling purposes:


@app.after_request
def apply_caching(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    return response


@app.route('/')
def list_users():
    """shows all existing posts and users"""
    users = User.query.all()
    posts = Post.query.all()
    return render_template('base.html', users=users, posts=posts)


@app.route('/form')
def form():
    return render_template('form.html')


@app.route('/create', methods=['POST'])
def create_user():
    first = request.form['first']
    last = request.form['last']
    username = request.form['username']
    image = request.form['image']
    new_user = User(first_name=first, last_name=last,
                    username=username, image_url=image)
    db.session.add(new_user)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no something is wrong'
    return redirect('/')


@app.route('/users/<int:user_id>/add-post', methods=['POST'])
def add_post(user_id):
    title = request.form['title']
    content = request.form['content']

    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no something is wrong'
    return redirect(f"/users/{user_id}")


@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    posts = user.my_posts
    return render_template('show.html', user=user, posts=posts)


@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get_or_404(post_id)
    no = str(post.created_at.replace(microsecond=0))
    date_time = no[:-3]
    return render_template('show-post.html', post=post, date_time=date_time)


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get(user_id)
    return render_template('edit.html', user=user)


@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    post = Post.query.get(post_id)
    return render_template('edit-post.html', post=post)


@app.route('/users/<int:user_id>/update', methods=['POST'])
def update_user(user_id):
    user = User.query.get(user_id)
    user.first_name = request.form['first']
    user.last_name = request.form['last']
    user.username = request.form['username']
    user.image_url = request.form['image']
    db.session.add(user)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no'
    return redirect(f"/users/{user_id}")


@app.route('/posts/<int:post_id>/update', methods=['POST'])
def update_post(post_id):
    post = Post.query.get(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    db.session.add(post)
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no'
    return redirect(f"/posts/{post_id}")


@app.route('/users/<int:user_id>/delete')
def delete_user(user_id):
    User.query.filter_by(id=user_id).delete()
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no'
    return redirect('/')


@app.route('/posts/<int:post_id>/delete')
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).first()
    user_id = post.created_by.id
    Post.query.filter_by(id=post_id).delete()
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'Oh no'
    return redirect(f"/users/{post.user_id}")


@app.route('/users/<int:user_id>/new-post-form')
def new_post_form(user_id):
    user = User.query.get(user_id)
    return render_template('new-post-form.html', user=user)


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
