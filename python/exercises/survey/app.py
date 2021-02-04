from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, satisfaction_survey, personality_quiz, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "caca"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

responses = []


@app.route('/')
def home_page():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', title=title, instructions=instructions)


finished = None


@app.route('/start')
def start():
    """clears previous responses"""
    responses.clear()
    finished = None
    return redirect('/questions/0')


@app.route('/questions/<int:id>')
def questions(id):
    url_id = int(request.url[:-2:-1])
    finished = False
    if url_id == len(responses) and id <= len(satisfaction_survey.questions):
        if url_id == len(satisfaction_survey.questions):
            finished = True
            return redirect('/end')
        question = satisfaction_survey.questions[id].question
        choice_a = satisfaction_survey.questions[id].choices[0]
        choice_b = satisfaction_survey.questions[id].choices[1]
        q_id = id
        return render_template('questions.html', question=question, q_id=q_id, choice_a=choice_a, choice_b=choice_b)
    else:
        flash('invalid question')
        return redirect(f"/questions/{len(responses)}")


@app.route('/answer', methods=['POST'])
def save_answer_and_redirect():
    """adds answer to fake db and redirects to next survey's question"""
    choice = request.form['choice']
    q_id = request.form['q_id']
    next = int(q_id) + 1
    responses.append(choice)
    return redirect(f"/questions/{next}")


@app.route('/end')
def thanks_page():
    return render_template('end_survey.html')
