# flask debug toolbar

Install:

1. check venv active
2. `pip install flask-debugtoolbar`
3. import in app.py: `from flask_debugtoolbar import DebugToolbarExtension`
4. in app.py:
   ```python
   app.config['SECRET_KEY']="mypassword"
   debug = DebugToolbarExtension(app)
   ```
5. only works on pages where templates are returned.
