import { util } from "./util";

class Vector {
    x: number;
    y: number;
    z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    equals(v: Vector): boolean {
        return this.x === v.x && this.y === v.y && this.z === v.z;
    }
}

function updateVelocities(moon1: Vector, moon2: Vector, vel1: number, vel2: number, vels: Vector[]): Vector[] {
    let newVel1 = new Vector().add(vels[vel1]);
    let newVel2 = new Vector().add(vels[vel2]);
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
};

function getEnergy(v: Vector): number {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

function simulate(moons: Vector[], steps: number, part2: boolean = false, debug: boolean = false): number {
    let vels = new Array(moons.length).fill(new Vector(0, 0, 0));
    let iters = 0;
    let xPositions = new Set<string>();
    let yPositions = new Set<string>();
    let zPositions = new Set<string>();
    let periods = [-1, -1, -1];

    while (iters < steps || part2) {
        // update velocities
        for (let i = 0; i < moons.length - 1; i++) {
            let moon1 = moons[i];
            for (let j = i + 1; j < moons.length; j++) {
                let moon2 = moons[j];
                vels = updateVelocities(moon1, moon2, i, j, vels);
            }
        }
        // update positions
        moons = moons.map((vector, index) => vector.add(vels[index]));
        iters++;
        // Store positions for calculating periods;
        if (part2) {
            let xArr = new Array<number>(moons.length * 2);
            let yArr = new Array<number>(moons.length * 2);
            let zArr = new Array<number>(moons.length * 2);
            let i = 0;
            moons.forEach((moon, ind) => {
                xArr[i] = moon.x;
                xArr[i + 1] = vels[ind].x;
                yArr[i] = moon.y;
                yArr[i + 1] = vels[ind].y;
                zArr[i] = moon.z;
                zArr[i + 1] = vels[ind].z;
                i += 2;
            })
            if (xPositions.has(xArr.toString()) && periods[0] === -1) {
                periods[0] = iters - 1;
            }
            if (yPositions.has(yArr.toString()) && periods[1] === -1) {
                periods[1] = iters - 1;
            }
            if (zPositions.has(zArr.toString()) && periods[2] === -1) {
                periods[2] = iters - 1;
            }
            if (!periods.includes(-1)) {
                console.log(periods);
                return util.lcm(util.lcm(periods[0], periods[1]), periods[2]);
            }
            xPositions.add(xArr.toString());
            yPositions.add(yArr.toString());
            zPositions.add(zArr.toString());
        }
        if (debug) {
            console.log(iters);
            console.log(moons);
            console.log(vels);
        }
    }
    let totalEnergy = 0;

    moons.forEach((moon, i) => totalEnergy += getEnergy(moon) * getEnergy(vels[i]));

    return totalEnergy;
}

function parseInput(input: string): Vector[] {
    let array = input.replace(/</g, "").replace(/>/g, "").split("\n").map(el => el.trim().split(",").map(part => parseInt(part.split("=")[1])));
    let out = new Array<Vector>();
    array.forEach(row => out.push(new Vector(row[0], row[1], row[2])));
    return out;
}


function tests() {
    let results = new Array<boolean>();
    let testInput1 = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`
    results.push(simulate(parseInput(testInput1), 10) === 179);
    results.push(simulate(parseInput(testInput1), 2773, true) === 2772);
    let testInput2 = `<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`;
    results.push(simulate(parseInput(testInput2), 100) === 1940)
    results.push(simulate(parseInput(testInput2), 100, true) === 4686774924);

    if (!results.every(el => el)) {
        console.log(results);
        return false;
    }
    return true;
}

function main() {
    const input = `<x=5, y=13, z=-3>
    <x=18, y=-7, z=13>
    <x=16, y=3, z=4>
    <x=0, y=8, z=8>`;
    console.log(simulate(parseInput(input), 1000));
    console.log(simulate(parseInput(input), 10, true));
}

console.log(tests());
main();