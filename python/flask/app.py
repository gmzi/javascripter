from flask import Flask, request, render_template
from random import randint, choice, sample
from flask_debugtoolbar import DebugToolbarExtension

# main instance of Flask class:
app = Flask(__name__)
# debug toolbar extansion config:
app.config['SECRET_KEY'] = "mypassword"
debug = DebugToolbarExtension(app)

# Root route


@app.route('/')
def home_page():
    """these functions are called 'view functions', because
    they set the rendering of the response"""
    return render_template('hello.html')

# Manage forms:
# 1- Display form:


@app.route('/form')
def show_form():
    return render_template('greeter_form.html')

# 2-Grab the user input and define the function to use it in:


compliments = ['cool', 'clever', 'pythonic']


@app.route('/greet')
def greet():
    username = request.args['username']
    wants_compliments = request.args.get('wants_compliments')
    comps = sample(compliments, 2)
    return render_template('greet.html', username=username, wants_compliments=wants_compliments, compliments=comps)


@app.route('/lucky')
def show_lucky_num():
    """returns a random num"""
    num = randint(1, 3)
    msg = 'nice short number, isnt it?'
    return render_template('lucky_number.html', lucky_number=num, lucky_msg=msg)


@app.route('/spell/<word>')
def spell(word):
    return render_template('spell.html', word=word)


@app.route('/hello')
def say_hello():
    return render_template("hello.html")


@app.route('/bye')
def say_bye():
    return 'bye bye'

# QUERY PARAMS


@app.route('/search')
def search():
    term = request.args['term']
    sort = request.args['sort']
    print(request.args)
    return f"Searching for {term} sorting by {sort}"


# POST REQUESTS:
# RAW POST REQUEST:
@app.route('/post', methods=["POST"])
def post_demo():
    return "this is post request"


# MANAGE A FORM SUBMISSION:
# route and markup of the form:
@app.route('/add-comment')
def add_comment_form():
    """first set a get request to show the form to the user so he can input the data"""
    return """
    <form method="POST">
        <input type='text' placeholder='write comment here' name='comment'/>
        <input type='text' placeholder='enter username here' name='username'/>
        <button>Submit</button>
    </form>
    """

# route of the POST request:


@app.route('/add-comment', methods=["POST"])
def save_comment():
    """ grab the inputs by their name attributes, they're stored in 'request.form'"""
    user_comment = request.form["comment"]
    user_name = request.form["username"]
    msg = f"""
    Saved. Your comment:
    <ul>
        <li>text: "{user_comment}"</li>
        <li>User name: {user_name} </li>
    </ul>
    """
    return msg


# Variable in url:

USERS = {
    'rubia': 'the puddle',
    'astro': 'the sausage',
}


@app.route('/user/<username>')
def show_user_profile(username):
    """mind function parameter exactly the same as <decorator> argument"""
    name = username
    description = USERS[username]
    return f"""
    <ul>
        <li>Name: {name}</li>
        <li>Description: {description}</li>
    </ul>
    """


phrases_db = {
    1: 'flask is cool',
    2: 'python is nice',
    3: 'snow is a character'
}


@app.route('/phrases/<int:id>')
def find_post(id):
    """mind the 'int' syntax when using numbers in urls, will trigger the function
    only if there's an integer there, otherwise woun't run the view function"""
    # this method will return 'not here' by default if no phrase is found:
    phrase = phrases_db.get(id, 'phrase not here')
    return f"<p>{phrase}</p>"

# MULTIPLE VARIABLES IN URL:


@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"Subreddit: {subreddit}"


@app.route('/r/<subreddit>/comments/<int:post_id>')
def show_comments(subreddit, post_id):
    """multiple url variables must match with multiple view func paramters"""
    return f"Comments :{subreddit}. From {subreddit}"
