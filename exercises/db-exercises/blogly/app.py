from flask import Flask, request, render_template, redirect
from flask.helpers import flash, total_seconds
from models import db, connect_db, User, Post, Tag, PostTag
from datetime import datetime
from modules import pretty_date, add_or_die, create_postag, update_postag

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
def list_all():
    """shows all existing posts and users"""
    users = User.query.all()
    posts = Post.query.all()
    tags = Tag.query.all()
    return render_template('base.html', users=users, posts=posts, tags=tags)


@app.route('/form')
def form():
    return render_template('form.html')


@app.route('/users/<int:user_id>/new-post-form')
def new_post_form(user_id):
    user = User.query.get(user_id)
    tags = Tag.query.all()
    return render_template('new-post-form.html', user=user, tags=tags)


@app.route('/new-tag-form')
def new_tag_form():
    return render_template('new-tag-form.html')


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
    categories = request.form.getlist('category')
    add_or_die(new_post)
    tags = Tag.query.filter(Tag.name.in_(categories)).all()
    create_postag(title, user_id, tags)
    return redirect(f"/users/{user_id}")


@app.route('/create-tag', methods=['POST'])
def create_tag():
    name = request.form['tagname']
    if name == '':
        msg = 'New tag must have a name'
        return render_template('error.html', msg=msg)
    else:
        new_tag = Tag(name=name)
        add_or_die(new_tag)
        return redirect('/')


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
    posts = [post]
    tags = post.show_tags
    return render_template('show-post.html', posts=posts, tags=tags, date_time=date_time)


@app.route('/tags/<int:tag_id>/show-posts')
def show_posts_by(tag_id):
    tag = Tag.query.get(tag_id)
    posts = tag.show_posts
    print(posts)
    tags = [tag]
    return render_template('show-post.html', posts=posts, tags=tags)


@app.route('/tags/<int:tag_id>')
def show_tag(tag_id):
    tag = Tag.query.get_or_404(tag_id)
    return render_template('show-tag.html', tag=tag)


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get(user_id)
    return render_template('edit.html', user=user)


@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    post = Post.query.get(post_id)
    checked_tags = set(post.show_tags)
    all_tags = Tag.query.all()
    return render_template('edit-post.html', post=post, checked_tags=checked_tags, all_tags=all_tags)


@app.route('/tags/<int:tag_id>/edit')
def edit_tag(tag_id):
    tag = Tag.query.get(tag_id)
    return render_template('edit-tag.html', tag=tag)


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
    # return 'view in construction'
    post = Post.query.get(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    categories = request.form.getlist('category')
    tags = Tag.query.filter(Tag.name.in_(categories)).all()
    update_postag(post, tags)
    return redirect(f"/posts/{post_id}")


@app.route('/tags/<int:tag_id>/update', methods=['POST'])
def update_tag(tag_id):
    tag = Tag.query.get(tag_id)
    tag.name = request.form['tagname']
    add_or_die(tag)
    return redirect('/')


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
