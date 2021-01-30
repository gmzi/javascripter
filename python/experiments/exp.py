import math
from random import randint


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

    def __repr__(self):
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


# REPRESENTATION METHOD
# instance method that will return a string and represent each specific instance
# where its called.


print(rosa)

print(repr(roberto))
print(str(roberto))
