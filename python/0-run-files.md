# read files

Open a .csv or other file through python, read the lines and do things with that dataset.
To open an on-disk file:

- `open(file_path, mode)`
  - file_path: absolute or relative path to file
  - mode:
    - `r` for reading
    - `w` for writing

```python
#Syntax:
morse = open("file_path", "r")

full_text = morse.read() # will contain all the text at a time

# To read one line at a time:
for line in morse:
  print('line=', line)

# Scroll back to the start of the file:
morse.seek(0)

# always close files after reading them
morse.close()
```

# write files

Create new file and write on it:

```python
file = open('wrte_me.md', 'w')

file.write('I am the first line!!!')
file.write('\nSecond line arriving ')

file.close()
```

# read and write example

```python
ef toNums(str):
    if str == 'c':
        return '1'
    return '2'


input_file = open('morse.txt', 'r')
output_file = open('translated.txt', 'w')
for line in input_file:
    output_file.write(toNums(line))

input_file.close()
output_file.close()
```

# run python from a file.

Execute it manually.

In terminal, cd to project's folder and:

- `python3 filename.py`
  or
- 1. run ipython
  2. `%run filename.py`
