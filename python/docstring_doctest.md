# Docstrings and Doctests

## built-in test inside docstring

inside your file, and inside the docstring, include the tests:

1. write the test:

```python
def bounded_avg(nums):
    """THIS IS THE DOCSTRING that describes the function
        and here the tests:
        >>> bounded_avg([1, 2, 3])
        2.0

        >>> bounded_avg([10, 20, 30, 40, 50])
        30.0

        >>> bounded_avg([1, 2, 101])
        Traceback (most recent call last):
            ...
        ValueError: Outside bounds of 1-100
    """
    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")

    return sum(nums) / len(nums)


print(bounded_avg([1, 2, 10]))
```

2. run the thest, in terminal:
   - `python3 -m doctest -v file_name.py`

## docstring

Docstring is the comment that describes the function

```python
def bounded_avg(nums):
"""THIS IS THE DOCSTRING that describes the function"""
    "Return avg of nums (makes sure nums are 1-100)"
    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")

    return sum(nums) / len(nums)
```

Run filename.py, then type `help(name_of_your_function)` and will show the docstring.
