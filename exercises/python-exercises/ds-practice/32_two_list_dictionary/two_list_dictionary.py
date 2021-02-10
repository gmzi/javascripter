from os import cpu_count


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
    result = dict.fromkeys(keys)
    # Loop over 'result' keys, and for each key assign a sliced
    # value from 'values':
    count = 0
    for k in result:
        result[k] = values[count:count+1]
        count += 1

    # currently values are lists, convert them in int's or in None if empty:
    for k, v in result.items():
        if len(v) > 0:
            result[k] = int(v[0])
        else:
            result[k] = None

    return result


"""REFACTOR"""


def solution(keys, values):
    out = {}

    for idx, val in enumerate(keys):
        out[val] = values[idx] if idx < len(values) else None

    return out


print(solution(['a', 'b', 'c'], [1, 2, 3, 4]))
