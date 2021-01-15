class util {
    static arraysEqual(a: Array<any>, b: Array<any>): boolean {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
    static gcd(a: number, b: number): number {
        if (!b) {
            return a;
        }
        return util.gcd(b, a % b);
    }

    static mod(num: number, modulo: number): number {
        return ((num % modulo) + modulo) % modulo;
    }

    static lcm(a: number, b: number): number {
        return (a * b) / util.gcd(a, b);
    }

    static getIntputerInput(s: string): number[] {
        return s.split(",").map(el => parseInt(el));
    }
}


class coordinate {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(point: coordinate): coordinate {
        return new coordinate(this.x + point.x, this.y + point.y);
    }

    distance(point: coordinate): coordinate {
        return new coordinate(point.x - this.x, this.y - point.y);
    }

    normalise() {
        // Floats are bad
        // Want to convert it so that it is a coordinate of the form [int,int] where x,y are coprime and x is as small as can be;
        let absx = Math.abs(this.x);
        let absy = Math.abs(this.y);
        let g = util.gcd(absx, absy);
        while (g != 1) {
            this.x /= g;
            this.y /= g;
            absx = Math.abs(this.x);
            absy = Math.abs(this.y);
            g = util.gcd(absx, absy);
        }
        return this;
    }
    equals(point: coordinate): boolean {
        return this.x === point.x && this.y === point.y;
    }

    toString(): string {
        return `${this.x} ${this.y}`
    }
}

export { util, coordinate }