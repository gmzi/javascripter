days = [1, 2, 3, 1, 3, 543, 23, 56, 22]

""" double each number of list:"""
doubles = [num * 2 for num in days]
print(doubles)  # [2, 4, 6, 2, 6, 1086, 46, 112, 44]

"""" get even numbser only: """
evens_comp = [num for num in days if num % 2 == 0]
print(evens_comp)  # [2, 56, 22]

"""want to get even numbers only, so traditionally would do like this:"""
evens = []

for num in days:
    if num % 2 == 0:
        evens.append(num)

print(evens)  # [2, 56, 22]

lala = [2, 4, 6, 8]
sqared = [num ** 2 for num in lala]
print(sqared)

# STRING TO LIST WITH COMPREHENSION:
[char.upper() for char in 'lmfao']  # ['L', 'M', 'F', 'A', 'O']

# ITERATE OVER   RANGE:
[num for num in range(10, 20)]
#[10, 11, 12, 13, 14, 15, 16, 17, 18, 19]


# GENERATE A BOARD USING NESTED COMPREHENSION:

def gen_board(size, initial_value=None):
    return [[initial_value for x in range(size)] for y in range(size)]


print(gen_board(3, 'X'))
# [['X', 'X', 'X'], ['X', 'X', 'X'], ['X', 'X', 'X']]

rox = [1, 2, 1, 1, 2, 1, 1, 1, 2]

mood = [print('nice') if num == 1 else print('bad') for num in rox]
# print(mood)


# ------------------
