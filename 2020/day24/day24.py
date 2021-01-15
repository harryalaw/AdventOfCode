import math


class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def toTuple(self):
        return (self.x, self.y)

    def __add__(self, vector):
        return Vector(self.x+vector.x, self.y+vector.y)

    def __repr__(self):
        return str((self.x, self.y))


def parseInput(text):
    with open(text) as f:
        data = f.read().replace("e", "e ").replace("w", "w ").split("\n")
        data = [line.strip().split(" ") for line in data]
    return data


def part1(text):
    tiles = {}
    for line in text:
        pos = Vector(0, 0)
        for move in line:
            pos += directions[move]
        pos = pos.toTuple()
        if pos in tiles:
            tiles.pop(pos)
        else:
            tiles[pos] = 1
    print(len(tiles))
    return tiles


yoffset = 1
directions = {
    "e": Vector(1, 0),
    "se": Vector(0.5, -yoffset),
    "sw": Vector(-0.5, -yoffset),
    "w": Vector(-1, 0),
    "nw": Vector(-0.5, yoffset),
    "ne": Vector(0.5, yoffset)
}


def get_neighbours(pos):
    vector = Vector(pos[0], pos[1])
    for value in directions.values():
        out = (vector+value).toTuple()
        yield out


def is_alive(pos, tiles):
    currState = pos in tiles
    count = 0
    for tile in get_neighbours(pos):
        count += 1 if tile in tiles else 0
    # print(count, pos)
    if currState:
        if count == 0 or count > 2:
            return False
        else:
            return True
    else:
        if count == 2:
            return True
        else:
            return False


def part2(initial, generations):
    tiles = initial
    for i in range(generations):
        cells = set()
        for tile in tiles.keys():
            cells.add(tile)
            nbrs = get_neighbours(tile)
            for nbr in nbrs:
                cells.add(nbr)
        alive = set()
        for cell in cells:
            if is_alive(cell, tiles):
                alive.add(cell)
        tiles = {x: 1 for x in alive}
    print(len(tiles))


def main():
    text = parseInput("day24input.txt")

    # print(text)
    tiles = part1(text)
    # print(tiles)
    part2(tiles, 100)


if __name__ == "__main__":
    main()
