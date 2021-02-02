1. [basics](#basics)
   - routes
   - requests
   - forms
   - variables in urls
2. [flask_setup](#setup)

# basics

```python
from flask import Flask, request


app = Flask(__name__)

# Root route


@app.route('/')
def home_page():
    """these functions are called 'view functions', because
    they set the rendering of the response"""
    msg = """Home page!"""
    link = '<a href="/hello">Go to hello page</a>'
    return msg + link

# More routes:


@app.route('/hello')
def say_hello():
    msg = 'hey hey'
    return msg


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

```

---

# setup

# setup flask server

1. Installing Flask
   1. mkdir or cd to directory
   2. create virtual env (`python3 -m venv venv`)
   3. activate venv (`source venv/bin/activate`)
   4. `pip install flask`
2. Make a python file to run your code:
   1. cd to project main folder
   2. `touch app.py`
   3. in 'app.py', instantiate your app:
      - `from flask import Flask`
      - `app = Flask(__name__)`
3. Start server:
   1. Production mode
      - `flask run` (with virtual env active)
      - `ctrl + C` stop server
   2. Development mode (debugger and restart activated):
      - `FLASK_ENV=development flask run`
      - (Set dev mode to default in local venv and not permanently:
        1. check venv active
        2. `export FLASK_ENV=development`
        3. `flask run` will run dev mode by default, until terminal window is closed.)
      - (change bash profile so it runs flask dev mode by default in all terminals):
        1. go to local .zshrc file
        2. paste `export FLASK_ENV=development`
        3. reboot all terminals
        4. `flask run` in venv will run in dev mode by default.
4. (If flask app file isn't called 'app.py':
   - `FLASK_APP=my_custom_name.py flask run` (mind the not spaced chars))

# Frameworks

Like a library, but more opinionated. They provide all the functions, classes and logic to manage the requests and responses of our web apps and programs.
"Which request to respond and how to respond."
Basically, web applications do this:

- handle web requests
- producte dynamic html based on those requests
- handle forms
- handle cookies
- connecto to databases
- provide user authentication
- cache pages for performance
