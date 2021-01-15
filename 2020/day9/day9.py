with open("day9input.txt") as data:
    lines = [int(x) for x in data.read().split("\n")]

prev = [lines[i] for i in range(25)]

nextIndex = 26


def isSumOfPrev(num, prev):
    seen = set()
    for x in prev:
        if x in seen:
            return True
        seen.add(num-x)
    return False


testData = [35, 20, 15, 25, 47, 40, 62, 55, 65, 95,
            102, 117, 150, 182, 127, 219, 299, 277, 309, 576]


def solve(data, prevCount):
    prev = [data[i] for i in range(prevCount)]
    for i in range(prevCount, len(data)):
        if not isSumOfPrev(data[i], prev):
            return data[i]
        else:
            prev.pop(0)
            prev.append(data[i])


print(solve(lines, 25))


def contiguousSum(target, data):
    left = right = 0
    smallest = largest = data[0]
    tempSum = data[0]
    while(True):
        if tempSum == target:
            small = min(data[left:right+1])
            large = max(data[left:right+1])
            return small+large
        elif tempSum < target:
            right += 1
            tempSum += data[right]
        else:
            tempSum -= data[left]
            left += 1


target = solve(lines, 25)
print(contiguousSum(target, lines))
