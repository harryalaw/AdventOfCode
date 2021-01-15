"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var intcode_1 = require("./intcode");
var ourInput = "3,8,1005,8,298,1106,0,11,0,0,0,104,1,104,0,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,28,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,1002,8,1,51,1006,0,37,1006,0,65,1,4,9,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,83,2,3,9,10,1006,0,39,1,1,0,10,1,104,11,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1002,8,1,120,2,104,13,10,1,1007,18,10,1006,0,19,1,107,2,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,1001,8,0,157,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,0,10,4,10,1001,8,0,179,2,108,16,10,2,1108,14,10,1006,0,70,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,211,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,234,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,256,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,1,10,4,10,1002,8,1,278,101,1,9,9,1007,9,957,10,1005,10,15,99,109,620,104,0,104,1,21101,387508441896,0,1,21101,0,315,0,1105,1,419,21101,666412880532,0,1,21102,1,326,0,1106,0,419,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,106341436456,0,1,21101,373,0,0,1106,0,419,21101,46211886299,0,1,21101,384,0,0,1106,0,419,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,838433923860,1,21102,1,407,0,1105,1,419,21102,1,988224946540,1,21102,1,418,0,1106,0,419,99,109,2,21201,-1,0,1,21101,40,0,2,21102,1,450,3,21101,440,0,0,1105,1,483,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,445,446,461,4,0,1001,445,1,445,108,4,445,10,1006,10,477,1101,0,0,445,109,-2,2105,1,0,0,109,4,1201,-1,0,482,1207,-3,0,10,1006,10,500,21101,0,0,-3,21201,-3,0,1,21202,-2,1,2,21101,1,0,3,21102,1,519,0,1105,1,524,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,547,2207,-4,-2,10,1006,10,547,22102,1,-4,-4,1106,0,615,21202,-4,1,1,21201,-3,-1,2,21202,-2,2,3,21102,1,566,0,1105,1,524,21201,1,0,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,585,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,607,22101,0,-1,1,21102,1,607,0,105,1,482,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0";
function paintTiles(machine, initVal) {
    var boardState = new Map();
    var robotPos = new util_1.coordinate(0, 0);
    var robotDir = 3;
    var directions = [new util_1.coordinate(1, 0), new util_1.coordinate(0, -1), new util_1.coordinate(-1, 0), new util_1.coordinate(0, 1)];
    boardState.set(robotPos.toString(), initVal);
    while (!machine.isHalted) {
        var currTile = boardState.has(robotPos.toString()) ? boardState.get(robotPos.toString()) : 0;
        var out = machine.execute(currTile);
        boardState.set(robotPos.toString(), out[0]);
        robotDir = out[1] ? util_1.util.mod((robotDir - 1), 4) : util_1.util.mod((robotDir + 1), 4);
        robotPos = robotPos.add(directions[robotDir]);
    }
    return boardState;
}
function part1(input) {
    var machine = new intcode_1.Intputer(input.split(",").map(function (el) { return parseInt(el); }));
    // let paintedTiles = new Set<string>();
    var boardState = paintTiles(machine, 0);
    return boardState.size;
}
function findCorners(board) {
    var _a = [1e6, 1e6, -1e6, -1e6], minX = _a[0], minY = _a[1], maxX = _a[2], maxY = _a[3];
    board.forEach(function (color, coord) {
        var _a = coord.split(" ").map(function (el) { return parseInt(el); }), x = _a[0], y = _a[1];
        minX = x < minX ? x : minX;
        minY = y < minY ? y : minY;
        maxX = x > maxX ? x : maxX;
        maxY = y > maxY ? y : maxY;
    });
    return [minX, minY, maxX, maxY];
}
function part2(input) {
    var machine = new intcode_1.Intputer(input.split(",").map(function (el) { return parseInt(el); }));
    var boardState = paintTiles(machine, 1);
    var _a = findCorners(boardState), minX = _a[0], minY = _a[1], maxX = _a[2], maxY = _a[3];
    console.log(minX, minY, maxX, maxY);
    var board = Array.from(Array(maxY - minY + 1), function (_) { return Array(maxX - minX + 1).fill(0); });
    boardState.forEach(function (color, coord) {
        var _a = coord.split(" ").map(function (el) { return parseInt(el); }), x = _a[0], y = _a[1];
        board[y - minY][x - minX] = color;
    });
    // console.log(board);
    board.forEach(function (row) {
        var s = row.join("").replace(/0/g, " ").replace(/1/g, "1");
        console.log(s);
    });
}
function main(input) {
    console.log(part1(input));
    console.log(part2(input));
}
main(ourInput);
