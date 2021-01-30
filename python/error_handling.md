# Error handling in python

EAFP approach (Easier to Ask for Forgiveness than for Permission)

## Catching errors

Syntax:

```python
try:
    age = int(data_we_received)
    print("You are", age)
except:
    print("that's not an age!")
```

Examples:

```python
def get_days_alive(person):
    person['age'] * 365
    print(f"you've been alive for {days} days")

get_days_alive({'age': 50}) # you've been alive for 18250 days
# if no dictionary as argument, program will crash:
get_days_alive(nodict) # crash

# So we try and except:
def get_days_alive(person):
    try:
        person['age'] * 365
        print(f"you've been alive for {days} days")
    except KeyError as exc:
        print(f"Missing key: {exc}")
    except TypeError:
        print("Expected person to be a dict")
```

## Exception types

- AttributeError (couldn't find attr)
- KeyError (couldn't find key)
- IndexError (couldn't find index)
- NameError (couldn't find variable)
- OSError (can't read/write file)
- ValueError (incorrect value)

## Raising errors

First catch the error, and then call a specific function to handle the error:

```python
if color not in {'red', 'green', 'blue'}:
    raise ValueError("not a valid color")

# Example
# 1- raise exception in place:
def bounded_avg(nums):
    "Return avg of nums (makes sure nums are 1-100)"
    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")
    return sum(nums) / len(nums)

# 2- Call function inside the error handler
def handle_data():
    "Process data from database"
    ages = get_ages(from_my_db)
    try:
        avg = bounded_avg(ages) # function called here
        print("Average was", avg)
    except ValueError as exc:
        # exc is exception object -- you can examine it!
        print("Invalid age in list of ages")
```
