# API creation with flask

![full_graphic](/images/routes.jpg)

## full demo

1. app.py:

```python
from flask import Flask, jsonify, request, render_template

from models import db, connect_db, Todo

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///todos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "oh-so-secret"

connect_db(app)


@app.route('/')
def index_page():
    """Renders html template that includes some JS - NOT PART OF JSON API!"""
    todos = Todo.query.all()
    return render_template('index.html', todos=todos)

# *****************************
# RESTFUL TODOS JSON API
# *****************************

# GET routes


@app.route('/api/todos')
def list_todos():
    """Returns JSON w/ all todos"""
    # serialize all todos from db:
    all_todos = [todo.serialize() for todo in Todo.query.all()]
    # jsonify and return:
    return jsonify(todos=all_todos)


@app.route('/api/todos/<int:id>')
def get_todo(id):
    """Returns JSON for one todo in particular"""
    todo = Todo.query.get_or_404(id)
    return jsonify(todo=todo.serialize())

# ------------------------------------------------------------------------
# POST


@app.route('/api/todos', methods=["POST"])
def create_todo():
    """Creates a new todo and returns JSON of that created todo"""
    new_todo = Todo(title=request.json["title"])
    db.session.add(new_todo)
    db.session.commit()
    response_json = jsonify(todo=new_todo.serialize())
    # TUPLE '(RESPONSE, STATUS CODE)' TO COMPLY WITH POST RESPONSE STANDARDS:
    return (response_json, 201)

# ------------------------------------------------------------------------
# PATCH ROUTE (we don't use a 'put' request because the 'id' of a todo can't be
# changed, is automatically created by databse)


@app.route('/api/todos/<int:id>', methods=["PATCH"])
def update_todo(id):
    """Updates a particular todo and responds w/ JSON of that updated todo"""
    todo = Todo.query.get_or_404(id)
    # if 'title' not found in request, 'todo.title' will be the default:
    todo.title = request.json.get('title', todo.title)
    # 'todo.done' as default value in case 'done' did'nt come in request:
    todo.done = request.json.get('done', todo.done)
    db.session.commit()
    return jsonify(todo=todo.serialize())

# ------------------------------------------------------------------------
# DELETE ROUTE


@app.route('/api/todos/<int:id>', methods=["DELETE"])
def delete_todo(id):
    """Deletes a particular todo"""
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify(message="deleted")
```

2. model.py:

```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Todo(db.Model):
    """Todo Model"""

    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    done = db.Column(db.Boolean, default=False)

    # SERIALIZE METHOD HERE:
    def serialize(self):
        """Returns a dict representation of todo which we can turn into JSON"""
        return {
            'id': self.id,
            'title': self.title,
            'done': self.done
        }

    def __repr__(self):
        return f"<Todo {self.id} title={self.title} done={self.done} >"

```

## Restful_Standard_responses:

- POST/snacks
  Returns 201 CREATED, with JSON describing new snack
- GET/snacks/[id]
  Returns 200 OK, with JSON describing a single snack
- PUT/snacks/[id]
- PATCH/snacks/[id]
  Returns 200 OK, with JSON describing updated snack
- DELETE
  Returns 200 OK, with JSON describing success

Accept json, return json.

## Request_verbs:

![idempotent-safe](/images/idempotent-safe.jpg)

1. **PUT**
   - Update entire resource (a complete blog post)
2. **PATCH**
   - update part of a resource (upvotes or comments to blog post)
3. **DELETE**
   - delete resource
4. **POST**
   - doesn't remain in browser's history, not cached, not bokmaarked
   - data is sent in the body of the request.
     Use for:
     send an email
     add to db
     create/update user
5. **GET**
   - fetch infrmation
   - remains in browser history
   - data sent in query string
     User for:
     search
     filter
     show things

Forms: only POST or GET requests

## serialization

Convert an object (like a sqlalchemy model) into dict or list, so we can jsonify to respond with json.

```python
# Create method to serialize
def serialize_dessert(dessert):
    """Serialize a dessert SQLAlchemy obj to dictionary."""
    return {
        "id": dessert.id,
        "name": dessert.name,
        "calories": dessert.calories,
    }

# Use in /desserts:
@app.route("/desserts")
def list_all_desserts():
    """Return JSON {'desserts': [{id, name, calories}, ...]}"""

    desserts = Dessert.query.all()
    serialized = [serialize_dessert(d) for d in desserts]

    return jsonify(desserts=serialized)

# Use in /desserts/id
@app.route("/desserts/<dessert_id>")
def list_single_dessert(dessert_id):
    """Return JSON {'dessert': {id, name, calories}}"""

    dessert = Dessert.query.get(dessert_id)
    serialized = serialize_dessert(dessert)

    return jsonify(dessert=serialized)

```

## nested_routes

Try to not pass two levels of nesting.

![nested_routes_graphic](/images/nested-routes.jpg)

## test_APIs

Will test the JSON response, not the HTML. response.json.
Use **Insomnia** to inspect the responses you get from your requests.

1. tests.py:

```python
def test_all_desserts(self):
    with app.test_client() as client:
        resp = client.get("/desserts")
        self.assertEqual(resp.status_code, 200)

        self.assertEqual(
            resp.json,
            {'desserts': [{
                'id': self.dessert_id,
                'name': 'TestCake',
                'calories': 10
            }]})
```

2. test_seed.py:

```python
from unittest import TestCase

from app import app
from models import db, Dessert

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///desserts_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


class DessertViewsTestCase(TestCase):
    """Tests for views about desserts."""

    def setUp(self):
        """Make demo data."""

        Dessert.query.delete()
        db.session.commit()

        dessert = Dessert(name='TestCake', calories=10)
        db.session.add(dessert)
        db.session.commit()

        self.dessert_id = dessert.id

    def tearDown(self):
        """Clean up fouled transactions."""

        db.session.rollback()

    def test_all_desserts(self):
        with app.test_client() as client:
            resp = client.get("/desserts")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'desserts': [{
                    'id': self.dessert_id,
                    'name': 'TestCake',
                    'calories': 10
                }]})

    def test_get_single_dessert(self):
        with app.test_client() as client:
            resp = client.get(f"/desserts/{self.dessert_id}")
            self.assertEqual(resp.status_code, 200)

            self.assertEqual(
                resp.json,
                {'dessert': {
                    'id': self.dessert_id,
                    'name': 'TestCake',
                    'calories': 10}})

    def test_create_dessert(self):
        with app.test_client() as client:
            resp = client.post(
                "/desserts", json={
                    "name": "TestCake2",
                    "calories": 20,
                })
            self.assertEqual(resp.status_code, 201)

            # don't know what ID it will be, so test then remove
            self.assertIsInstance(resp.json['dessert']['id'], int)
            del resp.json['dessert']['id']

            self.assertEqual(
                resp.json,
                {"dessert": {'name': 'TestCake2', 'calories': 20}})

            self.assertEqual(Dessert.query.count(), 2)

            # Run: `python -m unittest -v tests`

```

# REST and JSON APIs creation

REST (Representational State Transfer) it's an architecture for creating web services. It's a way of interacting with the resource (look a particular pokemon, retrieve it, create a new one, delete it, etc.). It's a standard, conventional patter for defining patterns to interact with apps. APIS that use this pattern are called RESTful APIs. Features:

- Have a base url (http://api.site.com/something)
- have a resource after the base url (http://api.site.com/something/api/resource-name)
- Use standard http verbs (GET, POST, PUT/PATCH, DELETE, GET)

## Safety

A safe operation is one that does not change the data requested.

## idempotence

An idempotent operation can be performed many times (with same data) with the result of all calls being the same as if it was done once.
Idempotence refers to side-effects not all-effects or responses.
Example: In arithmetic, calculating absolute value

# API

Application Programming Interface. Interface for the code to interact with other code or applications. Different kind of APIs to communicate with robots, with servers, etc.
Companies provide APIs to retrieve data from them, or to send data.

Web based APIs are available through requests.

## Data formats

The interface for code is different from the interface for a human. When we browse on the web, we make HTTP requests and get HTML back. But HTML has a lot of page structure information, so APIs don't respond with HTML, because they respond with data.

### JSON

Javascript Object Notation. Single quotes don't work.
Can convert JSON object to JavaScript object.

```json
{
  "person": {
    "name": "Elie",
    "favoriteColor": "purple",
    "city": "San Francisco",
    "favoriteNumber": -97,
    "interests": ["CEOing", "eating Mediterranean food"],
    "futureDreams": null
  }
}
```

### XML

Similar to HTML, except tags are custom. It's an old format.

```xml
<person>
  <name>Elie</name>
  <favoriteColor>purple</favoriteColor>
  <city>San Francisco</city>
</person>
```

## curl

Tool to make requests to APIs. (Check terminal.md for commands)

## Documentation

APIs documentation are basically a bunch of HTTP request endpoints where we send a request to.
Usually they will have a BASE URL and then different endpoints.
`http://www.BASEURL.com/ENDPOINTS`
