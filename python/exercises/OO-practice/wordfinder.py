import random


class WordFinder:
    """Word Finder: finds random words from a dictionary.
    >>> example = WordFinder("words.txt")
    235886 words read

    >>> example.random() in "words.txt"
    True
    """

    def __init__(self, path):
        self.path = path
        self.words = fileRead(self.path)
        self.len = len(self.words)
        print(f"{self.len} words read")

    def random(self):
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Frome file with words, extracts words without comment nor blank lines"""

    def __init__(self, path):
        super().__init__(path)
        self.words_only = ''
        for word in self.words:
            if not word.startswith('#') and not word.isspace():
                self.words_only += word


def fileRead(path):
    input_file = open(path, 'r')
    input_file.words = []
    for line in input_file:
        input_file.words.append(line)
    input_file.close()
    return input_file.words
