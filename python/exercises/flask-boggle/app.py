from flask import Flask, request, render_template, redirect, flash, jsonify
from flask.globals import session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'longtime'

boggle_game = Boggle()

guesses = []


@app.route('/')
def show_board_show_form_set_session():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('base.html', board=board)


@app.route('/server')
def server_checks():
    word = request.args['word']
    if is_repeated(word):
        msg = 'word taken'
    else:
        msg = boggle_game.check_valid_word(session['board'], word)
    json_res = jsonify(dict({'result': msg}))
    return json_res


@app.route('/stats', methods=['POST'])
def stats():
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
