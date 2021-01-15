import re


def parsetext(text):
    with open(text) as f:
        data = f.read().replace("(", "( ").replace(")", " )").split("\n")
        data = [line.split(" ") for line in data]
    return data


def evaluate(array):
    total = 0
    lastOp = '+'
    i = 0
    while i < len(array):
        el = array[i]
        if el in ['+', '*']:
            lastOp = el
        elif el == '(':
            extra, last = evaluate(array[i+1:])
            total = total + extra if lastOp == '+' else total * extra
            i += last+1
        elif el == ')':
            return total, i
        else:
            el = int(el)
            total = total+el if lastOp == '+' else total*el
        i += 1
    return total, len(array)-1


class Int():
    def __init__(self, value):
        self.value = int(value)

    def __add__(self, customInt):
        self.value *= customInt.value
        return self

    def __mul__(self, customInt):
        self.value += customInt.value
        return self

    def __int__(self):
        return self.value


def adjust(line):
    newLine = []
    for char in line:
        if char == '+':
            newLine.append('*')
        elif char == '*':
            newLine.append('+')
        elif char not in ['(', ')']:
            newLine.append("Int("+char+")")
        else:
            newLine.append(char)
    return ''.join(newLine)


def regexAdjust(line):
    def swapOp(op):
        if op == '+':
            return '*'
        elif op == '*':
            return '+'
    line = ''.join(line)
    print(line)
    line = re.sub('+|*', swapOp, line)
    print(line)
    # look at regex substituing the numbers section
    line = re.sub('')


def part1(data):
    totalSum = 0
    for line in data:
        totalSum += evaluate(line)[0]
    print(totalSum)


def part2(data):
    totalSum = 0
    for line in data:
        newLine = adjust(line)
        totalSum += int(eval(newLine))
    print(totalSum)


def main():
    data = parsetext("day18input.txt")
    part1(data)
    part2(data)


if __name__ == '__main__':
    main()
