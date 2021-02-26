1. app.py (DML):
   - [query_database](#query_database)
   - [create_instance_and_commit](#create_instance_and_commit)
   - [update_instance](#update_instance)
   - [delete_instance](#delete_instance)
   - [rollback](#rollback)
2. models.py (DDL):
   - [single_model_syntax](##single_model_syntax)
   - [one_to_many](##one_to_many)
   - [many_to_many](##many_to_many)
   - [models_setup](##models_setup)
3. [seed_file](#seed_file)
4. [routes_demo](#routes_demo)
5. [tests](#tests)
   - [model_test](##model_test)
   - [views_test](##views_test)
6. [install](#install)
   [setup](#setup)

# query_database

- check if a `__repr__` method is defined in table declaration in models.py.

1. Fetching records:
   - `.get(pk)`
   - `.all()` all records that match
   - `.first()` first record that match or **None** if nothing matches
   - `.one()` get first record, **Error** if no results or if there's more than one result, "there should be only one thing that matches this, otherwise give me error".
   - `.one_or_none()` **Error** if more than one result, **None** if 0 results.
   - `.count()` number of records found without fetching them.
2. Single queries:

   ```python
    # select specific columns (retrieves tuples):
    db.session.query(Employee.id, Employee.name).all() # [(1, 'Leonard'), (2, 'Liz'), (3, 'Maggie')]

   Pet.query.all() #(it's like 'SELECT * FROM pets')

   # GET
   Pet.query.get(1) # select by id (SELECT * FROM pets WHERE id = 1)
   Department.query.get('finance')

   # GET_OR_404
   Pet.query.get_or_404(7)
   Department.query.get_or_404('marketing')

   # FILTER_BY
   Pet.query.filter_by(species='dog').all() # all objects that matches 'dog'
   Pet.query.filter_by(species='dog').first() # only first result matching 'dog'
   Pet.query.filter_by(species='dog', hunger=12).all() # multiple paramsdcxc

   # FILTER
   # for queries where we search this OR that, this AND that, this uppercase OR lowercase
   Pet.query.filter(Pet.species == 'dog').all()
   Pet.query.filter(Pet.hunger < 20).all()
   Pet.query.filter(Pet.hunger > 20).all()
   Pet.query.filter(Pet.hunger != 20).all()
      #AND
   Pet.query.filter(Pet.hunger < 15, Pet.species == 'dog').all()
   Pet.query.filter((Pet.hunger < 15) & (Pet.species == 'dog')).all()
     # OR_
   Employee.query.filter(db.or_(Employee.state == 'CA', Employee.id > 65)).all()
   Employee.query.filter((Employee.state == 'CA') | (Employee.id > 65) ).all()

   #LIKE / ILIKE
   Employee.query.filter(Employee.name.like('%Jane%')).first()
   Employee.query.filter(Employee.name.ilike('%jane%')).all()
   # IN_
   Employee.query.filter(Employee.id.in_([22, 23, 24])).one()

   # GROUP BY / HAVING
    q = Employee.query

    q.group_by('state')
    q.group_by('state').having(db.func.count(Employee.id) > 2)

   #ORDER BY
    q.order_by('state')

   #OFFSET
    q.offset(10)

   #LIMIT
   q.limit(10)
   ```

   [methods_full_list_docs](https://docs.sqlalchemy.org/en/13/orm/query.html#sqlalchemy.orm.query.Query.offset)

3. Chained queries:

   ```python
   new_hires = Employee.query.filter(Employee.id >= 4)
   cal_new_hires = new_hires.filter(Employee.state == 'CA')
   new_hires.all() # [<Employee 3>, <Employee 12>, <Employee233>]
   cal_new_hires.all() # [<Employee 3>, <Employee 12>]
   ```

# create_instance_and_commit

1. (Create table in models.py.)
2. in app.py:

   ```python
   from models import db, connect_db, Pet

   # CREATE NEW INSTANCES (ONE BY ONE)
   fluffy = Pet(name='Fluffy', species='Pet', hunger=13)
   rocket = Pet(name='Rocket', species='Cat', hunger=10)
   toby = Pet(name='Toby', species='Goose', hunger=20)

   # CREATE NEW INSTANCES (MULTIPLE AT ONCE)
   names = ['Sushi', 'Scout', 'Piggie', 'Carrot']
   species = ['pig', 'cat', 'bunny', 'bunny']
   pets = [Pet(name=n, species=s) for n, s in zip(names, species)]
   pets[0].name  # Sushi

   # STAGE NEW INSTANCES (ONE BY ONE):
   db.session.add(fluffy)

   # STAGE NEW INSTANCES (ALL AT ONCE):
   db.session.add_all(pets)
   #or
   db.session.add_all([d1, d2, d3])

   # COMMIT NEW INSTANCES:
   db.session.commit()
   ```

# update_instance

```python
rocket.name = 'Rocko'
db.session.add(rocket)
db.session.commit()
```

# delete_instance

```python
# DELETE SINGLE:
Pet.query.filter_by(hunger=23).delete()
db.session.commit()

# DELETE MULTIPLE:
Pet.query.filter(Pet.species == 'bunny').delete()
db.session.commit()
```

# rollback

```python
db.session.rollback()
```

When there's an error in the attempt to commit a new object to the database, we have to rollback before trying to add or update new data to db, this will get rid of anything that might have happened to the database session:

# models

## single_model_syntax

```python
from flask_sqlalchemy import SQLAlchemy
# 1. Configure the connection to the database
db = SQLAlchemy()
# 2. A function to Associate the app with the database:
def connect_db(app):
    db.app = app
    db.init_app(app)
# 3. Define model (o sea table) (class name in Singular, table name in plural):

class Pet(db.Model):
    """Pet."""
    __tablename__ = "pets"

    # TABLE COLUMNS AND CONSTRAINS:
    id = db.Column(db.Integer,  # db.Integer same as INT
                   primary_key=True,  # PRIMARY KEY
                   autoincrement=True)
    name = db.Column(db.String(50),  # db.string same as TEXT (max length 50)
                     nullable=False,  # nullable false same as NOT NULL
                     unique=True)  # unique true same as UNIQUE
    species = db.Column(db.String(30), nullable=True)
    hunger = db.Column(db.Integer, nullable=False, default=20)  # default value

    # REPRESENTATION OBJECT:
    def __repr__(self):
        """show info about pet."""
        p = self
        return f"<Pet id={p.id} name={p.name} species={p.species} hunger={p.hunger}>"

    # CUSTOM METHODS:
    @classmethod
    def get_by_species(cls, species):
        return cls.query.filter_by(species=species).all()

    @classmethod
    def get_all_hungry(cls):
        return cls.query.filter(Pet.hunger > 15).all()

    def greet(self):
        """Greet using name"""
        return f"I'm {self.name} the {self.species or 'thing'}"

    def feed(self, food=10):
        """Updates hunger based on passed food. Default food is 10"""
        self.hunger -= food
        self.hunger = max(self.hunger, 0)


# CALL CLASS METHOD:
# in app.py:
Pet.get_by_species('cat')  # [Pet id=4 name=Scout]
Pet.get_all_hungry()

# CALL INSTANCE METHODS:
# In app.py:
piggie = Pet.query.get(6)
print(piggie.greet())  # I'm Piggie the bunny

# CALL METHOD AND UPDATE DATABASE:
# in app.py
fluffy = Pet.query.get(1)
fluffy.feed(9)
db.session.add(fluffy)
db.session.commit()
# now check database: fluffy.hunger: 4
```

## one_to_many

SQLAlchemy allows to create RELATIONSHIPS, to join different tables. First define a Foreign key constrain and then define the realtionship:
![db_graphic](/images/one-to-many-ex.jpg)

```python
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)


class Department(db.Model):
    """Department. A department has many employees."""

    __tablename__ = "departments"

    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text,
                          nullable=False,
                          unique=True)
    phone = db.Column(db.Text)

    # RELATIONSHIP TO FOREIGN TABLE (if no backref somewhere else):
    # dept_employees = db.relationship('Employee')


class Employee(db.Model):
    """ employee table """

    __tablename__ = 'employees'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    state = db.Column(db.Text, nullable=False, default='CA')

    # 1. FOREIGN KEY constraint:
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))

    # 2. RELATIONSHIP TO FOREIGN TABLE:
    # syntax "one way only"
    # department = db.relationship('Department')
    # syntax to go both ways (from Employee to Department and from Department to Employee, and
    # no need to add a relationship in Department):
    department_where_works = db.relationship('Department', backref='emps')


# USE RELATIONSHIP FROM DEPARTMENT:
# app.py
d = Department.query.get('MKTG')
d.dept_employees[0].name  # River Bottom
d.dept_employees  # [<Employee 1>, <Employee 3>, <Employee 5>]

# USE RELATIONSHIP FROM EMPLOYEE:
# app.py:
emp = Employee.query.get(1)
emp.department.dept_code  # MKTG
emp.department.phone # 23232323

# USE BACKREF RELATIONSHIP from Department:
d = Department.query.get('MKTG')
d.emps # [<Employee 1>, <Employee 3>, <Employee 5>]

# USE BACKREF RELATIONSHIP from Employee:
ca = Employee.query.filter_by(state='CA').first()
ca.name  # Summer Winter
ca.department_where_works  # Department MKTG
ca.department_where_works.phone  # 23232323
```

## many_to_many

## models_setup

1. (cd to dir and create empty database)
2. in app.py:
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///my_database'
   ```
3. Write models.
4. check venv active
5. check postgres server active
6. In app.py:
   ```python
   db.create_all()
   ```
7. in terminal: `python app.py`
8. Once the db is created, erase 'db.create_all()`, otherwise will create a new table every time 'app.py' runs.
9. In app.py, import the new created class:
   ```python
   from models import db, connect_db, Mymodel
   ```

---

# update_model

Go to terminal, connect to database and drop table with SQL syntax (`DROP TABLE my_table`). Then redo the table in Alchemy and run it again from app.pyYo .
To reset all tables:

```python
db.drop_all()
db.create_all()
```

# seed_file

```python
"""Seed file to make sample data for pets db."""

from models import Pet, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
Pet.query.delete()

# Add pets
whiskey = Pet(name='Whiskey', species="dog")
bowser = Pet(name='Bowser', species="dog", hunger=10)
spike = Pet(name='Spike', species="porcupine")

# Add new objects to session, so they'll persist
db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)

# Commit to database
db.session.commit()

# run file: 'python seed.py', beware database will be erased
```

# routes_demo

An app.py file demo with sqlalchemy queries:

```python
from flask import Flask, request, render_template, redirect
from flask.helpers import flash
# 1. Import models.py:
from models import db, connect_db, Pet

app = Flask(__name__)
# 2. Database config:
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pet_shop_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
# Other configs:
app.config['SECRET_KEY'] = 'caca'

# 3. Call db:
connect_db(app)


@app.route('/')
def list_pets():
    """shows list of pets in database"""
    pets = Pet.query.all()
    print(pets)
    return render_template('list.html', pets=pets)


@app.route('/', methods=["POST"])
def create_pet():
    # capture data from form:
    name = request.form["name"]
    species = request.form["species"]
    hunger = request.form["hunger"]
    hunger = int(hunger) if hunger else None

    # Create model class:
    new_pet = Pet(name=name, species=species, hunger=hunger)

    # add to db session:
    db.session.add(new_pet)

    # try to commit or catch error and rollback:
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return 'No good, do something!!!!'

    return redirect('/')


@app.route('/delete/<int:pet_id>')
def delete_pet(pet_id):
    Pet.query.filter_by(id=pet_id).delete()
    try:
        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return "No good coudln't delete"
    return redirect('/')


@app.route('/species/<species_name>')
def show_pets_by_species(species_name):
    pets = Pet.get_by_species(species_name)
    return render_template('species.html', pets=pets, species_name=species_name)


@app.route('/<int:pet_id>')
def show_pet(pet_id):
    """show details about single pet"""
    pet = Pet.query.get_or_404(pet_id)
    return render_template('details.html', pet=pet)
```

---

# tests

USE A SEPARATE DATABASE FOR TESTS!!!!!! Create a mock one, don't test on app database.

## model_test

demo:

```python
# 1. Create alternate database for tests
# 2:

from unittest import TestCase

from app import app
from models import db, Pet

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_pets_db'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class PetModelTestCase(TestCase):
    """Tests for model for Pets."""

    def setUp(self):
        """Clean up any existing pets."""

        Pet.query.delete()

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_greet(self):
        pet = Pet(name="TestPet", species="dog", hunger=10)
        self.assertEquals(pet.greet(), "I'm TestPet the dog")

    def test_feed(self):
        pet = Pet(name="TestPet", species="dog", hunger=10)
        pet.feed(5)
        self.assertEquals(pet.hunger, 5)

        pet.feed(999)
        self.assertEquals(pet.hunger, 0)

    def test_get_by_species(self):
        pet = Pet(name="TestPet", species="dog", hunger=10)
        db.session.add(pet)
        db.session.commit()

        dogs = Pet.get_by_species('dog')
        self.assertEquals(dogs, [pet])


# RUN TESTS:
# 'python -m unittest test_models.py'

```

## views_test

demo:

```python
from unittest import TestCase

from werkzeug.utils import html

from app import app
from models import db, Pet

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///test_pets_db'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class PetViewsTestCase(TestCase):
    """Tests for views for Pets."""

    def setUp(self):
        """Add sample pet."""

        Pet.query.delete()

        pet = Pet(name="TestPet", species="dog", hunger=10)
        db.session.add(pet)
        db.session.commit()

        self.pet_id = pet.id

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_list_pets(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestPet', html)

    def test_show_pet(self):
        with app.test_client() as client:
            resp = client.get(f"/{self.pet_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestPet</h1>', html)
            # self.assertIn(self.pet.species, html)

    def test_create_pet(self):
        with app.test_client() as client:
            d = {"name": "TestPet2", "species": "cat", "hunger": 20}
            resp = client.post("/", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("TestPet2", html)

    def test_show_pets_by_species(self):
        with app.test_client() as client:
            more_names = ['TestPet3', 'TestPet4', 'TestPet5']
            more_species = ['cat', 'cat', 'cat']
            more_pets = [Pet(name=n, species=s)
                         for n, s in zip(more_names, more_species)]
            db.session.add_all(more_pets)
            db.session.commit()
            resp = client.get(f"/species/cat")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn('dog', html)

    def test_delete_pet(self):
        with app.test_client() as client:
            more_names = ['TestPet6', 'TestPet7', 'TestPet8']
            more_species = ['cat', 'cat', 'cat']
            more_pets = [Pet(name=n, species=s)
                         for n, s in zip(more_names, more_species)]
            db.session.add_all(more_pets)
            db.session.commit()

            resp = client.get(
                f"/delete/{more_pets[0].id}", follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertNotIn(f"{more_pets[0]}", html)

```

# general

[data_types_list](https://docs.sqlalchemy.org/en/13/core/type_basics.html)

The point of a model is creating a class that will represent a table in theSQL database, so we canmarian interact with it through class methods andinstance methods. Each class points to each table. When defining a model, wedefine the SQL table that SQAlchemy will create for us.

# install

1. cd to project's folder.
2. activate virtual environment.
3. (install flask)
4. `pip install psycopg2-binary`
5. `pip install flask-sqlalchemy`

# setup

0. (`createdb name_of_db`)
1. run PostgreSQL server
2. `psql`
3. connect to database (`\c my_db`)
4. models.py:

```python
 from flask_sqlalchemy import SQLAlchemy

#1. Configure the connection to the database
db = SQLAlchemy()

#2. A function to Associate the app with the database:
def connect_db(app):
    db.app = app
    db.init_app(app)
```

5. app.py:

   ```python
   from flask import Flask, request, render_template, redirect
   # 1. Import models.py:
   from models import db, connect_db, My_model_name

   app = Flask(__name__)
   # 2. Database config:
   app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///movies_example'
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
   app.config['SQLALCHEMY_ECHO'] = True
   # Other configs:
   app.config['SECRET_KEY'] = 'caca'

   # 3. Call db:
   connect_db(app)

   # check if it's connecting to the database:
   actors = db.session.execute('SELECT * FROM actors')
   print(list(actors))
   ```

6. Once models are written, to commit them in database, run in
   app.py or in seed.py:

```python
db.create_all()
```

Mind running only once, otherwise it will "seed" a new table every time.

# ORM

(Object-relational-mapping)
The idea of this is to creal a virtual object oriented database that allows us to interact with the database without writing SQL, and writing python or JS instead.
SQLAlchemy is an ORM (object-relational mapping). Python-based. It's a library that we have to install. We have a connection to a database, and instead of writing SQL directly in flask or node or java, we map that SQL information and queries into objects. On these objects we can then call methods on.
We can use SQLAlchemy with django or with python only. To use it with flask, there's a special package: `flask-sqlalchemy`, along with a tool called `psycopg2-binary`, that adapts flask-sqlalchemy to PostgreSQL

Connects the flask application with the SQL database.
