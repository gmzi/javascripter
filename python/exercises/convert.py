def convert_temp(unit_in, unit_out, temp):
    if unit_in == 'f' and unit_out == 'c':
        f_to_c = (int(temp - 32)) / 1.8
        return round(f_to_c)
    elif unit_in == 'c' and unit_out == 'f':
        c_to_f = int(temp) * 1.8 + 32
        return round(c_to_f)
    else:
        if unit_in != 'c' and unit_in != 'f':
            return f"invalid unit {unit_in}"
        if unit_out != 'c' and unit_out != 'f':
            return f"invalid unit {unit_out}"
        if unit_in == unit_out:
            return temp


print("c", "f", 0, convert_temp("c", "f", 0), "should be 32.0")
print("f", "c", 212, convert_temp("f", "c", 212), "should be 100.0")
print("z", "f", 32, convert_temp("z", "f", 32), "should be Invalid unit z")
print("c", "z", 32, convert_temp("c", "z", 32), "should be Invalid unit z")
print("f", "f", 75.5, convert_temp("f", "f", 75.5), "should be 75.5")
