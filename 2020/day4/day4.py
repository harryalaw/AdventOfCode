# CHEATED ON THIS ONE :(

import re

tests = {
    "byr": lambda val: 1920 <= int(val) <= 2002,
    "iyr": lambda val: 2010 <= int(val) <= 2020,
    "eyr": lambda val: 2020 <= int(val) <= 2030,
    "hgt": lambda val: val[-2:] == "cm" and 150 <= int(val[:-2]) <= 193 or val[-2:] == 'in' and 59 <= int(val[:-2]) <= 76,
    "hcl": lambda val: re.fullmatch(r"#[\da-f]{6}", val),
    "ecl": lambda val: val in ("amb", "blu", 'brn', 'gry', 'grn', 'hzl', 'oth'),
    "pid": lambda val: re.fullmatch(r"\d{9}", val)
}

# with open("day4test.txt") as f:
with open("day4input.txt") as f:
    data = f.read()
    data = data.split("\n\n")
    present = 0
    valid = 0
    for line in data:
        passport = dict(l.split(":") for l in line.split())

        if not passport.keys() >= tests.keys():
            continue
        present += 1
        valid += all(data(passport[field]) for field, data in tests.items())

print(present)
print(valid)
