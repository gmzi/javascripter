from random import randint, choice


def get_rand_year():
    return randint(1900, 2020)


def get_rand_month():
    months = ['jan', 'aug', 'feb', 'dec']
    return choice(months)


open("morse.txt")
