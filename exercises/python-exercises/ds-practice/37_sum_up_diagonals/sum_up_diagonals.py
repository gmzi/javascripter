def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30
    """
    result = 0
    count_up = 0
    count_down = len(matrix) - 1
    while count_up < len(matrix) and count_down >= 0:
        result += matrix[count_up][count_up]
        result += matrix[count_down][count_up]
        count_up += 1
        count_down -= 1

    return result


m1 = [
    [1,   2],
    [30, 40],
]
m2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
print(sum_up_diagonals(m2))

""" REFACTOR"""


def sum_up_diagonals_solution(matrix):
    total = 0

    for i in range(len(matrix)):
        total += matrix[i][i]
        total += matrix[i][-1 - i]
    return total
