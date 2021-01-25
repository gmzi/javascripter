words = ['casa', 'romero', 'soltar', 'ernesto', 'palacio', 'djavan']


def print_upper_words(list):
    """ Loops over list of words and prints them in uppercase """
    for word in list:
        # this is the print line:
        print(word.upper())


print_upper_words(words)


def print_upper_words_e(list):
    """ uppercase and print words starting with 'e' or 'E' """
    for word in list:
        if word[0] == 'e' or word[0] == 'E':
            print(word.upper())


print_upper_words_e(words)


def print_upper_words_if(corpus, condition1, condition2):
    for word in corpus:
        if word[0] == condition1 or word[0] == condition2:
            print(word.upper())


print_upper_words_if(words, 'c', 'd')
