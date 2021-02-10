from flask import Flask, request, render_template, redirect, flash, jsonify
from flask.globals import session
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'longtime'

boggle_game = Boggle()


@app.route('/')
def show_board_show_form_set_session():
    board = boggle_game.make_board()
    session['board'] = board
    session['score']
    session['times']
    return render_template('base.html', board=board)


@app.route('/server')
def server_checks():
    word = request.args['word']
    msg = boggle_game.check_valid_word(session['board'], word)
    print(msg)
    json_res = jsonify(dict({'result': msg}))
    return json_res


@app.route('/stats', methods=['POST'])
def stats():
    current_score = int(request.json['score'])
    if session['score'] < current_score:
        session['score'] = current_score
    session['times'] += 1
    return render_template('base.html')


# TODO 1: functionality to check if a word has already been used.
# TODO 2: catch empty input
