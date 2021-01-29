
# LISTS
def three_odd_numbers(nums):
    """Is the sum of any 3 sequential numbers odd?"

        >>> three_odd_numbers([1, 2, 3, 4, 5])
        True

        >>> three_odd_numbers([0, -2, 4, 1, 9, 12, 4, 1, 0])
        True

        >>> three_odd_numbers([5, 2, 1])
        False

        >>> three_odd_numbers([1, 2, 3, 3, 2])
        False
    """
    for i in range(0, len(nums)-2):
        triplet = nums[i:i+3]
        if sum(triplet) % 2 != 0:
            return True
    return False


print(three_odd_numbers([1, 2, 3, 4, 5]))  # True


def find_greater_numbers(nums):
    """Return # of times a number is followed by a greater number.

    For example, for [1, 2, 3], the answer is 3:
    - the 1 is followed by the 2 *and* the 3
    - the 2 is followed by the 3

    Examples:

        >>> find_greater_numbers([1, 2, 3])
        3

        >>> find_greater_numbers([6, 1, 2, 7])
        4

        >>> find_greater_numbers([5, 4, 3, 2, 1])
        0

        >>> find_greater_numbers([])
        0
    """
    result = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i]:
                result += 1
    return result


print(find_greater_numbers([1, 2, 3]))  # 3


def mode(nums):
    """Return most-common number in list."""

    # Make frequency counter of num:freq
    counts = {}

    for num in nums:
        counts[num] = counts.get(num, 0) + 1

    # find the highest value (the most frequent number)

    max_value = max(counts.values())

    # now we need to see at which index the highest value is at

    for (num, freq) in counts.items():
        if freq == max_value:
            return num


print(mode([2, 2, 3, 3, 2]))  # 2


def multiply_even_numbers(nums):
    """Multiply the even numbers."""

    evens = [num for num in nums if num % 2 == 0]

    result = 1
    for num in evens:
        result = result * num
    return result


print(multiply_even_numbers([2, 3, 4, 5, 6]))  # 48


def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]
    """
    result = []
    count = 1
    while count <= num:
        if num % count == 0:
            result.append(count)
            count += 1
        else:
            count += 1
    return result


print(find_factors(10))  # [1, 2, 5, 10]


# -----------------------------------------------------------
# TUPLES

def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal."""

    already_visited = set()

    for i in nums:
        difference = goal - i

        if difference in already_visited:
            return (difference, i)

        already_visited.add(i)

    return ()


print(sum_pairs([5, 1, 4, 8, 3, 2], 7))  # (4, 3)


# -------------------------------------------------------
# DICTIONARIES

def freq_counter(coll):
    """Returns frequency counter mapping of coll."""

    counts = {}

    for x in coll:
        counts[x] = counts.get(x, 0) + 1

    return counts


def same_frequency_solution(num1, num2):
    return freq_counter(str(num1) == freq_counter(str(num2)))


# from os import cpu_count

def two_list_dictionary(keys, values):
    """Given keys and values, make dictionary of those.

        >>> two_list_dictionary(['x', 'y', 'z'], [9, 8, 7])
        {'x': 9, 'y': 8, 'z': 7}

    If there are fewer values than keys, remaining keys should have value
    of None:

        >>> two_list_dictionary(['a', f'b', 'c', 'd'], [1, 2, 3])
        {'a': 1, 'b': 2, 'c': 3, 'd': None}

    If there are fewer keys, ignore remaining values:

        >>> two_list_dictionary(['a', 'b', 'c'], [1, 2, 3, 4])
        {'a': 1, 'b': 2, 'c': 3}
   """
    out = {}
    for idx, val in enumerate(keys):
        out[val] = values[idx] if idx < len(values) else None
    return out


# -------------------------------
# LOOP MASTERPIECE
def reverse_vowels_solution(s):
    vowels = set('aeiou')

    string = list(s)
    i = 0
    j = len(s) - 1

    while i < j:
        if string[i].lower() not in vowels:
            i += 1
        elif string[j].lower() not in vowels:
            j -= 1
        else:
            string[i], string[j] = string[j], string[i]
            i += 1
            j -= 1
    return "".join(string)


print(reverse_vowels_solution('Tomatoes'))  # Temotaos
