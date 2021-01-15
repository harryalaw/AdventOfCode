class Intputer {
    opcodes: Map<number, Function>;
    memory: Array<number>;
    stored: Array<number>;
    ptr: number;
    relPtr: number;
    parameters: Map<number, number>;
    paramModes: Map<string, Function>;
    opcodeNeedsRawInput: Map<number, boolean[]>;
    isHalted: boolean;

    constructor(memory: Array<number>) {
        this.stored = [...memory];
        this.memory = this.initMemory();
        this.isHalted = false;
        this.ptr = 0;
        this.relPtr = 0;
        this.parameters = new Map<number, number>([[1, 3], [2, 3], [3, 1], [4, 1], [5, 2], [6, 2], [7, 3], [8, 3], [9, 1]]);
        this.opcodes = new Map<number, Function>([
            // RESETING ALL OF THE FOLLOWIN SO THAT THE PARAMETERS PASSED INTO THE FUNCTIONS SHOULD BE AS FIRST SEEN
            // adds numbers at x,y and stores at z;
            [1, (x: number, y: number, z: number): void => {
                this.memory[z] = this.memory[x] + this.memory[y];
                // console.log(`Set memory[${z}] to ${x}+${y} = ${x + y}`)
            }],
            // multiplies values at x,y and stores at z
            [2, (x: number, y: number, z: number): void => {
                this.memory[z] = this.memory[x] * this.memory[y];
                // console.log(`Set memory[${z}] to ${x}*${y} = ${x * y}`)
            }],
            // stores input value at position x
            [3, (input: number, x: number): void => {
                this.memory[x] = input;
                // console.log(`Set memory[${x}] to ${input}`)
            }],
            // returns the value at address x;
            [4, (x: number): number => {
                // console.log(x);
                return this.memory[x];
            }],
            // if value is non-zero then move ptr to target;
            // NOTE you have shifted it back by one because you are always incrementing the pointer
            [5, (x: number, target: number): void => {
                if (this.memory[x] != 0) this.ptr = this.memory[target] - 1;
            }],
            // if value is zero then move ptr to target;
            [6, (x: number, target: number): void => {
                if (this.memory[x] === 0) this.ptr = this.memory[target] - 1;
            }],
            // if first parameter is less thans second parameter, store 1 in target memory pos else store 0;
            [7, (x: number, y: number, target: number): void => {
                this.memory[target] = this.memory[x] < this.memory[y] ? 1 : 0;
            }],
            // if x == y  then store 1 at memory[target] else store 0
            [8, (x: number, y: number, target: number): void => {
                this.memory[target] = this.memory[x] === this.memory[y] ? 1 : 0;
            }],
            // Adjusts the relative base by the value of its parameter
            [9, (x: number): void => {
                this.relPtr += this.memory[x];
            }],
        ])
        this.paramModes = new Map<string, Function>([
            ["0", (x: number): number => x],
            ["1", (x: number): number => this.ptr],
            ["2", (x: number): number => this.relPtr + x],
        ]);
        this.opcodeNeedsRawInput = new Map<number, boolean[]>(
            [
                [1, [false, false, true]],
                [2, [false, false, true]],
                [3, [true]],
                [4, [false]],
                [5, [false, false]],
                [6, [false, false]],
                [7, [false, false, true]],
                [8, [false, false, true]],
                [9, [false]],
            ]
        )
    }

    parseInstruction(instruction: number, debug = false): Array<number> {
        // Parses instruction and returns the Opcode, and then the addresses for the parameters
        let opcode = instruction % 100;
        let pMode: Array<string> = (instruction / 100 >> 0).toString().split("").reverse();
        let result = [opcode];
        let paramCount: number = this.parameters.get(opcode)!;

        for (let i = 0; i < paramCount; i++) {
            let pType: string = i < pMode.length ? pMode[i] : "0";
            if (this.opcodeNeedsRawInput.get(opcode)?.[i] && pType === "1") {
                pType = "0";
            }
            this.ptr += 1;
            // Here we are preprocessing what the functions above require;
            // NOTE that this is kinda not what the paramModes would say;
            // I.e. if a value is being written somewhere we need to take the direct
            // value that the ptr reads as we pass it in to functions which
            // change this.memory[x]; so we need to leave x unchanged
            result.push(parseInt(this.paramModes.get(pType)!(this.memory[this.ptr])));
        };
        return result;
    }

    initMemory(): Array<number> {
        let array = new Array<number>(1024).fill(0);
        let i = 0;
        this.stored.forEach((el) => { array[i++] = el });
        return array;
    }

    reset(): void {
        this.ptr = 0;
        this.relPtr = 0;
        this.memory = this.initMemory();
        this.isHalted = false;
    }

    execute(input: number | Array<number> = [0], debug: boolean = false): Array<number> {
        if (typeof input === "number") {
            input = [input];
        }
        let output = new Array<number>();
        while (this.ptr < this.memory.length && !this.isHalted) {
            if (debug) console.log(`ptr: ${this.ptr} relPtr: ${this.relPtr}`);
            let instruction: Array<number> = this.parseInstruction(this.memory[this.ptr], debug);
            let op: number = instruction.shift()!;
            if (op === 99) {
                this.isHalted = true;
                break;
            } else if (op === 3) {
                let nextInput: number | undefined = input.shift();
                if (typeof nextInput === "undefined") {
                    // console.log(this.ptr)
                    this.ptr -= 1
                    if (this.memory[this.ptr] != 3) {
                        console.log(`---${this.memory[this.ptr]}---`);
                    }
                    // console.log("Needed another input")
                    break;
                }
                instruction.unshift(nextInput);
            }

            let val = this.opcodes.get(op)!(...instruction);
            if (typeof val === "number") {
                output.push(val);
            }
            this.ptr += 1;
        };
        return output;
    }

}

export { Intputer };