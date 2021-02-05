from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, satisfaction_survey, personality_quiz, surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = "caca"
debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False


all_questions = satisfaction_survey.questions


@app.route('/')
def home_page():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('home.html', title=title, instructions=instructions)


@app.route('/start', methods=['POST', 'GET'])
def start():
    """clears previous responses"""
    session['responses'] = []
    return redirect('/questions/0')


@app.route('/questions/<int:id>')
def questions(id):
    url_id = int(request.url[:-2:-1])
    responses = session['responses']
    order = int(len(responses))

# copied from solution:
    if responses is None:
        return redirect('/')

    if len(responses) == len(all_questions):
        return redirect('/end')

    if url_id != order:
        flash('invalid selection')
        return redirect(f"/questions/{order}")

    else:
        question = all_questions[id].question
        choice_a = all_questions[id].choices[0]
        choice_b = all_questions[id].choices[1]
        q_id = id
        return render_template('questions.html', question=question, q_id=q_id, choice_a=choice_a, choice_b=choice_b)


@app.route('/answer', methods=['POST'])
def save_answer_and_redirect():
    """adds answer to fake db and redirects to next survey's question"""
    choice = request.form['choice']
    responses = session['responses']
    responses.append(choice)
    session['responses'] = responses
    next = len(responses)
    if next < len(all_questions):
        return redirect(f"/questions/{next}")
    else:
        return redirect('/end')


@app.route('/end')
def thanks_page():
    return render_template('end_survey.html')
