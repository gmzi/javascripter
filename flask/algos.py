
def adder(a, b):
    """
    returns a added to b
    >>> adder(1, 3)
    4
    >>> adder(3, 5)
    8
    """
    return a + b


def reverse_str(s):
    return s[::-1]


def is_palindrome(s):
    rev = reverse_str(s)
    return s == rev
