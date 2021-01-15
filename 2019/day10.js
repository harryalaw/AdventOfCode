var gcd = function (a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
};
var coordinate = /** @class */ (function () {
    function coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    coordinate.prototype.distance = function (point) {
        return new coordinate(point.x - this.x, this.y - point.y);
    };
    coordinate.prototype.normalise = function () {
        // Floats are bad
        // Want to convert it so that it is a coordinate of the form [int,int] where x,y are coprime and x is as small as can be;
        var absx = Math.abs(this.x);
        var absy = Math.abs(this.y);
        var g = gcd(absx, absy);
        while (g != 1) {
            this.x /= g;
            this.y /= g;
            absx = Math.abs(this.x);
            absy = Math.abs(this.y);
            g = gcd(absx, absy);
        }
        return this;
    };
    coordinate.prototype.equals = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    coordinate.prototype.toString = function () {
        return this.x + "," + this.y;
    };
    return coordinate;
}());
var textToArray = function (text) {
    var array = text.split("\n").map(function (el) { return el.trim().split(""); });
    return array;
};
function part1(input) {
    var test1 = textToArray(input);
    var asteroids = findAsteroids(test1);
    var max = 0;
    var best = new coordinate(-1, -1);
    asteroids.forEach(function (asteroid) {
        var visible = countVisible(asteroid, asteroids);
        if (visible.size > max) {
            max = visible.size;
            best = asteroid;
        }
    });
    return best.toString() + " " + max;
}
function findAsteroids(array) {
    var asteroids = new Set();
    array.forEach(function (row, y) {
        row.forEach(function (el, x) {
            if (el === "#")
                asteroids.add(new coordinate(x, y));
        });
    });
    return asteroids;
}
function countVisible(curr, asteroids) {
    var differences = new Map();
    asteroids.forEach(function (el) {
        if (!el.equals(curr)) {
            var key = curr.distance(el).normalise().toString();
            if (!differences.has(key)) {
                differences.set(key, 0);
            }
            differences.set(key, differences.get(key) + 1);
        }
    });
    return differences;
}
function part2(input, asteroids, array) {
    var coords = input.split(" ")[0].replace(",", " ").split(" ").map(function (el) { return parseInt(el); });
    var asteroid = new coordinate(coords[0], coords[1]);
    var visible = countVisible(asteroid, asteroids);
    var blastingArray = order(visible);
    var j = 0;
    for (var i = 0; i < 199; i++) {
        while (blastingArray[j][1] === blastingArray[j][2])
            j = (j + 1) % blastingArray.length;
        blastingArray[j][1]++;
        j = (j + 1) % blastingArray.length;
    }
    var direction = blastingArray[j][0];
    var numberToSkip = blastingArray[j][1];
    while (asteroid.x >= 0 && asteroid.y >= 0 && asteroid.x < array[0].length && asteroid.y < array.length) {
        asteroid.x += direction[0];
        asteroid.y -= direction[1];
        // is there an asteroid here?
        if (array[asteroid.y][asteroid.x] === "#") {
            if (numberToSkip > 0)
                numberToSkip--;
            else
                return asteroid.x * 100 + asteroid.y;
        }
    }
    return 0;
}
function order(visible) {
    var rightHalf = new Array();
    var leftHalf = new Array();
    visible.forEach(function (value, asteroid) {
        var values = asteroid.split(",").map(function (el) { return parseInt(el); });
        if (values[0] >= 0)
            leftHalf.push([values, 0, value]);
        else
            rightHalf.push([values, 0, value]);
    });
    var grad = function (a, b) {
        var grad1 = a[1] * b[0];
        var grad2 = b[1] * a[0];
        // return negative value if a < b : 0 if a === b: posValue if a > b;
        return -1 * (grad1 - grad2);
    };
    leftHalf.sort(function (a, b) { return grad(a[0], b[0]); });
    rightHalf.sort(function (a, b) { return grad(a[0], b[0]); });
    return leftHalf.concat(rightHalf);
}
function tests() {
    var results = new Array();
    results.push(part1(".#..#\n    .....\n    #####\n    ....#\n    ...##") === "3,4 8");
    results.push(part1("......#.#.\n    #..#.#....\n    ..#######.\n    .#.#.###..\n    .#..#.....\n    ..#....#.#\n    #..#....#.\n    .##.#..###\n    ##...#..#.\n    .#....####") === "5,8 33");
    results.push(part1("#.#...#.#.\n    .###....#.\n    .#....#...\n    ##.#.#.#.#\n    ....#.#.#.\n    .##..###.#\n    ..#...##..\n    ..##....##\n    ......#...\n    .####.###.") === "1,2 35");
    results.push(part1(".#..#..###\n    ####.###.#\n    ....###.#.\n    ..###.##.#\n    ##.##.#.#.\n    ....###..#\n    ..#.#..#.#\n    #..#.#.###\n    .##...##.#\n    .....#.#..") === "6,3 41");
    var bigtest = ".#..##.###...#######\n    ##.############..##.\n    .#.######.########.#\n    .###.#######.####.#.\n    #####.##.#.##.###.##\n    ..#####..#.#########\n    ####################\n    #.####....###.#.#.##\n    ##.#################\n    #####.##.###..####..\n    ..######..##.#######\n    ####.##.####...##..#\n    .#####..#.######.###\n    ##...#.##########...\n    #.##########.#######\n    .####.#.###.###.#.##\n    ....##.##.###..#####\n    .#.#.###########.###\n    #.#.#.#####.####.###\n    ###.##.####.##.#..##";
    results.push(part1(bigtest) === "11,13 210");
    results.push(main(bigtest) === 802);
    var smallTest = ".#....#####...#..\n    ##...##.#####..##\n    ##...#...#.#####.\n    ..#.....#...###..\n    ..#.#.....#....##";
    if (!results.every(function (el) { return el; }))
        console.log(results);
    return results.every(function (el) { return el; });
}
function main(input) {
    var array = textToArray(input);
    var asteroids = findAsteroids(array);
    var nextInput = part1(input);
    return part2(nextInput, asteroids, array);
}
console.log(tests());
console.log(main(".###..#######..####..##...#\n########.#.###...###.#....#\n###..#...#######...#..####.\n.##.#.....#....##.#.#.....#\n###.#######.###..##......#.\n#..###..###.##.#.#####....#\n#.##..###....#####...##.##.\n####.##..#...#####.#..###.#\n#..#....####.####.###.#.###\n#..#..#....###...#####..#..\n##...####.######....#.####.\n####.##...###.####..##....#\n#.#..#.###.#.##.####..#...#\n..##..##....#.#..##..#.#..#\n##.##.#..######.#..#..####.\n#.....#####.##........#####\n###.#.#######..#.#.##..#..#\n###...#..#.#..##.##..#####.\n.##.#..#...#####.###.##.##.\n...#.#.######.#####.#.####.\n#..##..###...###.#.#..#.#.#\n.#..#.#......#.###...###..#\n#.##.#.#..#.#......#..#..##\n.##.##.##.#...##.##.##.#..#\n#.###.#.#...##..#####.###.#\n#.####.#..#.#.##.######.#..\n.#.#####.##...#...#.##...#."));
