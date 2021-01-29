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
