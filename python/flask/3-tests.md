# Testing

Types of tests:

1. [unit_tests](##unit_test)
   - One single function, or one single part of the app at a time.
2. [Integration_test](##Integration_test)
   - multiple functions together, how they're comunicating. If they work together well.
3. [End-to-end-test](##End-to-end-test)

   - the entire application in real word scenario.

## unit_test

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
