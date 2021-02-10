from flask import Flask, request, render_template, redirect, flash, jsonify
from flask.globals import session
from boggle import Boggle
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = 'longtime'

debug = DebugToolbarExtension(app)
# to stop debugger:
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()


guesses = []


@app.route('/')
def board_and_session():
    """calls Boggle method to create board, pass board to template 
    and sets board key and value in session"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('base.html', board=board)


@app.route('/server')
def server_checks():
    """ takes word from form, calls Boggle method to check if word is
    valid and function to check is word has been already taken, returns
    json response to front end"""
    word = request.args['word']
    if is_repeated(word):
        msg = 'word taken'
    else:
        msg = boggle_game.check_valid_word(session['board'], word)
    json_res = jsonify(dict({'result': msg}))
    return json_res


@app.route('/stats', methods=['POST'])
def stats():
    """ Creates session key for record score, receives the score of 
    each play, if it's a record high, stores it in session, 
    otherwise keeps existing score.
    Creates and store the number of games played in current browser"""
    current_score = int(request.json['score'])
    if 'score' not in session:
        session['score'] = current_score
    else:
        if session['score'] < current_score:
            session['score'] = current_score

    if 'times' not in session:
        session['times'] = 1
    else:
        session['times'] += 1
    return render_template('base.html')


def is_repeated(word):
    if word not in guesses:
        guesses.append(word)
        return False
    else:
        return True
