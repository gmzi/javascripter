def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    str_one = str(num1)
    set_one = set(str_one)

    str_two = str(num2)
    set_two = set(str_two)

    return set_one == set_two


print(same_frequency(551122, 221515))  # True

"""REFACTOR"""


def freq_counter(coll):
    """Returns frequency counter mapping of coll."""

    counts = {}

    for x in coll:
        counts[x] = counts.get(x, 0) + 1

    return counts


def same_frequency_solution(num1, num2):
    return freq_counter(str(num1) == freq_counter(str(num2)))
