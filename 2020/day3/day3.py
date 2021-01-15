test_data = ["..##.......",
             "#...#...#..",
             ".#....#..#.",
             "..#.#...#.#",
             ".#...##..#.",
             "..#.##.....",
             ".#.#.#....#",
             ".#........#",
             "#.##...#...",
             "#...##....#",
             ".#..#...#.#"]

with open("day3input.txt") as f:
    data = f.read()
    data = data.split("\n")

# print(len(test_data))


def countCollisions(grid, right, down):
    row, col = 0, 0
    width = len(grid[0])
    collisions = 0
    while row < len(grid):
        if(grid[row][col] == '#'):
            collisions += 1
        row += down
        col = (col+right) % width
    return collisions


dirs = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
test_vals = []
vals = []
for dir_ in dirs:
    test_vals.append(countCollisions(test_data, dir_[0], dir_[1]))
    vals.append(countCollisions(data, dir_[0], dir_[1]))


def prod(array):
    out = 1
    for num in array:
        out *= num
    return out


print(test_vals)
print(prod(test_vals))
print(vals)
print(prod(vals))
