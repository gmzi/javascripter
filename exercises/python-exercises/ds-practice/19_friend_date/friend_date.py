def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?

    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2

    Returns True if they have any hobbies in common, False is not.

        >>> elmo = ('Elmo', 5, ['hugging', 'being nice'])
        >>> sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
        >>> gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])

        >>> friend_date(elmo, sauron)
        False

        >>> friend_date(sauron, gandalf)
        True
    """

    '''SOLUTION 1: COMPARE THE FULL LIST:'''
    # Access nested list and bring its elements to the surface:
    nested_b = []
    for item in b:
        if type(item) == list:
            nested_list = item
            for n in nested_list:
                nested_b.append(n)

    # Compare surface of both tuples directly, and nested items through 'nested_b' variable:
    for item in a:
        if b.count(item) > 0:
            return True
        elif type(item) == list:
            nested_list = item
            for n in nested_list:
                if nested_b.count(n) > 0:
                    return True
    return False


''' SOLUTION 2: compare hobbies list only: '''


def friend_hobbies(a, b):
    if set(a[2]) & set(b[2]):
        return True
    else:
        return False


elmo = ('Elmo', 5, ['hugging', 'being nice'])
sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])
other = ('Other', 5, ['day', 'sent'])
print(friend_date(elmo, other))  # True
print(friend_hobbies(elmo, other))  # False
