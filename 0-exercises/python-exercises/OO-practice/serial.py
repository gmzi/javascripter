"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.current_state = 0

    def generate(self):
        new_state = self.start + self.current_state
        self.current_state += 1
        return new_state

    def reset(self):
        self.current_state = 0

    def __repr__(self):
        return f"<start value is {self.start} and current generator is at {self.start + self.current_state}>"
