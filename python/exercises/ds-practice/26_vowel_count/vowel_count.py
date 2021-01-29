def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}

        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    result = {}
    vowels = set('aeiou')
    phrase_low = phrase.lower()
    for char in phrase_low:
        if char in vowels:
            result[char] = phrase_low.count(char)

    return result


print(vowel_count('HOW ARE YOU? i am great!'))
# {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
