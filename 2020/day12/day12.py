def moveShip(commands, waypoint, ship=True):
    def rotate(facing, angle):
        rotate = {90: [facing[1], -facing[0]],
                  180: [-facing[0], -facing[1]], 270: [-facing[1], facing[0]]}
        return rotate[angle]
    x, y = 0, 0
    facing = waypoint
    compass = {'N': [0, 1], 'E': [1, 0], 'S': [0, -1], 'W': [-1, 0]}

    for cmd, val in commands:
        if(cmd) in compass:
            if(ship):
                x += compass[cmd][0] * val
                y += compass[cmd][1] * val
            else:
                facing[0] += compass[cmd][0]*val
                facing[1] += compass[cmd][1]*val
        elif(cmd == 'F'):
            x += facing[0]*val
            y += facing[1]*val
        elif(cmd in ['L', 'R']):
            val = val if cmd == 'R' else 360-val
            facing = rotate(facing, val)
    return abs(x) + abs(y)


def solve():
    with open("day12input.txt") as f:
        cmds = [[line[0], int(line[1:])] for line in f.read().split("\n")]
    print(moveShip(cmds, [1, 0], True))
    print(moveShip(cmds, [10, 1], False))


solve()
