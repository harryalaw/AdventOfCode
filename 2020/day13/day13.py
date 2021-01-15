def parseInput(input):
    with open(input) as f:
        target = int(f.readline().strip())
        buses = f.readline().split(",")
        buses = [(int(x), (-i % int(x)))
                 for i, x in enumerate(buses) if x != 'x']
    return target, buses


def part1():
    target, buses = parseInput("day13input.txt")
    moduli = []
    nextBus = 0
    minTime = 1e52
    for i, bus in enumerate(buses):
        nextTime = bus[0] - (target % bus[0])
        if(nextTime < minTime):
            nextBus = i
            minTime = nextTime
        moduli.append(nextTime)
    print(buses[nextBus][0] * minTime)


def bezout(a, b):
    s, old_s = 0, 1
    r, old_r = b, a
    while r != 0:
        q = old_r // r
        old_r, r = r, old_r - q*r
        old_s, s = s, old_s - q*s
    if b != 0:
        bez_t = (old_r - old_s*a)//b
    else:
        bes_t = 0
    return old_s, bez_t


def CRT(a1, n1, a2, n2):
    m1, m2 = bezout(n1, n2)
    x = a1 * m2*n2 + a2*m1*n1
    return x % (n1*n2)


def part2():
    target, buses = parseInput("day13input.txt")
    cong = (1, 0)
    for bus in buses:
        n1, a1 = bus
        n2, a2 = cong
        x = CRT(a1, n1, a2, n2)
        cong = (n1*n2, x % (n1*n2))
    print(x)


part1()
part2()
