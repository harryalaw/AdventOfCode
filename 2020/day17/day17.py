import copy


def initialState(input_):
    euclidSpace = [[[['.' for _ in range(23)]
                     for _ in range(23)] for _ in range(23)] for _ in range(23)]
    filled = 0
    with open(input_) as f:
        plane = f.read().split("\n")
        for j, line in enumerate(plane):
            for i, char in enumerate(line):
                euclidSpace[11][11][11-len(line)//2 + j][11 -
                                                         len(line)//2 + i] = char
                if(char == '#'):
                    filled += 1
    return euclidSpace, filled


def updateSpace(space, filled):
    temp_space = copy.deepcopy(space)
    for x in range(len(space)):
        for y in range(len(space[0])):
            for z in range(len(space[0][0])):
                for w in range(len(space[0][0][0])):
                    nbrCount = countNeighbours((x, y, z, w), space)
                    if space[x][y][z][w] == '#':
                        if nbrCount in [2, 3]:
                            temp_space[x][y][z][w] = '#'
                        else:
                            temp_space[x][y][z][w] = '.'
                            filled -= 1
                    elif space[x][y][z][w] == '.':
                        if nbrCount == 3:
                            temp_space[x][y][z][w] = '#'
                            filled += 1
                        else:
                            temp_space[x][y][z][w] = '.'
    return temp_space, filled


def countNeighbours(point, space):
    count = 0
    for x in range(max(point[0]-1, 0), min(point[0]+2, len(space))):
        for y in range(max(point[1]-1, 0), min(point[1]+2, len(space[0]))):
            for z in range(max(point[2]-1, 0), min(point[2]+2, len(space[0][0]))):
                for w in range(max(point[3]-1, 0), min(point[3]+2, len(space[0][0][0]))):
                    if (x, y, z, w) != point and space[x][y][z][w] == '#':
                        count += 1
    return count


def part1(data):
    space, filled = initialState(data)
    for i in range(6):
        space, filled = updateSpace(space, filled)
    print(filled)


def main():
    part1("day17input.txt")


if __name__ == "__main__":
    main()
