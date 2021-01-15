def countNeighbours(grid, row, col):
    count = 0
    for i in range(max(0, row-1), min(len(grid), row+2)):
        for j in range(max(0, col-1), min(len(grid[0]), col+2)):
            if (i, j) == (row, col):
                continue
            else:
                if(grid[i][j] == "#"):
                    count += 1
    return count


def display(grid):
    for row in grid:
        for char in row:
            print(char, end=' ')
        print('')
    print('\n')


def life(grid, function, visible):
    filled = 0
    changes = True
    h, w = len(grid), len(grid[0])
    newGrid = grid
    while(changes):
        oldGrid = newGrid
        changes = False
        newGrid = []
        for row in range(h):
            newRow = []
            for col in range(w):
                if(oldGrid[row][col] == '.'):
                    newRow.append('.')
                    continue
                nbrs = function(oldGrid, row, col)
                if(oldGrid[row][col] == "L" and nbrs == 0):
                    newRow.append('#')
                    # toChange.append((row, col, '#'))
                    changes = True
                    filled += 1
                elif(oldGrid[row][col] == '#' and nbrs >= visible):
                    newRow.append('L')
                    # toChange.append((row, col, 'L'))
                    changes = True
                    filled -= 1
                else:
                    newRow.append(oldGrid[row][col])
            newGrid.append(newRow)
    print(filled)


def traceLine(grid, row, col, up, down):
    row += up
    col += down
    while(0 <= row < len(grid) and 0 <= col < len(grid[0])):
        if(grid[row][col] == '#'):
            return 1
        if(grid[row][col] == 'L'):
            return 0
        row += up
        col += down
    return 0


def losNeighbour(grid, row, col):
    directions = [[1, 0], [1, 1], [0, 1], [-1, 1],
                  [-1, 0], [-1, -1], [0, -1], [1, -1]]
    count = 0
    for dir_ in directions:
        count += traceLine(grid, row, col, dir_[0], dir_[1])
    return count


def part1():
    life(grid, countNeighbours, 4)


def part2():
    life(grid, losNeighbour, 5)


with open("day11input.txt") as f:
    grid = [list(s) for s in f.read().split("\n")]
part1()
with open("day11input.txt") as f:
    grid = [list(s) for s in f.read().split("\n")]
part2()
