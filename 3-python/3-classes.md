# class

```python
class Triangle:
    """
    A class used to represent right triangle

    Attributes
    -------------------
    a: int
    length of side a
    b: int
    length of side b
    """

    # Constructor (always with "self"), will be called automatically:
    def __init__(self, a, b):
        "Create triangle from a and b sides."
        self.a = a
        self.b = b

    # CLASS METHODS (decorator and 'cls' by convention. They pass the class itself
    # as argument of the function):
    @classmethod
    def random(cls):
        """ Class method which returns Triangle with random sides"""
        return cls(randint(1, 300), randint(1, 60))

    # INSTANCE METHODS:
    def get_hypotenuse(self):
        "Get hypotenuse (length of 3rd side)."
        return math.sqrt(self.a ** 2 + self.b ** 2)

    def get_area(self):
        "Get area of triangle."
        return (self.a * self.b) / 2

    def describe(self):
        """calculates its area and returns it with message"""
        return f"My area is {self.get_area()}"

    # SPECIAL METHODS:
    def __repr__(self):
        """Helps seeing attrs of instance"""
        return f"<Triangle a={self.a} b={self.b}>"

    def __str__(self):
        return self.describe()

    def __eq__(self, other):
        return self.a == other.a and self.b == other.b




# CREATE NEW INSTANCE:
roberto = Triangle(21, 23)
roberto  # <__main__.Triangle object at 0x4322d3234

# CALL CLASS METHOD
sandro = Triangle.random()
sandro.a  # 234
sandro.b  # 54
sandro.get_hypotenuse()  # 240.149

# CALL METHOD IN INSTANCE
roberto.get_hypotenuse()  # 31.144

# CALL SPECIAL METHODS:
roberto #<Triangle a=21 b=23>
str(roberto) # My area is 241.5
roberto == sandro # False

# Call special method of any built in pyton class:
repr('hello') # '"hello"'
```

# subclass

if in separate file, import the file with the super class first.

```python
class ColoredTriangle(Triangle):
    """Triangle that has a color."""

    # Constructor:
    def __init__(self, a, b, color):
        super().__init__(a, b)
        self.color = color

    # Subclass method:
    def shout(self):
        return f"what a fuck i'm {self.color}"

    # Subclass method with inherited functionality:
    def describe(self):
        msg = super().describe()
        return msg + f" I am {self.color}"


# NEW INSTANCE OF SUBCLASS:
rosa = ColoredTriangle(3, 4, 'pink')
rosa.a  # 3
rosa.b  # 4
rosa.color  # 'pink'

# call class methods:
rosa.get_area()  # 6
rosa.get_hypotenuse()  # 5

# call subclass method:
rosa.shout()  # what a fuck I'm pink

# call subclass method with inherited functionality:
rosa.describe()  # I'm a triangle with sides 3 & 4 I am pink
```

## special methods

Built in special methods are suposed to represent the instance object in a specific way:

- `__str__` (human readable description, for consumers, clients)
- `__repr__` (specific, non ambiguous representation, technical, for devs)

others special methods include:

```python
object.__lt__(self, other) #"less than"
object.__le__(self, other) #"less or equal to"
object.__eq__(self, other) #"equal"
object.__ne__(self, other) #"not equal"
object.__gt__(self, other) #"greather than"
object.__ge__(self, other) #"greather than or equal to"


```

Can make our own Magic methods, that returns something we desire.
and OOP (object oriented programming)
[full_list](https://docs.python.org/3/reference/datamodel.html)

---

# atributes and methods

```python
#get attr:
o.name
#set attr:
o.name = 'some'
# call method:
o.method()
# retrieve value from dict:
o.['my-key']

help(obj) # help about object and methods
dir(obj) # list methods/attrs of object
```

```python
from collections import Counter
from datetime import date
# help(Counter)

my_counter = Counter('oompa loompa')
print(my_counter)  # Counter({'o': 4, 'm': 2, 'p': 2, 'a': 2, ' ': 1, 'l': 1})
type(my_counter)  # collections.Counter
isinstance(my_counter, Counter)  # True

# Methods:
my_counter.most_common()
# [('o', 4), ('m', 2), ('p', 2), ('a', 2), (' ', 1), ('l', 1)]

astro_date = date(2020, 2, 24)
astro_date  # 14
astro_date.year  # 2020
astro_date.weekday()  # 0
```
