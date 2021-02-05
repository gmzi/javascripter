from unittest import TestCase
import algos


# Always TestCase inheritance:
class AdderTestCase(TestCase):
    """example of unittest use"""
    # always 'test_' before function tested

    def test_adder(self):
        self.assertEqual(algos.adder(2, 3), 5)
        self.assertEqual(algos.adder(2, 2), 4)
        self.assertEqual(algos.adder(-2, -4), -6)


class AlgosTestCase(TestCase):
    def test_reverse(self):
        self.assertEqual(algos.reverse_str('hello'), 'olleh')
        self.assertEqual(algos.reverse_str('Apple'), 'elppA')

    def test_is_palindrome(self):
        self.assertTrue(algos.is_palindrome('racecar'))
        self.assertFalse(algos.is_palindrome('taco'))
