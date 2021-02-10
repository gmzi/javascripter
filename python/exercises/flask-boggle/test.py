from unittest import TestCase

from flask.globals import request
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_board_and_session(self):
        with app.test_client() as client:
            res = client.get('/')
            self.assertEqual(res.status_code, 200)
            self.assertEqual(type(session['board']), list)

    def test_server_checks(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['board'] = [['E', 'M', 'Q', 'C', 'H'], ['H', 'O', 'G', 'I', 'S'], [
                    'T', 'H', 'B', 'Z', 'C'], ['G', 'Z', 'W', 'M', 'W'], ['V', 'Q', 'F', 'X', 'K']]
            res = client.get('/server?word=a')
            json_res = res.get_data(as_text=True)
            self.assertIn('result', json_res)

# TODO: test for 'stats' view
    # def test_stats(self):
    #     with app.test_client() as client:
    #         with client.session_transaction() as change_session:
    #             change_session['times'] = 3

    #             res = client.post('/stats', data={'score': '101'})

    #             self.assertEqual(res.status_code, 200)
            # self.assertEqual(session['times'], 4)
            # html = res.get_data(as_text=True)
            # self.assertIn(res.status_code, 200)
            # self.assertEqual(session['score'], 101)
            # self.assertEqual(session['times'], 4)
