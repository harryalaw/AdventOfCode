"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Intputer = void 0;
var Intputer = /** @class */ (function () {
    function Intputer(memory) {
        var _this = this;
        this.stored = __spreadArrays(memory);
        this.memory = this.initMemory();
        this.isHalted = false;
        this.ptr = 0;
        this.relPtr = 0;
        this.parameters = new Map([[1, 3], [2, 3], [3, 1], [4, 1], [5, 2], [6, 2], [7, 3], [8, 3], [9, 1]]);
        this.opcodes = new Map([
            // RESETING ALL OF THE FOLLOWIN SO THAT THE PARAMETERS PASSED INTO THE FUNCTIONS SHOULD BE AS FIRST SEEN
            // adds numbers at x,y and stores at z;
            [1, function (x, y, z) {
                    _this.memory[z] = _this.memory[x] + _this.memory[y];
                    // console.log(`Set memory[${z}] to ${x}+${y} = ${x + y}`)
                }],
            // multiplies values at x,y and stores at z
            [2, function (x, y, z) {
                    _this.memory[z] = _this.memory[x] * _this.memory[y];
                    // console.log(`Set memory[${z}] to ${x}*${y} = ${x * y}`)
                }],
            // stores input value at position x
            [3, function (input, x) {
                    _this.memory[x] = input;
                    // console.log(`Set memory[${x}] to ${input}`)
                }],
            // returns the value at address x;
            [4, function (x) {
                    // console.log(x);
                    return _this.memory[x];
                }],
            // if value is non-zero then move ptr to target;
            // NOTE you have shifted it back by one because you are always incrementing the pointer
            [5, function (x, target) {
                    if (_this.memory[x] != 0)
                        _this.ptr = _this.memory[target] - 1;
                }],
            // if value is zero then move ptr to target;
            [6, function (x, target) {
                    if (_this.memory[x] === 0)
                        _this.ptr = _this.memory[target] - 1;
                }],
            // if first parameter is less thans second parameter, store 1 in target memory pos else store 0;
            [7, function (x, y, target) {
                    _this.memory[target] = _this.memory[x] < _this.memory[y] ? 1 : 0;
                }],
            // if x == y  then store 1 at memory[target] else store 0
            [8, function (x, y, target) {
                    _this.memory[target] = _this.memory[x] === _this.memory[y] ? 1 : 0;
                }],
            // Adjusts the relative base by the value of its parameter
            [9, function (x) {
                    _this.relPtr += _this.memory[x];
                }],
        ]);
        this.paramModes = new Map([
            ["0", function (x) { return x; }],
            ["1", function (x) { return _this.ptr; }],
            ["2", function (x) { return _this.relPtr + x; }],
        ]);
        this.opcodeNeedsRawInput = new Map([
            [1, [false, false, true]],
            [2, [false, false, true]],
            [3, [true]],
            [4, [false]],
            [5, [false, false]],
            [6, [false, false]],
            [7, [false, false, true]],
            [8, [false, false, true]],
            [9, [false]],
        ]);
    }
    Intputer.prototype.parseInstruction = function (instruction, debug) {
        var _a;
        if (debug === void 0) { debug = false; }
        // Parses instruction and returns the Opcode, and then the addresses for the parameters
        var opcode = instruction % 100;
        var pMode = (instruction / 100 >> 0).toString().split("").reverse();
        var result = [opcode];
        var paramCount = this.parameters.get(opcode);
        for (var i = 0; i < paramCount; i++) {
            var pType = i < pMode.length ? pMode[i] : "0";
            if (((_a = this.opcodeNeedsRawInput.get(opcode)) === null || _a === void 0 ? void 0 : _a[i]) && pType === "1") {
                pType = "0";
            }
            this.ptr += 1;
            // Here we are preprocessing what the functions above require;
            // NOTE that this is kinda not what the paramModes would say;
            // I.e. if a value is being written somewhere we need to take the direct
            // value that the ptr reads as we pass it in to functions which
            // change this.memory[x]; so we need to leave x unchanged
            result.push(parseInt(this.paramModes.get(pType)(this.memory[this.ptr])));
        }
        ;
        return result;
    };
    Intputer.prototype.initMemory = function () {
        var array = new Array(1024).fill(0);
        var i = 0;
        this.stored.forEach(function (el) { array[i++] = el; });
        return array;
    };
    Intputer.prototype.reset = function () {
        this.ptr = 0;
        this.relPtr = 0;
        this.memory = this.initMemory();
        this.isHalted = false;
    };
    Intputer.prototype.execute = function (input, debug) {
        if (input === void 0) { input = [0]; }
        if (debug === void 0) { debug = false; }
        if (typeof input === "number") {
            input = [input];
        }
        var output = new Array();
        while (this.ptr < this.memory.length && !this.isHalted) {
            if (debug)
                console.log("ptr: " + this.ptr + " relPtr: " + this.relPtr);
            var instruction = this.parseInstruction(this.memory[this.ptr], debug);
            var op = instruction.shift();
            if (op === 99) {
                this.isHalted = true;
                break;
            }
            else if (op === 3) {
                var nextInput = input.shift();
                if (typeof nextInput === "undefined") {
                    // console.log(this.ptr)
                    this.ptr -= 1;
                    if (this.memory[this.ptr] != 3) {
                        console.log("---" + this.memory[this.ptr] + "---");
                    }
                    // console.log("Needed another input")
                    break;
                }
                instruction.unshift(nextInput);
            }
            var val = this.opcodes.get(op).apply(void 0, instruction);
            if (typeof val === "number") {
                output.push(val);
            }
            this.ptr += 1;
        }
        ;
        return output;
    };
    return Intputer;
}());
exports.Intputer = Intputer;
