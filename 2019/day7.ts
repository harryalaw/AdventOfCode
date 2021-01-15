import { Intputer } from "./intcode";

const parse = (s: string) => s.split(",").map(el => parseInt(el));

const permutator = (inputArr: Array<number>): Array<Array<number>> => {
    let result = new Array<Array<number>>(120);
    let idx: number = 0;
    const permute = (arr: Array<number>, m: Array<number> = []) => {
        if (arr.length === 0) {
            result[idx++] = m
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}


function part1(input: Array<number>): number {
    let maxVal = -1e6;
    let orders = permutator([0, 1, 2, 3, 4]);
    // let bestInputs = [-1, -1, -1, -1, -1];
    let amps = Array<Intputer>(5);
    for (let i = 0; i < amps.length; i++) {
        amps[i] = new Intputer(input);
    }
    orders.forEach((array) => {
        amps.forEach((cpu) => {
            cpu.reset()
        });
        let values = [0]
        for (let i = 0; i < 5; i++) {
            values.unshift(array[i]);
            values = amps[i].execute(values);
        }
        if (values[0] > maxVal) {
            // bestInputs = [...array];
            maxVal = values[0];
        }
    })

    return maxVal

}

function part2(input: Array<number>): number {
    let maxVal = -1e6;
    let orders = permutator([5, 6, 7, 8, 9]);
    // let bestInputs = [-1, -1, -1, -1, -1];
    let amps = new Array<Intputer>(5);
    for (let i = 0; i < 5; i++) {
        amps[i] = new Intputer(input);
    }
    orders.forEach((array) => {
        let idx = 0;
        amps.forEach((cpu) => {
            cpu.reset();
            // executes the phase settings
            cpu.execute([array[idx++]]);
        });
        let value = [0]
        while (!amps[4].isHalted) {
            if (idx === 5) {
                idx = 0;
            }
            value = amps[idx].execute(value);
            idx++;
        }
        if (value[0] > maxVal) {
            // bestInputs = [...array];
            maxVal = value[0]
        }
    })
    // console.log(bestInputs);
    return maxVal;
}


function main(rawInput: string): void {
    let array = parse(rawInput);
    console.log(part1(array));
    console.log(part2(array));
}

function part1Tests(): boolean {
    const test1 = "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0"
    const test2 = "3,23,3,24,1002,24,10,24,1002,23,-1,23,101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0"
    const test3 = "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0"
    let results = new Array<boolean>();
    results.push(part1(parse(test1)) === 43210);
    results.push(part1(parse(test2)) === 54321);
    results.push(part1(parse(test3)) === 65210);
    return results.every(el => el);

}
function part2Tests(): boolean {
    const test1 = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"
    const test2 = "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"
    let results = new Array<boolean>();
    results.push(part2(parse(test1)) === 139629729);
    results.push(part2(parse(test2)) === 18216);
    return results.every(el => el);
}

const rawInput = `3,8,1001,8,10,8,105,1,0,0,21,34,43,60,81,94,175,256,337,418,99999,3,9,101,2,9,9,102,4,9,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,102,4,9,9,1001,9,4,9,102,3,9,9,4,9,99,3,9,102,4,9,9,1001,9,2,9,1002,9,3,9,101,4,9,9,4,9,99,3,9,1001,9,4,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,99`

console.log(part1Tests());
console.log(part2Tests());
main(rawInput);