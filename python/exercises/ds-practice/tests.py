def weekday_name(day_of_week):
    """Return name of weekday.

        >>> weekday_name(1)
        'Sunday'

        >>> weekday_name(7)
        'Saturday'

    For days not between 1 and 7, return None

        >>> weekday_name(9)
        >>> weekday_name(0)
    """
    week = {1: 'Monday', 2: "Tuesday", 3: 'Wednesday',
            4: 'Thursday', 5: 'Friday', 6: 'Saturday', 7: 'Sunday'}
    return week[day_of_week] if day_of_week >= 0 and day_of_week <= 7 else 'None'


print(weekday_name(9))
