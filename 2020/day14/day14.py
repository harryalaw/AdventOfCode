def interpretMask(mask):
    out = 0
    for char in mask:
        out <<= 1
        if(char == '1'):
            out += 1
    return(out)


def possibleAddresses(adr, mask):
    binaryVal = bin(adr)[2:]
    i = j = 0
    next_gen = [0]
    while(i < len(mask)):
        curr_gen = next_gen
        next_gen = []
        for num in curr_gen:
            num <<= 1
            if(mask[i] == "1"):
                num += 1
            elif(i >= len(mask)-len(binaryVal) and mask[i] == "0" and binaryVal[j] == "1"):
                num += 1
            next_gen.append(num)
            if(mask[i] == "X"):
                num += 1
                next_gen.append(num)
        j += 1 if i >= len(mask)-len(binaryVal) else 0
        i += 1
    return next_gen


def updateMemory(val, mask):
    out = 0
    binaryVal = bin(val)[2:]
    i = 0
    j = 0
    while(i < len(mask) - len(binaryVal)-1):
        out <<= 1
        if(mask[i] == "1"):
            out += 1
        i += 1
    while(j < len(binaryVal)):
        out <<= 1
        if(mask[i] == "1" or mask[i] == "X" and binaryVal[j] == '1'):
            out += 1
        i += 1
        j += 1
    return out


def part1():
    memory = {}
    mask = 0
    with open("day14input.txt") as f:
        line = f.readline()
        while(line):
            line = line.split("=")
            if(line[0].startswith('mask')):
                mask = line[1]
            else:
                adr = line[0][4:-2]
                if(adr not in memory):
                    memory[adr] = 0
                val = int(line[1].strip())
                memory[adr] = updateMemory(val, mask)
            line = f.readline()
    print(sum(memory.values()))


def part2():
    memory = {}
    mask = 0
    with open("day14input.txt") as f:
        line = f.readline()
        while(line):
            line = line.split("=")
            if(line[0].startswith('mask')):
                mask = line[1].strip()
                xs = 1 << mask.count("X")
            else:
                adr = int(line[0][4:-2])
                addresses = possibleAddresses(adr, mask)
                assert (len(addresses) == xs)
                val = int(line[1].strip())
                for adr in addresses:
                    if(adr not in memory):
                        memory[adr] = 0
                    memory[adr] = val
            line = f.readline()
    print(sum(memory.values()))


part1()
part2()
