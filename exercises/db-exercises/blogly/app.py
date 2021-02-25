from flask import Flask, request, render_template, redirect
from models import db, connect_db, User

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'caca'

connect_db(app)


@app.route('/')
def list_users():
    """shows all existing users"""
    users = User.query.all()
    return render_template('base.html', users=users)


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


@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('show.html', user=user)


@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get(user_id)
    return render_template('edit.html', user=user)


# @app.route('/users/<int:user_id>/update')
# def update_user(user_id):
    # check if form placeholder values can work as default values.
