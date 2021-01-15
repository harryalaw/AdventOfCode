import { Intputer } from "./intcode";

const testInput: string = `1,9,10,3,2,3,11,0,99,30,40,50`;
const ourInput: string = '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,5,19,23,1,6,23,27,1,27,10,31,1,31,5,35,2,10,35,39,1,9,39,43,1,43,5,47,1,47,6,51,2,51,6,55,1,13,55,59,2,6,59,63,1,63,5,67,2,10,67,71,1,9,71,75,1,75,13,79,1,10,79,83,2,83,13,87,1,87,6,91,1,5,91,95,2,95,9,99,1,5,99,103,1,103,6,107,2,107,13,111,1,111,10,115,2,10,115,119,1,9,119,123,1,123,9,127,1,13,127,131,2,10,131,135,1,135,5,139,1,2,139,143,1,143,5,0,99,2,0,14,0';

const parseInput = (sampleInput: string): number[] => {
    let array: number[] = sampleInput.split(",").map(el => parseInt(el));
    return array
}

function runMachine(intmachine: Intputer, input: string, output: string): boolean {
    let array = parseInput(input);
    intmachine.stored = array;
    intmachine.reset();
    intmachine.execute();
    return intmachine.memory.slice(0, array.length).join(",") === output;
}

function tests() {
    let input = parseInput(testInput);
    let intmachine = new Intputer(input);
    let results = new Array<boolean>();
    results.push(runMachine(intmachine, testInput, "3500,9,10,70,2,3,11,0,99,30,40,50"));
    let test2 = `1,0,0,0,99`;
    results.push(runMachine(intmachine, test2, `2,0,0,0,99`));
    let test3 = `2,3,0,3,99`;
    results.push(runMachine(intmachine, test3, `2,3,0,6,99`));
    let test4 = `2,4,4,5,99,0`;
    results.push(runMachine(intmachine, test4, `2,4,4,5,99,9801`));
    let test5 = `1,1,1,4,99,5,6,0,99`;
    results.push(runMachine(intmachine, test5, `30,1,1,4,2,5,6,0,99`));

    if (!results.every(el => el)) console.log(results);
    else (console.log(true));
}


function part1(intmachine: Intputer): number {
    intmachine.stored[1] = 12;
    intmachine.stored[2] = 2;
    intmachine.reset();
    intmachine.execute();
    return intmachine.memory[0];
}

function part2(array: number[]): number {
    let i: number = 0;
    let j: number = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            let copyArray: number[] = [...array];
            copyArray[1] = i;
            copyArray[2] = j;
            let intmachine = new Intputer(copyArray);
            intmachine.execute();
            if (intmachine.memory[0] === 19690720) {
                console.log(i, j);
                return 100 * i + j;
            }
        }
    }
    return -1;
}


function main(input: string): void {
    let array: number[] = parseInput(input);
    let intmachine = new Intputer(array);
    console.log(part1(intmachine));
    console.log(part2([...array]));
    array[1] = 82;
    array[2] = 50;
    intmachine = new Intputer(array);
    intmachine.execute();
    console.log(intmachine.memory[0])
}

tests();
main(ourInput);
