# Python

```python

int
float
list
tuple
dict
set
str
```

1. numbers / booleans / if / comparisons/ ternary

   - [numbers](##numbers)
   - [boolean](##boolean)
   - [comparisons](##comparisons)
   - [conditionals](##conditionals)
   - [ternary_operator](###ternary)
   - [boolean_operations](###operations)

1. loops

   - [while_loops](##while)
   - [break_keyword]
   - [input_keyword]

   - [for_loops](##for)
   - [range]
   - [range(more)](##rangemore)

1. functions

   - [functions](##functions)
   - [arguments](##arguments)

1. help

   - [help](##help)
   - [dir](##dir)

1. falsy / scope / docstrings / ipython / variables

   - [falsy_values](##falsy)
   - [scope](##scope)
   - [docstrings](##docstrings)
   - [ipython](##ipython)
   - [variables](##variables)

## numbers

```python
# int
num = 5
# float
num = 5.2
# complex
num = complex(3,32)

# operations:
1+2 #3
3 * 6 #18
3 / 5 #0.6 throws a float number
3 // 5 #0 throws integer
10 % 3 # 1

2 / 0 #error
```

Number methods:

```python
int(4.23323) # 4
float(3) #3.0
round(3.14159) # 3
round(3.14159, 2) # rounds with two decimal places
divmod(x, y) # the pair (x // y, x % y)
pow(x, y) # x to the power y
x ** y # x to the power y
complex(re, im) # complex num with real part `re` and imaginary part `im`.

4.56.is_integer() # False
4.000.is_integer() #True

32123.21.hex() #hexadecimal representation: 0x1.f5ecd70a3d70ap+14
```

## boolean

```python
# mind capital letters
True
False
```

## comparisons

Comparison operators

```python
<
<=
>
>=

#EQUALITY
== #equal
""" Structures with same items are equal"""
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list1 == list2 #True

'1' == 1 #False

nums = [1, 2, 3]
copy = nums
copy == nums #True
copy is nums #True


!= #not equal

#Object identity
list1 is list2 #False
list1 is not list2 #True

```

## conditionals

1.

```python
if grade == "a":
    print("awesome job")
elif grade == "f":
    print("ot ot")
else:
    print("oh fuck")
print('done')
```

2.

```python
if age > 18:
    if unregistered:
        print('please register')
    else:
        print('keep voting')
else:
    print('Wait a bit')
print('done')
```

### ternary

Ternary operator

```python
do_if_true if CONDITION else do_if_false

msg = 'go vote' if (age >= 18) else 'go play!'

color = 'teal'
print('good choice') if color == 'teal' else print('puaj') # good choice

```

### operations

Boolean operations

In this order of precedence:

```python
x or y "if x is false, then y, else x'
x and y "if x is false, then x, else y"
not x "if x is false, then True, else False"

#example:
age = 68

if age < 10 or age >= 65:
    print('your ticket is $5')
else:
    print('your ticket is $10')
# your ticket is $5
```

## while

while loops

## break keyword

## input keyword

```python
target = 37
guess = None

while guess != target:
    guess = input('Enter guess:')
    if guess == 'q' or guess == 'quit':
        print('quitting game')
        break
    guess = int(guess)
    if guess == target:
        print('you won')


#----------------------
num = 0
while num <= 100:
    if num == 50:
        break
    print(num)
    num += 40
    # 0 40 80
```

## for

## for loops

## range

```python
for char in "supercalifragilistico":
    print(char)

for num in range(3):
    print(num)  # 0 1 2

for snack in ["peanut", 'twizzler', 'Mars Bar']:
    print('I ate a', snack)
# I ate a peanut I ate a twizzler I ate a Mars Bar

colors = ['orange', 'green', 'red']
for color in colors:
    print(f"{color} is caca")
# orange is caca green is caca red is caca
```

## range(more)

```python
# range(start, stop, step)

range(0, 9)  # doesn't display numbers, stores just the start and end

for num in range(3):
    print(num)  # 0 1 2

stars = list(range(5))
print(stars)  # [0, 1, 2, 3, 4]

planets = list(range(3, 7))
print(planets)  # [3, 4, 5, 6]

rengo = list(range(1, 10, 2))
print(rengo)  # [1, 3, 5, 7, 9]

backwds = list(range(5, 0, -1))
print(backwds)  # [5, 4, 3, 2, 1]

```

## functions

```python
def add_numbers(a, b):
    sum = a + b
    print('processing...')
    return sum


result = add_numbers(3, 2)
print(result)  # processing... 5


def greet(name):
    return f"Hi {name}"


print(greet('carlos'))  # hi carlos

# if not explicitly returning a value, functions return "None"


def divide(a, b):
    return a / b


print(divide(3, 2))  # 1.5


def multInts(a, b):
    if type(a) is int and type(b) is int:
        return a * b
    return 'a and b must be integers'


print(multInts(3, 2))  # 6
print(multInts(3.1, 2.4))  # a and b must be integers
```

## arguments

Arguments and parameters must match quantity,

1. keyword arguments:

```python
# given this function with this order of parameters:

def send_email(to_email, from_email, subject, body):
    email = f"""
    to: {to_email}
    from: {from_email}
    subject: {subject}
    ------------------
    body: {body}
    """
    print(email)

    # to pass arguments in whatever order when calling the function:
send_email(subject="Meow", from_email="cat@cat.com",
           to_email="dog@dog.com", body="meow meow meow")
"""    to: dog@dog.com
       from: cat@cat.com
       subject: Meow
       ------------------
       body: meow meow meow """
```

2. default arguments:

```python
def power_to_2(a, b=2):
    return a ** b
# only end arguments can have default value

print(power_to_2(3))  # 9
```

## help

## dir

```python
help(name_of_function) #displays docs about it
help() #help about python
# inside help:
keywords #all available keywords, pretty cool

dir([1,2,3]) #throws allist methods
```

### falsy

falsy values

Falsy values:

```python
str = ""
0
0.0
None #(equivalent to null in JS)
False
[] #empty list
{} #empty dictionary
set() #empty set

"""Check for truthiness of falsiness like this:"""
not not 0 #False
not not [1, 2, 3] #True
```

## scope

Variables are scoped to functions

```python
x = 42

def my_function():
    x = 12
    print(x) #12

print(x) #42
```

## docstrings

String to document a function or element.
This is the conventional style guide:

```python

def add_limited_numbers(a, b):
    """Add two numbers, making sure sum caps at 100."""
    """ this is the model for xxxxxxxx x x x x x x x x
    more than one line comments
    """
    sum = a + b
    # if this required explanation, comment like this
    if sum > 100:
        sum = 100
    return sum


# to see the information, call:
help(add_limited_numbers)
```

## pip3

Is the package installer for python.

## ipython

Replaces and enhances the python repl. To initialize it: `ipython`.

## variables

There are just one type of variables.
Declare:

```python
# changing:
num_chickens = 12 # chickens = 12
# reassign value:
num_chickens = 20
# non-changing:
CHICKEN_BREED = 1
```
