from flask import Flask, request, render_template, redirect, flash, jsonify, session
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
    session['username'] = 'coriolano32'
    session['tools'] = ['hammer', 'saw', 'screw driver']
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


# JSONIFY
@app.route('/movies/json')
def get_movies_json():
    json_data = jsonify(list(movies))
    return json_data

# FORM capture data and store in session


@app.route('/form')
def show_form():
    return render_template('form1.html')


@app.route('/handle-form')
def handle_form():
    session['nickname'] = request.args['nickname']
    session['number'] = int(request.args['number'])

    return render_template('confirmation.html',
                           # this is autmatically added by flask,
                           # no need to pass it: nickname=session['nickname'], number=session['number']
                           )

# EXAMPLE 2: SECRET INVITE


@app.route('/invite')
def show_invite():
    if session.get('entered-pin', False):
        return render_template('invite.html')
    else:
        return redirect('/pin-form')


@app.route('/pin-form')
def show_pin_form():
    return render_template('pin-form.html')


@app.route('/login')
def verify_pin():
    secret = 'caca'
    pin = request.args['pin']
    if pin == secret:
        session['entered-pin'] = True
        print(session['entered-pin'])
        return redirect('/invite')
    else:
        flash('wrong pin')
        return redirect('/pin-form')
