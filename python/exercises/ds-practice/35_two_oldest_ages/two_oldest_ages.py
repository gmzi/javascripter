def two_oldest_ages(ages):
    """Return two distinct oldest ages as tuple (second-oldest, oldest)..

        >>> two_oldest_ages([1, 2, 10, 8])
        (8, 10)

        >>> two_oldest_ages([6, 1, 9, 10, 4])
        (9, 10)

    Even if more than one person has the same oldest age, this should return
    two *distinct* oldest ages:

        >>> two_oldest_ages([1, 5, 5, 2])
        (2, 5)
    """
    ordered_ages = sorted(ages)
    max_value = max(ordered_ages)
    for i in reversed(ordered_ages):
        if i != max_value:
            return tuple((i, max_value))


print(two_oldest_ages([1, 2, 10, 10, 8]))  # (8, 10)

""" REFACTOR """


def two_oldest_ages_solution(ages):
    uniq_ages = set(ages)
    print(uniq_ages)
    oldest = sorted(uniq_ages)[-2:]
    print(oldest)
    return tuple(oldest)


print(two_oldest_ages_solution([1, 2, 10, 10, 8]))  # (8, 10)
