1. [basics](#basics)
   - routes
   - requests
   - forms
   - variables in urls
   - template rendering
2. [redirect](##redirect)
3. [flash](##flash)
4. [jsonify](##jsonify)
5. [sessions-cookies](##flask_sessions)
6. [form-session-flow](###form-session-flow)
7. [form](##forms)
8. [folders_structure](##dir)
9. [flask_setup](#setup)
10. [debug_toolbar_extension](#debug)

# basics

full syntax:

```python
from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice, sample

# main instance of Flask class:
app = Flask(__name__)
# debug toolbar extansion config:
app.config['SECRET_KEY'] = "mypassword"
debug = DebugToolbarExtension(app)
# to stop debugger:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

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


# VARIABLES IN URLS:

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

# JSONIFY
@app.route('/movies/json')
def get_movies_json():
    json_data = jsonify(list(movies))
    return json_data

```

Views are functions that return strings of html according to requests.
Routes are the subdirectories of the app

---

## redirect

## flash

Full syntax:

```python
from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

# DEBUGGER:
# Cature redirection with debugger:
app.config['SECRET_KEY'] = "caca"
debug = DebugToolbarExtension(app)
# to stop debugger capture:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


# REDIRECT POST to GET:
# fake db:
movies = {'Amadeus', 'Chicken run', 'rambo'}


@app.route('/movies')
def show_all_movies():
    """show all movies in DB and prompt to add new movie"""
    return render_template('movies.html', movies=movies)


@app.route('/movies/new', methods=['POST'])
def add_movie():
    """adds new movie to DB and redirects to confirmation page, doesn't
    reuse '/movies/new' route template because that would cause the weird 'are you sure
    you want to resubmit the form' message and other weird behavoir, so it goes to /movies route,
    could also redirect to a confirmation of 'movie added' page and then go back to home"""
    title = request.form['title']
    # check if new movie exists and add to db:
    if title in movies:
        # flash to user with category
        flash('Movie already exists', 'error')
    else:
        movies.add(title)
        # FLASH TO USER with category:
        flash("Movie added!!", 'success')
    # redirect:
    return redirect('/movies')


# Redirect old to new:
@app.route('/old-page')
def redirect_to_home():
    return redirect('/home')


@app.route('/home')
def home_page():
    return render_template('home.html')


```

will be two requests: the first one with 302, the second one (made automatically by the browser) with code 200

## flash message

In app.py:

```python
flash('message-text!!', 'error/success/whatever')
```

In base.html template:

```html5
<body>
    <!-- check if there are flash messages, and run only if so -->
    {% with messages = get_flashed_messages(with_categories=true) %}
    {% if messages %}
    <section class="messages">
    {% for category, msg in messages %}
        <p class="{{category}}">{{msg}}</p>
    {%endfor%}
    </section>
    {% endif %}
    {%endwith%}
    <h1>All movies{%block title %} {%endblock%}</h1>
    {%block content%}
    {%endblock%}
</body>

```

In CSS, style .error, .success or whatever category names you assigned.

# redirecting

Redirecting to different endpoints. Used when logging in users, authenticating, etc.
To redirect:

- send HTTP response with status code 302 (or other "redirect code")
- must contain a URL for browser to re-request.

## jsonify

return json for apis, and also set the header of the request to JSON, to specify to all browser what type of data it contents. Mind sets can be JSON, have to be sets, lists or dictionaries.

```python
# JSON
movies = {'rambo', 'rocky'}

@app.route('/movies/json')
def get_movies_json():
    json_data = jsonify(list(movies))
    return json_data
```

## flask_sessions

Http is a stateless protocol, it doesn't "remember" nothing. An http request has no history, and is entirely separate from what came before or after.
If want to add things to a shopping cart, or stay authenticated in a website, must use cookies or sessions.

1. Browser Sessions
   Treat session just like a dictionary

   ```python
   from flask import Flask, session

   app = Flask(__name__)
   app.config['SECRET_KEY'] = "myPassword"

   @app.route('/some-route')
   def some_route():
       """flask takes the session's key-value pair, it will serialize it, will digitally sign it, and send the result as a cookie as part of the response that the client gets back. That cookie will then be stored in the browser and sent along with future requests."""
       # SET SESSION VALUES:
       session['username'] = 'coriolano32'
       session['tools'] = ['hammer', 'saw', 'screw driver']
       return 'Ok'

       # UPDATE SESSION VALUES:
       session['username'] = 'pepito123'

       #ON THE SERVER SIDE, TO READ A SESSION, JUST ACCESS IT LIKE IN A DICT:
       session['username'] # 'pepito123'
       session['tools'] # ['hammer', 'saw', 'screw driver']
   ```

   Session specs:

   - contain info for the current browser
   - Preserve data type (lists stays lists, etc)
   - Are cryptographically signed, user's can't modify data. ("signed" means that is codified by an algorithm in the server)
     It's a dictionary that manage cookie creation, reading and sending. It's more secure than cookies.

   ### form-session-flow

   1. Show form view:

      ```python
      @app.route('/form')
      def show_form():
          return render_template('form1.html')
      ```

   2. Form template:

      ```html
      {% extends 'base.html'%} {%block content%}

      <form action="/handle-form">
        Nickname?
        <input name="nickname" type="text" />
        Number?
        <input name="number" type="text" />
        <input type="submit" />
      </form>
      {%endblock%}
      ```

   3. Handle user input:
      (`request.args` for GET requests
      `request.form` for POST requests)

      ```python
      @app.route('/handle-form')
      def handle_form():
         session['nickname'] = request.args['nickname']
         session['number'] = int(request.args['number'])

         return render_template('confirmation.html',
                                # this is autmatically added by flask without us having to pass it:
                                # nickname=session['nickname'], number=session['number']
                                )
      ```

   4. Confirmation template:

      ```html
      {% extends 'base.html'%} {%block content%}

      <h2>done</h2>
      <ul>
        <li>Your nickname has been stored as {{session['nickname']}}</li>
        <li>Your number has been stored as {{session['number']}}</li>
      </ul>

      {%endblock%}
      ```

2. Server Sessions, not flask default, to import it check docs about flask Sessions.

3. Cookies

   - ### set cookie from server side

   ```python
   from flask import Flask, make_response

   @app.route('/demo')
   def demo():
       content = "<h1>Hello</h1>"
       res = make_response(content)
       res.set_cookie('fav-color', 'blue')
       return res
   ```

   - ### read cookies

     ```python
     from flask import Flask, request

     @app.before_request
     def print_cookies():
         print(request.cookies) # {'fav_color': 'blue', 'location': 'las totoras motel'}
     ```

   - ### cookie options

     - Expiration
       - default is "as long as browser is running" (session cookie)
     - Domain (which domain should the cookie be sent to)
     - HttpOnly (not accessible via javascript)

   - Chrome: Dev Tools - Application - Storage - Cookies
   - Key-value pair, stored in the browser (client side). When making a request to a website, the browser sends all the cookies it has in storage (in the header of the request), when the server receives them, uses only the ones that can understand, and ignore the rest. If not, the server will instruct the browser what to do about storing cookies and how they will be structured. The client will send those cookies to the server always with every single request. (similar to JS local storage, with the difference that cookies are sent to server). with this implementation we now have state in our http protocol. The server can also send something in the http response instructing the browser to store a cookie, and the browser will store it in the client side.

4. Types of browser storage:

   1. LocalStorage
      - not sent to server
      - Stores data with no expiration date, and gets cleared only through JavaScript, or clearing the broser cache.
      - It's domain specific (can't use it accross different websites).
      - Storage limit is much larger than cookies.
      - For complex stuff or things we don't need to be in the server
   2. SessionStorage (different than flask session)
      - not sent to server
      - Stores data only for until the browser tab is closed.
      - Storage limit larger than cookie.
   3. Cookie
      - 4kb limit (must be light because:)
      - They are sent to servers
      - server and client can read them
      - Are made secure by setting the OnlyHttpOnly flag as true for that cookie. This prevent client-side access to it.
      - Sent from browser to server for every request to the same domain.
      - Set usually from the server side.
      - older browsers support

## forms

Grab data from forms:

```python
# from input name:
algo = request.form['algo']
# from multiple checkboxes:
muchos = request.getlist('muchos')
# from url or other stuff:
aver = request.get('aver')
```

`request.args` for GET requests
`request.form` for POST requests

```html
{% extends 'base.html'%} {%block content%}
<ul class="movies">
  {%for movie in movies%}
  <li>{{movie}}</li>
  {%endfor%}
</ul>
<form action="/movies/new" method="POST">
  <h2>Add your movie:</h2>
  <input type="text" placeholder="movie title" name="title" />
  <button>submit</button>
</form>
{%endblock%}
```

# dir

folders structure:

- my_project_dir/
  - venv/
  - app.py
  - templates/
    - hello.html
  - static
    - my-css.css (in base.htm: `<link rel="stylesheet" href="/static/my-css.css">`)
    - my-script.js

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

# debug

## flask debug toolbar

Install:

1. check venv active
2. `pip install flask-debugtoolbar`
3. in app.py:

   ```python
   from flask_debugtoolbar import DebugToolbarExtension

   app = Flask(__name__)

   # config debugger:
   app.config['SECRET_KEY'] = "caca"
   debug = DebugToolbarExtension(app)
   # to stop debugger:
   app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
   ```

4. only works on pages where templates are returned.

## Python debugger pdb

```python
import pdb
pdb.set_trace()
#execution will stop and terminal will be ready to find type variables and find its values.
```

Key commands for pdb:
| key|command
| ? | Get help
| l | List code where I am
| p | Print this expression
| pp | Pretty print this expression
| n |Go to next line (step over)
| s |Step into function call
| r |Return from function call
| c |Continue to next breakpoint
| w |Print “frame” (where am I?)
| q |Quit debugger
