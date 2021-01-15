import { coordinate, util } from "./util"
import { Intputer } from "./intcode"

const ourInput = `3,8,1005,8,298,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,28,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,51,1006,0,37,1006,0,65,1,4,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,83,2,3,9,10,1006,0,39,1,1,0,10,1,104,11,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,120,2,104,13,10,1,1007,18,10,1006,0,19,1,107,2,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,157,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1001,8,0,179,2,108,16,10,2,1108,14,10,1006,0,70,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,211,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,234,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,256,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,278,101,1,9,9,1007,9,957,10,1005,10,15,99,109,620,104,0,104,1,21101,387508441896,0,1,21101,0,315,0,1105,1,419,21101,666412880532,0,1,21102,1,326,0,1106,0,419,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,106341436456,0,1,21101,373,0,0,1106,0,419,21101,46211886299,0,1,21101,384,0,0,1106,0,419,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,838433923860,1,21102,1,407,0,1105,1,419,21102,1,988224946540,1,21102,1,418,0,1106,0,419,99,109,2,21201,-1,0,1,21101,40,0,2,21102,1,450,3,21101,440,0,0,1105,1,483,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,445,446,461,4,0,1001,445,1,445,108,4,445,10,1006,10,477,1101,0,0,445,109,-2,2105,1,0,0,109,4,1201,-1,0,482,1207,-3,0,10,1006,10,500,21101,0,0,-3,21201,-3,0,1,21202,-2,1,2,21101,1,0,3,21102,1,519,0,1105,1,524,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,547,2207,-4,-2,10,1006,10,547,22102,1,-4,-4,1106,0,615,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,1,566,0,1105,1,524,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,585,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,607,22101,0,-1,1,21102,1,607,0,105,1,482,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0`

function paintTiles(machine: Intputer, initVal: number): Map<string, number> {
    let boardState = new Map<string, number>();
    let robotPos = new coordinate(0, 0);
    let robotDir = 3;
    let directions = [new coordinate(1, 0), new coordinate(0, -1), new coordinate(-1, 0), new coordinate(0, 1)];
    boardState.set(robotPos.toString(), initVal);
    while (!machine.isHalted) {
        let currTile = boardState.has(robotPos.toString()) ? boardState.get(robotPos.toString()) : 0;
        let out = machine.execute(currTile);
        boardState.set(robotPos.toString(), out[0]);
        robotDir = out[1] ? util.mod((robotDir - 1), 4) : util.mod((robotDir + 1), 4);
        robotPos = robotPos.add(directions[robotDir])
    }
    return boardState;
}

function part1(input: string) {
    let machine = new Intputer(input.split(",").map(el => parseInt(el)));
    // let paintedTiles = new Set<string>();
    let boardState = paintTiles(machine, 0);

    return boardState.size;
}

function findCorners(board: Map<string, number>): [number, number, number, number] {
    let [minX, minY, maxX, maxY] = [1e6, 1e6, -1e6, -1e6];
    board.forEach((color, coord) => {
        let [x, y] = coord.split(" ").map(el => parseInt(el));
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
    })
    return [minX, minY, maxX, maxY];
}


function part2(input: string) {
    let machine = new Intputer(input.split(",").map(el => parseInt(el)));
    let boardState = paintTiles(machine, 1);

    let [minX, minY, maxX, maxY] = findCorners(boardState);
    console.log(minX, minY, maxX, maxY);


    let board = Array.from(Array(maxY - minY + 1), _ => Array(maxX - minX + 1).fill(0));


    boardState.forEach((color, coord) => {
        let [x, y] = coord.split(" ").map(el => parseInt(el));
        board[y - minY][x - minX] = color;
    });

    // console.log(board);
    board.forEach(row => {
        let s = row.join("").replace(/0/g, " ").replace(/1/g, "1")
        console.log(s);
    })
}

function main(input: string) {
    console.log(part1(input));
    console.log(part2(input));
}

main(ourInput);