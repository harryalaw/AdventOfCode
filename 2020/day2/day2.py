with open("day2input.txt") as data:
    lines = data.read()
    info = [line.split(" ") for line in lines.split("\n")]
    info = [[line[0].split("-"), line[1][0], line[2]] for line in info]


test_data = [[[1, 3], 'a', 'abcde'], [
    [1, 3], 'b', 'cdefg'], [[2, 9], 'c', 'ccccccccc']]


def checkPassword(line):
    Min, Max = [int(x) for x in line[0]]
    val = line[1]
    occur = line[2].count(val)
    return Min <= occur <= Max


def validPasswords(data):
    validCount = 0
    validCount2 = 0
    for line in data:
        if checkPassword(line):
            validCount += 1
        if checkPasswordNew(line):
            validCount2 += 1
    return validCount, validCount2


def checkPasswordNew(line):
    first, last = [int(x)-1 for x in line[0]]
    val = line[1]
    string = line[2]
    return (string[first] == val) ^ (string[last] == val)


print(validPasswords(test_data))
print(validPasswords(info))
