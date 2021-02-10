# Testing

Types of tests:

1. [unit_tests](##unit_test)
   - One single function, or one single part of the app at a time.
2. [Integration_test](##Integration_test)(with flask)
   - multiple functions together, how they're comunicating. If they work together well.
3. [End-to-end-test](##End-to-end-test)

4. [setUp_and_tearDown](##setUp/tearDown)

5. [organize_tests](##organize)

6. [run_tests_commands](##run_tests_commands)

## unit_test

VsCode: `python run all tests`

1. Unittest module
   Python built in testing framework.
   Define all tests inside a special class.

   1. Make a new file in same dir: test_whatever.py
   2. Import the tested file and Write tests:

   ```python
    from unittest import TestCase
    import algos


    # Always TestCase inheritance:
    class AdderTestCase(TestCase):
        """example of unittest use"""
        # always 'test_' before function tested

        def test_adder(self):
            self.assertEqual(algos.adder(2, 3), 5)
            self.assertEqual(algos.adder(2, 2), 4)
            self.assertEqual(algos.adder(-2, -4), -6)


    class AlgosTestCase(TestCase):
        def test_reverse(self):
            self.assertEqual(algos.reverse_str('hello'),    'olleh')
            self.assertEqual(algos.reverse_str('Apple'),    'elppA')

        def test_is_palindrome(self):
            self.assertTrue(algos.is_palindrome('racecar'))
            self.assertFalse(algos.is_palindrome('taco'))
   ```

   Run tests: `python -m unittest NAME_OF_FILE`

   [full_list_of_methods](https://docs.python.org/3/library/unittest.html?highlight=assertequal#unittest.TestCase.assertEqual)

2. DocTest
   Built in to python. Usually to test but more to ilustrate documentation with examples.

   ```python
    def adder(a, b):
    """
    returns a added to b
    >>> adder(1, 3)
    4
    >>> adder(3, 5)
    8
    """
    return a + b
   ```

   To run dem: `python -m doctest -v name_of_file.py`
   (get nothing if test pass)

3. assert:
   Built in to python. Not very comprehensive.
   raises AssertionError if expression is false

```python
    def adder(x, y):
    """Add two numbers together."""
    print("INSIDE ADDER!")
    return x + y
    assert adder(2, 5) == 7
    assert adder(2, 7) == 10, "expected 2+7 to be 10"
    assert adder(2, 3) == 5
    print("HELLO WORLD!")
    # AssertionError if expression is false
```

Syntax for single line check: `assert 2+2 == 5, "expected 2+2 to be 4"` (will raise Error if False)
Run ignoring asserts: `python -O file_name.py`

## integration_test

Targeted specifically to flask applications. Test how components work together. Url paths, requests, routes, views, post requests, etc.
No need to run the server.

1. In app.py:

   ```python
   app.config['TESTING']= True
   app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar'] #only in case debug toolbar is installed.
   ```

2. create `test_app.py`
3. write tests:

```python
from app import app
from unittest import TestCase

class HomePageTestCase(TestCase):

   #run once before and after all tests:
   @classmethod
   def setUpClass(cls):
      print('inside set up class')

   @classmethod
   def tearDownClass(cls):
      print('inside tear down class')

   #run before and after every individual test:
   def setUp(self):
      print("inside set up")

   def tearDown(self):
      print('inside teardown)

#TEST SESSION WITH SETTED COUNT:
from flask import session
    def test_session_count_set(self):
        with app.test_client() as client:
            with client.session_transaction() as change_session:
                change_session['count'] = 999

                res = client.get('/')

                self.assertEqual(res.status_code, 200)
                self.assertEqual(session['count'], 1000)



#TEST THE SESSION ON FIRST REQUEST:
from flask import session

    def test_session_count(self):
        with app.test_client() as client:
            res = client.get('/')
            #TEST IF FIRST TIME THE REQUEST IS SENDED THE SESSION WILL BE SET TO 1:
            self.assertEqual(res.status_code, 200)
            self.assertEqual(session['responses'], 1)


#TEST REDIRECT AND FOLLOW PAGE:
   def test_redirect_followed(self):
           with app.test_client() as client:
               res = client.get('/redirect-me', follow_redirects=True)
               html = res.get_data(as_text=True)

               self.assertEqual(res.status_code, 200)
               self.assertIn(""" <div class="btn-container">
           <a href="/start"><button>Start survey</button></a>
       </div>""", html)

#TEST REDIRECT RESPONSE ONLY:
    def test_redirection(self):
        with app.test_client() as client:
            res = client.get('/redirect-me')
            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, 'http://localhost/')


# TEST POST REQUEST:
    def test_save_answer_and_redirect(self):
        with app.test_client() as client:
           #send a post request from withing the test:
            res = client.post('/answer', data={'choice': 'YES'})
            html = res.get_data(as_text=True)

            self.assertIn(res.status_code, 200)
            self.assertIn('<h2>Question  1:</h2>', html)

#TEST GET REQUEST:
# Check response status and html body of the response:
class HomePageTestCase(TestCase):
    def test_home_page(self):
        with app.test_client() as client:
            # check that the response of the route called has some part of the
            # html body we expect. First the calls:
            res = client.get('/')
            html = res.get_data(as_text=True)
            # Now the assertions of what we expect as response:
            self.assertIn("""<div class="btn-container">
            <a href="/start"><button>Start survey</button></a>
            </div>""", html)
            self.assertEqual(res.status_code, 200)



# TEST with Python debugger:
    def test_home_page(self):
        with app.test_client() as client:
            # whatever we write indented below will have access to 'client'
            # as our application and server:
            import pdb
            pdb.set_trace()
            """run 'python test_app.py' in terminal: 'self.get('/') should return the status of response,
            res = self.get('/'), then res.get_data() shows the body of the response. For more
            methods check dir(self) or dir(res)"""

```

run test: `python -m unittest test_app.py` (check venv active)

## setUp/tearDown

```python
class FlaskTests(TestCase):
   def setUp(self):
      """Stuff to run before every test"""

   def tearDown(self):
      """stuff to do after each test"""
      # code here

   def test_1(self):
      # code for test

   def test_2(self):
      #code here
```

## organize

In a small app, just put all tests in one file:

- app.py
- requirements.txt
- tests.py

In larger apps:

- app.py
- requirements.txt
- test_cats.py
- test_dogs.py

## Run_tests_commands

- `python -m unittest` run all tests (must have the same `_` pattern)
- `python -m unittest test_cats` run all tests at once
- `python -m unittest test_cats.CatViewTestCase` run test case only
- `python -m unittest test_cats.CatViewTestCase.test_meow` run function only from test case
