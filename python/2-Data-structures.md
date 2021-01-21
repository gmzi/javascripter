Data structures:

1. [Lists](#lists)

   1. [list()](##list)
   2. [slice](##slice)
   3. [splice](##splice)
   4. [list_methods](##list_methods)
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
      - 'sort'

2. [Tuples](#tuples)
3. [Dictionaries](#dictionaries)
4. [Sets](#sets)
5. [strings](#strings)

# lists

Ordered collection of values. Mutable. Equivalent to JS arrays.
Lists are reference types

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

# strings

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




str1 = 'hello'
str2 = "hello"
str3 = '''
hello for multiple line strings
adds backslash
to long stuff'''

#interpolated string:
price = 23.43
qtty = 3
print(f"Total is {round(price * qtty, 2)}")  # total is $70.29

# spacing
print('hi \n hello') ''' hi
                            hello '''
print('hi \t hello') """ hi       hello """
print("it's showtime") # it's showtime

```

String methods:

```python
course = "programming"
print(course.upper())
print(course.lower())
print(course.title())
print(course.rstrip())
print(course.find("pro"))
print(course.replace("p", "j"))  # replace a character with another
print("pro" in course)  # True
print("swift" not in course)  # False
```
