1. [Lists](#Lists)
   1. [list()](##list)
   2. [list_methods](##list_methods)
      - 'append',
      - 'clear',
      - 'copy',
      - 'count',
      - 'extend',
      - 'index',
      - 'insert',
      - 'pop',
      - 'remove',
      - 'reverse',
      - [slice](##slice)
      - 'sort'
      - [splice](##splice)
2. [Tuples](#Tuples)('single',)
   1. [tuple_methods](##tuple_methods)
      - 'count',
      - 'index',
3. [Dictionaries](#Dictionaries)
   1. [unpack](##unpack)
   2. [dict_methods](##dict_methods)
      - 'clear',
      - 'copy',
      - 'fromkeys',
      - 'get',
      - [items](##dict.items)
      - [keys](##dict.keys)
      - 'pop',
      - 'popitem',
      - 'setdefault',
      - 'update',
      - [values](##dict.values)
4. [Sets](#Sets)
   1. [set_methods](##set_methods)
      - 'add',
      - 'clear',
      - 'copy',
      - [difference](##set.difference)(`-`)
      - 'difference_update',
      - 'discard',
      - [intersection](##set.intersection)(`&`)
      - 'intersection_update',
      - 'isdisjoint',
      - 'issubset',
      - 'issuperset',
      - 'pop',
      - 'remove',
      - [symmetric_difference](##symmetric_difference)(`^`)
      - 'symmetric_difference_update',
      - [union](##set.union)(`|`)
      - 'update'
   1. [loop_set](##loop_set)
5. [Strings](#Strings)
   1. [str_methods](##str_methods)
      - 'capitalize',
      - 'casefold',
      - 'center',
      - 'count',
      - 'encode',
      - 'endswith',
      - 'expandtabs',
      - 'find',
      - 'format',
      - 'format_map',
      - 'index',
      - 'isalnum',
      - 'isalpha',
      - 'isascii',
      - 'isdecimal',
      - 'isdigit',
      - 'isidentifier',
      - 'islower',
      - 'isnumeric',
      - 'isprintable',
      - 'isspace',
      - 'istitle',
      - 'isupper',
      - 'join',
      - 'ljust',
      - 'lower',
      - 'lstrip',
      - 'maketrans',
      - 'partition',
      - 'replace',
      - 'rfind',
      - 'rindex',
      - 'rjust',
      - 'rpartition',
      - 'rsplit',
      - 'rstrip',
      - 'split',
      - 'splitlines',
      - 'startswith',
      - 'strip', (removes white spaces)
      - 'swapcase',
      - 'title',
      - 'translate',
      - 'upper',
      - 'zfill'
6. [comprehension](#Comprehension)
   1. [list_comprehension](##list_comprehension)
   2. [dictionary_comprehension](##dictionary_comprehension)
   3. [set_comprehension](##set_comprehension)

---

# Lists

Ordered collection of values. Mutable. Equivalent to JS arrays.
Lists are reference types

Constructor function: `list(some)`

```python
alpha = [1, 2, 3]
beta = alpha
beta[1] = 100 #alpha[1, 100, 3],
beta is alpha #True
[1, 2, 3] is [1, 2, 3] #False
[1, 2, 3] == [1, 2, 3] #True

```

## list

list()
Constructor function to create a list

```python
letters = list('apple')  # ['a', 'p', 'p', 'l', 'e']

nums = list(range(10, 20, 2)) # [10, 12, 14, 16, 18]
```

## slice

retrieves particular part of list, doesn't mutate original list.

```python
#syntax:
`list_name[start:stop:step]`
start: index to begin retrieval (default: start)
stop: index to end retrieval (default: end)
step: number to step (default: 1)
#examples:
alpha = [1, 2, 3, 4, 5, 'ca', 432, 2131, 'id']

# forwards:
alpha[2:4:1]
[3, 4]

alpha[1:6]
[2, 3, 4, 5, 'ca']

alpha[0:5:1]
[1, 2, 3, 4, 5]

alpha[0:5:2]
[1, 3, 5]

alpha[0:-1:3]
[1, 4, 432]

alpha[2:5]
[3, 4, 5]

alpha[5:]  # from index 5 to end of list
['ca', 432, 2131, 'id']

alpha[5::2]  # from idx5 to end at a pace of 2
['ca', 2131]

alpha[:3]  # idx0 to idx3
[1, 2, 3]

alpha[:7:3]  # idx0 to idx7 at a pace of 3
[1, 4, 432]

alpha[::5]  # 0 to end at a pace of 5
[1, 'ca']

# REVERSE
alpha[::-1]  # 0 to end starting from the end
['id', 2131, 432, 'ca', 5, 4, 3, 2, 1]

alpha[:-4: -1]  # reverse to idx-4 (from the end)
['id', 2131, 432]

alpha[8:2:-1]  # idx 8 to idx2 at a pace of 1
['id', 2131, 432, 'ca', 5, 4]
```

## splice

Adds or removes elements from list.

```python
#syntax:
`list_name[start:stop:step]`
# examples:
alpha = [1, 2, 3, 4, 5, 'ca', 432, 2131, 'id']

alpha[0:1] = ['antes', 'casiempieza']  # at idx0 until idx1 add =
['antes', 'casiempieza', 2, 3, 4, 5, 'ca', 432, 2131, 'id']

alpha[6:] = [1]  # from idx6 to end erase what's there and insert =
['antes', 'casiempieza', 2, 3, 4, 5, 1]

# remove items:
alpha[1:4] = []  # from idx1 to idx4 remove all what's there
[1, 5, 'ca', 432, 2131, 'id']

# from idx0 to end add "LOL" every 3 elements
alpha[::2] = ['LOL', 'LOL', 'LOL', 'LOL', 'LOL']
['LOL', 2, 'LOL', 4, 'LOL', 'ca', 'LOL', 2131, 'LOL']

```

## list_methods

`dir(list)` full list methods
`dir(str)` full str methods
`dir(dict)` full dict methods

```python
alpha = [1, 2, 3, 4, 5, 'ca', 432, 2131, 'id']

alpha.append('roberto')
 [1, 2, 3, 4, 5, 'ca', 432, 2131, 'id', 'roberto']

 beta = alpha.copy()

 alpha.count('ca') #1 "there's 1 "ca" object in the list".

 delta = ['ana', 'rosa']
alpha.extend(delta)
alpha [1, 2, 3, 4, 5, 'ca', 432, 2131, 'id', 'roberto', 'ana', 'rosa']

alpha.index('ca') #5 (only first occurence)

alpha.insert(i, p) #at index 'i', insert 'p'

alpha.pop() #removes last item of list and return removed item
alpha.pop(i) #remove item at index i and returns removed item
caramelo = alpha.pop(0)
caramelo # 1

alpha.reverse() #reverses list in-place
apha ['rosa', 'ana', 'roberto', 'id', 2131, 432, 'ca', 5, 4, 3, 2, 1]

alpha.sort() #ERROR (only works with homogeneus data)

nums.sort() # 1,2, 3, 4
words.sort() # a, b, c
```

---

# Tuples

Ordered sequence of values. Like a list, but inmutable. Once we create a tuple, we can't change it (no add, no remove, no update).
We can use them as keys in dictionaries.

```python
t1 = (1, 2, 3, True, (1, 2), ['ay', 'aua'])
t2 = ()
t3 = ('single item',)
# single items with comma, otherwise python won't recongnize it as tuple


# ACCESS:
t1[0]  # 1
len(t1)  # 3
t1[0] = 'new'  # ERROR

# AS KEY IN A DICT:
board = {
    (0, 0): 'X',
    (0, 1): None,
    (0, 2): 'O',
    (1, 0): 'X',
    (1, 1): 'O'
}
board[(0, 0)]  # 'X'
board[(0, 2)]  # 'O'
```

## tuple_methods

```python
t1.count(True) #2

t1.index(2) #1

```

---

# Dictionaries

Key-value pair data structures. They are a type of Object in python. They're ordered by insertion order (since python 3.6). Are mutable.

Constructor function: `dict({})`

```python
my_dict = {
    'ok': 'yes',
    42: 'all good',
    True: 23,
    100: 'awesome',
    'has_food': {
        'M': True,
        'T': True,
        'W': False,
    },
    'mates': ['stanley', 'mitch', 'stella']
    [1, 2] : 'NO' #ERROR HERE, mutable data structures not allowed as keys.
}

#IN
'name' in my_dict # False
42 in my_dict # True

#ACCESS VALUE:
my_dict['ok'] # 'yes'
my_dict[42] # 'all good'

#GET
my_dict.get('ok') #'yes'
my_dict.get('sarasa', 'sorolo') #'sorolo' (if 'sarasa' key not found, will return 'sorolo' as default value)

#UPDATE VALUE:
my_dict[42] = 'new value'

#CREATE NEW DICTIONARY:
dict() # {}
trilce = dict([[True, 0], [False, 11]]) #trilce {True: 0, False: 11}
```

## unpack

```python
# SEPARATE KEYS AND VALUES:
for (k, v) in chicken.items():
    print(k, '-->', v)
""" name --> Lady
    breed --> silkie
    has_food --> {'M': True, 'T': True, 'W': False}
    coop_mates --> ['mitch', 'stella', 'stanley'] """
```

## dict.keys

```python
chicken = {
    'name': 'Lady',
    'breed': 'silkie',
    'has_food': {
        'M': True,
        'T': True,
        'W': False,
    },
    'coop_mates': ['mitch', 'stella', 'stanley']
}

chicken.keys()
# dict_keys(['name', 'breed', 'has_food', 'coop-mates'])

for key in chicken.keys():
    print(key)
""" name
    breed
    has_food
    coop_mates """
```

## dict.values

```python
chicken.values()
#dict_values(['Lady', 'silkie', {'M': True, 'T': True, 'W': False}, ['mitch', 'stella', 'stanley']])

for value in chicken.values():
    print(value)
""" Lady
    silkie
    {'M': True, 'T': True, 'W': False}
    ['mitch', 'stella', 'stanley'] """
```

## dict.items

```python
chicken.items()
#dict_items([('name', 'Lady'), ('breed', 'silkie'), ('has_food', {'M': True, 'T': True, 'W': False}), ('coop_mates', ['mitch', 'stella', 'stanley'])])

for key_val in chicken.items():
    print(key_val)
""" ('name', 'Lady')
    ('breed', 'silkie')
    ('has_food', {'M': True, 'T': True, 'W': False})
    ('coop_mates', ['mitch', 'stella', 'stanley'])"""
```

## dict_methods

```python
# copy()
chick_copy = chicken.copy()

print(chick_copy is chicken)  # False
print(chick_copy == chicken)  # True

# pop()
'''removes key and value, returns value'''
print(chicken.pop('name'))
""" Lady / and the object now is mutated without 'name' prop:
{'breed': 'silkie', 'has_food': {'M': True, 'T': True, 'W': False}, 'coop_mates': ['mitch', 'stella', 'stanley']} """

# popitem()
'''picks key and value randomly return a pair:'''
print(chicken.popitem())  # ('coop_mates', ['mitch', 'stella', 'stanley'])

# fromkeys()
{}.fromkeys('12345', True)
''' {'1': True, '2': True, '3': True, '4': True, '5': True} '''

# clear()
""" removes all items from dict"""
chicken.clear()  # chicken{}
```

---

# Sets

Unordered collection of unique items. Are faster than lists.
constructor function: `set(some)`

```python
languages = {2, True, 'ruby', 'ruby', 'python', 'ruby', 'javascript'}
# {2, True, 'javascript', 'python', 'ruby'}

# LIST INTO SET:
repairs = ['wheels', 'driver', 'wheels']
non_dups = set(repairs)
non_dups  # {'driver', 'wheels'}

# SET from string:
calaca_sin_dups = set('la calaca feliz')
print(calaca_sin_dups)  # {'i', 'c', 'f', 'l', 'z', ' ', 'a', 'e'}

# IN
'scala' in languages #False
'ruby' in languages #True

# LEN
len(languages) #7

```

## set_methods

```python
# add()
languages.add('scala')

# pop()
"""remove and returns random item"""
languages.pop()

# remove()
languages.remove('python')

languages.add('c')
print(languages)

# copy()
lan_2 = languages.copy()
lan_2 == languages  # True
lan_2 is languages  # False

# clear()
languages.clear()  # languages {}
```

## set.union

Returns the union of sets as a new set.

```python
lemon = {'sour', 'yellow', 'fruit', 'bumpy'}
banana = {'fruit', 'smooth', 'sweet', 'yellow'}
berry = {'fruit', 'red'}
orange = ['fruit', 'bumpy']

# for only sets:
all_adjs = lemon | banana | berry
# all_adjs {'red', 'fruit', 'sour', 'sweet', 'smooth', 'yellow', 'bumpy'}

# for any iterable:
banana.union(orange)
#{'fruit', 'sour', 'sweet', 'smooth', 'yellow', 'bumpy'}
```

## set.intersection

Returns new set with intersections.

```python
# for only sets:
intersect = lemon & banana
# {'fruit', 'yellow'}

# for any iterable:
banana.intersection(orange)
```

## set.difference

Takes first set, compares to the second set, return new set containing the values that are in the first but not in the second.

```python
# for only sets:
diff = lemon - banana
# diff {'bumpy', 'sour'}
diff1 = banana - lemon
# diff1 {'smooth', 'sweet'}

# for any iterable:
lemon.difference(banana)
banana.difference(lemon)

```

## symmetric_difference

Returns all elements that are in exactly one of the sets and not in the other.

```python
# for only sets:
sym = banana ^ lemon
# sym {'smooth', 'sweet', 'sour', 'bumpy'}

# for any iterable:
lemon.symmetric_difference(orange)
```

## loop_set

```python
for adj in banana | lemon | set(orange):
    print(adj)
""""fruit
    sweet
    smooth
    sour
    yellow
    bumpy"""
```

--

# Strings

Are iterable. Are inmutable.

Constructor function: `str(some)`

Tricks:

```python
# STRINGIFY:
str(5.6) # '5.6'
nums = [2, 3]
str(nums) # '[2, 3]'

# IN:
'p' in 'apple' # True

# SLICE TO RETRIEVE PORTION OF STRING:
word = 'paralelogramo'
cut = word[:6]
cut # 'parale'

# REPEAT
'jor' * 3 # jorjorjor

#interpolated string:
price = 23.43
qtty = 3
print(f"Total is {round(price * qtty, 2)}")  # total is $70.29

# QUOTES SIGN:
str1 = 'hello'
str2 = "hello it's me"
str3 = '''
hello for multiple line strings
adds backslash
to long stuff'''

# SPACING:
print('hi \n hello') ''' hi
                            hello '''
print('hi \t hello') """ hi       hello """
print("it's showtime") # it's showtime

# INDEX
msg = 'caramelo'
msg[3] 'a'
msg[3:6] 'ame'
```

## str_methods

String methods

```python
msg = 'paraleologramo'
names = ['jorge', 'pepe', 'carlos']

msg.endswith('a')#False
msg.find('a')#1 ('-1' if not found)
'hello4'.isdigit() #False
'4'.isdigit()#True
'33213'.isdigit()#True

'.'.join(msg) #'p.a.r.a.l.e.l.o.g.r.a.m.o'
'|'.join(names)#'jorge|pepe|carlos'
''.join(names)#jorgepepecarlos

'LOL'.lower()#lol
'lol'.uppeer()#LOL
'las runflas'.capitalize()#Las runflas

'LOL'.isupper()#True

places = 'london-paris-rio'
places.replace('london', 'berlin', 1) #'berlin-paris-rio'

animals= "goats, chickens, ducks"
animals.split(',')# ['goats', 'chickens', 'ducks']

"""
Hello
I
Love
""".splitlines()#['', 'Hello', 'I', 'Love']

usr_input = ' some dd '
user_input.strip() #'some dd' (Removes white spaces at beginning and end, like trim in JS)
```

# Comprehension

Loop and conditional in one line.

```python
#Syntax 1:
[what_to_do for thing in things]
#Syntax 2:
[what_to_do for thing in things if condition]
# Syntax 3:
[do_this if condition else do_that for thing in things]

# Examples:
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

""" vowel occurence in word"""
vowels = {'a', 'e', 'i', 'o', 'u'}
word = 'apple'
vows_occurence = [ltr for ltr in word if ltr in vowels]
```

## list_comprehension

```python
""" filter hens over roosters in list:"""
chickens = [
    {"name": "Henry", 'sex': "rooster"},
    {"name": "Lucy", 'sex': "hen"},
    {"name": "Pat", 'sex': "hen"},
]

hens = [bird['name'] for bird in chickens if bird['sex'] == 'hen']
print(hens)  # ['Lucy', 'Pat']

"""filter scores: """
scores = [100, 89, 43, 21, 100, 98, 90]
pass_grades = ['pass' if score >= 70 else 'fail' for score in scores]
print(pass_grades)  # ['pass', 'pass', 'fail', 'fail', 'pass', 'pass', 'pass']

"""a function inside the comprehension phrase"""


def get_letter_in_morse(ltr):
    morse_lookup = {
        "a": ".-",
        "b": "-...",
        "c": "-.-.",
        "d": "-..",
        "e": ".",
        "f": "..-.",
    }
    return morse_lookup[ltr]


print(get_letter_in_morse('a'))  # .-

letters_to_morse = [get_letter_in_morse(char) for char in 'caca']
print(letters_to_morse)  # ['-.-.', '.-', '-.-.', '.-']
```

## dictionary_comprehension

```python
# Syntax 1:
{key_or_action : value_or_action for thing in things if condition}
# Syntax 2:
{key_or_action: value_or_action if condition else value_or_action1 for thing in things}

#Examples:
nums = [12, 13, 14, 15, 16]
double_evens_only = {n: n*2 for n in nums if n % 2 == 0} #{12: 24, 14: 28, 16: 32}

'''Sqare evens or assign 'not even' as value:'''
{num: num*num if num % 2 == 0 else 'not even' for num in range(1, 5)}
#{1: 'not even', 2: 4, 3: 'not even', 4: 16}

'''a dict with 0 assigned to each day of week:'''
{day: 0 for day in 'MTWRFSU'}
# {'M': 0, 'T': 0, 'W': 0, 'R': 0, 'F': 0, 'S': 0, 'U': 0}

''' a dict with a number as key and its square as value:'''
{num: num * num for num in range(1, 5)}
# {1: 1, 2: 4, 3: 9, 4: 16}

''' dict with even nums sqared only:'''
{num: num * num for num in range(1, 5) if num % 2 == 0}
# {2: 4, 4: 16}
```

## set_comprehension

```python
#Syntax 1:
{unique_value for thing in things if condition}
#Syntax2:
{unique_value if condition else unique_value1 for thing in things}

words = ['alma', 'bobo', 'aleluya']
a_words = {w for w in words if w.startswith('a')} #{'aleluya', 'alma'}

not_vows = {char for char in 'hello my friend' if char not in 'aeiou'}
# {' ', 'd', 'f', 'h', 'l', 'm', 'n', 'r', 'y'}

```
