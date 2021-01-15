def parseInput(text):
    with open(text) as f:
        tiles = f.read()
        tiles = tiles.replace("Tile ", "").split("\n\n")
        array = []
        for tile in tiles:
            Id, pattern = tile.split(":\n")
            pattern = pattern.split("\n")
            leftEdge = ''.join([line[0] for line in pattern])
            rightEdge = ''.join([line[-1] for line in pattern])
            edges = [pattern[0], rightEdge, pattern[-1], leftEdge]
            array.append((Id, edges))
    return array


def main():
    array = parseInput("day20input.txt")
    unmatched = set()
    matches = dict()
    for tile in array:
        for side in tile[1]:
            if side not in unmatched and side[::-1] not in unmatched:
                unmatched.add(side)
                matches[side] = [tile[0]]
            elif side in unmatched:
                unmatched.discard(side)
                matches[side].append(tile[0])
            elif side[::-1] in unmatched:
                unmatched.discard(side[::-1])
                matches[side[::-1]].append(tile[0])

    print(matches)

    product = 1
    for tile in array:
        emptySides = 0
        for side in tile[1]:
            if side in unmatched or side[::-1] in unmatched:
                emptySides += 1
        if emptySides == 2:
            print(tile[0], emptySides)
            product *= int(tile[0])

    print(product)
    # Because I have the corners, this should fix the rest of
    # image as


if __name__ == '__main__':
    main()
