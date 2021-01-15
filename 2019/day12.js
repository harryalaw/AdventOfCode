"use strict";
exports.__esModule = true;
var util_1 = require("./util");
var Vector = /** @class */ (function () {
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.prototype.add = function (v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    };
    Vector.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    };
    return Vector;
}());
function updateVelocities(moon1, moon2, vel1, vel2, vels) {
    var newVel1 = new Vector().add(vels[vel1]);
    var newVel2 = new Vector().add(vels[vel2]);
    if (moon1.x !== moon2.x) {
        newVel1.x += moon1.x < moon2.x ? 1 : -1;
        newVel2.x += moon1.x < moon2.x ? -1 : 1;
    }
    if (moon1.y !== moon2.y) {
        newVel1.y += moon1.y < moon2.y ? 1 : -1;
        newVel2.y += moon1.y < moon2.y ? -1 : 1;
    }
    if (moon1.z !== moon2.z) {
        newVel1.z += moon1.z < moon2.z ? 1 : -1;
        newVel2.z += moon1.z < moon2.z ? -1 : 1;
    }
    vels[vel1] = newVel1;
    vels[vel2] = newVel2;
    return vels;
}
;
function getEnergy(v) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}
function simulate(moons, steps, part2, debug) {
    if (part2 === void 0) { part2 = false; }
    if (debug === void 0) { debug = false; }
    var vels = new Array(moons.length).fill(new Vector(0, 0, 0));
    var iters = 0;
    var xPositions = new Set();
    var yPositions = new Set();
    var zPositions = new Set();
    var periods = [-1, -1, -1];
    var _loop_1 = function () {
        // update velocities
        for (var i = 0; i < moons.length - 1; i++) {
            var moon1 = moons[i];
            for (var j = i + 1; j < moons.length; j++) {
                var moon2 = moons[j];
                vels = updateVelocities(moon1, moon2, i, j, vels);
            }
        }
        // update positions
        moons = moons.map(function (vector, index) { return vector.add(vels[index]); });
        iters++;
        // Store positions for calculating periods;
        if (part2) {
            var xArr_1 = new Array(moons.length * 2);
            var yArr_1 = new Array(moons.length * 2);
            var zArr_1 = new Array(moons.length * 2);
            var i_1 = 0;
            moons.forEach(function (moon, ind) {
                xArr_1[i_1] = moon.x;
                xArr_1[i_1 + 1] = vels[ind].x;
                yArr_1[i_1] = moon.y;
                yArr_1[i_1 + 1] = vels[ind].y;
                zArr_1[i_1] = moon.z;
                zArr_1[i_1 + 1] = vels[ind].z;
                i_1 += 2;
            });
            if (xPositions.has(xArr_1.toString()) && periods[0] === -1) {
                periods[0] = iters - 1;
            }
            if (yPositions.has(yArr_1.toString()) && periods[1] === -1) {
                periods[1] = iters - 1;
            }
            if (zPositions.has(zArr_1.toString()) && periods[2] === -1) {
                periods[2] = iters - 1;
            }
            if (!periods.includes(-1)) {
                console.log(periods);
                return { value: util_1.util.lcm(util_1.util.lcm(periods[0], periods[1]), periods[2]) };
            }
            xPositions.add(xArr_1.toString());
            yPositions.add(yArr_1.toString());
            zPositions.add(zArr_1.toString());
        }
        if (debug) {
            console.log(iters);
            console.log(moons);
            console.log(vels);
        }
    };
    while (iters < steps || part2) {
        var state_1 = _loop_1();
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var totalEnergy = 0;
    moons.forEach(function (moon, i) { return totalEnergy += getEnergy(moon) * getEnergy(vels[i]); });
    return totalEnergy;
}
function parseInput(input) {
    var array = input.replace(/</g, "").replace(/>/g, "").split("\n").map(function (el) { return el.trim().split(",").map(function (part) { return parseInt(part.split("=")[1]); }); });
    var out = new Array();
    array.forEach(function (row) { return out.push(new Vector(row[0], row[1], row[2])); });
    return out;
}
function tests() {
    var results = new Array();
    var testInput1 = "<x=-1, y=0, z=2>\n    <x=2, y=-10, z=-7>\n    <x=4, y=-8, z=8>\n    <x=3, y=5, z=-1>";
    results.push(simulate(parseInput(testInput1), 10) === 179);
    results.push(simulate(parseInput(testInput1), 2773, true) === 2772);
    var testInput2 = "<x=-8, y=-10, z=0>\n    <x=5, y=5, z=10>\n    <x=2, y=-7, z=3>\n    <x=9, y=-8, z=-3>";
    results.push(simulate(parseInput(testInput2), 100) === 1940);
    results.push(simulate(parseInput(testInput2), 100, true) === 4686774924);
    if (!results.every(function (el) { return el; })) {
        console.log(results);
        return false;
    }
    return true;
}
function main() {
    var input = "<x=5, y=13, z=-3>\n    <x=18, y=-7, z=13>\n    <x=16, y=3, z=4>\n    <x=0, y=8, z=8>";
    console.log(simulate(parseInput(input), 1000));
    console.log(simulate(parseInput(input), 10, true));
}
console.log(tests());
main();
