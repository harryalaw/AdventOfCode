with open("day8input.txt") as f:
    commands = [line.split() for line in f.read().split("\n")]
    commands = [[line[0], int(line[1])] for line in commands]


def findValue(commands):
    ptr = acc = 0
    seen = set()
    hasLoop = False
    while(ptr < len(commands)):
        if(ptr in seen):
            hasLoop = True
            break
        seen.add(ptr)
        cmd, val = commands[ptr]
        if(cmd == 'acc'):
            acc += val
        elif(cmd == 'jmp'):
            ptr += val
            continue
        ptr += 1
    return (acc, hasLoop)


def part1():
    print(findValue(commands)[0])


def part2():
    swaps = {'nop': 'jmp', 'jmp': 'nop'}
    for i, (cmd, val) in enumerate(commands):
        if cmd == 'nop' or cmd == 'jmp':
            swapped = [(swaps[cmd], val)]
            newCommands = commands[:i] + swapped + commands[i+1:]
            acc, hasLoop = findValue(newCommands)
            if not hasLoop:
                print(acc)


part1()
part2()
