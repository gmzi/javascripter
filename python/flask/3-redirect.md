# redirect

# flash messages

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
