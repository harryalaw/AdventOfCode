import { coordinate } from "./util";


const textToArray = (text: string): Array<Array<string>> => {
    let array = text.split("\n").map(el => el.trim().split(""));
    return array;
}


function part1(input: string): string {
    const test1 = textToArray(input);
    let asteroids = findAsteroids(test1);
    let max = 0;
    let best = new coordinate(-1, -1);
    asteroids.forEach(asteroid => {
        let visible = countVisible(asteroid, asteroids);
        if (visible.size > max) {
            max = visible.size;
            best = asteroid;
        }
    })
    return `${best.toString()} ${max}`;
}

function findAsteroids(array: Array<Array<string>>): Set<coordinate> {
    let asteroids = new Set<coordinate>();
    array.forEach((row, y) => {
        row.forEach((el, x) => {
            if (el === "#") asteroids.add(new coordinate(x, y));
        })
    })
    return asteroids;
}

function countVisible(curr: coordinate, asteroids: Set<coordinate>): Map<string, number> {
    let differences = new Map<string, number>();
    asteroids.forEach(el => {
        if (!el.equals(curr)) {
            let key = curr.distance(el).normalise().toString();
            if (!differences.has(key)) {
                differences.set(key, 0);
            }
            differences.set(key, differences.get(key)! + 1);
        }
    })
    return differences;
}

function part2(input: string, asteroids: Set<coordinate>, array: Array<Array<string>>): number {
    let coords = input.split(" ")[0].replace(",", " ").split(" ").map(el => parseInt(el));
    let asteroid = new coordinate(coords[0], coords[1]);
    let visible = countVisible(asteroid, asteroids);

    let blastingArray = order(visible);
    let j = 0;

    for (let i = 0; i < 199; i++) {
        while (blastingArray[j][1] === blastingArray[j][2]) j = (j + 1) % blastingArray.length;
        blastingArray[j][1]++;
        j = (j + 1) % blastingArray.length;
    }

    let direction = blastingArray[j][0]
    let numberToSkip = blastingArray[j][1];

    while (asteroid.x >= 0 && asteroid.y >= 0 && asteroid.x < array[0].length && asteroid.y < array.length) {
        asteroid.x += direction[0];
        asteroid.y -= direction[1];
        // is there an asteroid here?
        if (array[asteroid.y][asteroid.x] === "#") {
            if (numberToSkip > 0) numberToSkip--;
            else return asteroid.x * 100 + asteroid.y;
        }
    }
    return 0;
}
function order(visible: Map<string, number>): Array<[number[], number, number]> {
    let rightHalf = new Array<[number[], number, number]>();
    let leftHalf = new Array<[number[], number, number]>();
    visible.forEach((value, asteroid) => {
        let values = asteroid.split(",").map(el => parseInt(el));
        if (values[0] >= 0) leftHalf.push([values, 0, value]);
        else rightHalf.push([values, 0, value])
    })
    let grad = (a: number[], b: number[]) => {
        let grad1 = a[1] * b[0];
        let grad2 = b[1] * a[0];
        // return negative value if a < b : 0 if a === b: posValue if a > b;
        return -1 * (grad1 - grad2);
    }
    leftHalf.sort((a, b) => grad(a[0], b[0]))
    rightHalf.sort((a, b) => grad(a[0], b[0]));

    return leftHalf.concat(rightHalf);
}



function tests(): boolean {
    let results = new Array<boolean>();
    results.push(part1(`.#..#
    .....
    #####
    ....#
    ...##`) === "3,4 8")
    results.push(part1(`......#.#.
    #..#.#....
    ..#######.
    .#.#.###..
    .#..#.....
    ..#....#.#
    #..#....#.
    .##.#..###
    ##...#..#.
    .#....####`) === "5,8 33");

    results.push(part1(`#.#...#.#.
    .###....#.
    .#....#...
    ##.#.#.#.#
    ....#.#.#.
    .##..###.#
    ..#...##..
    ..##....##
    ......#...
    .####.###.`) === "1,2 35");

    results.push(part1(`.#..#..###
    ####.###.#
    ....###.#.
    ..###.##.#
    ##.##.#.#.
    ....###..#
    ..#.#..#.#
    #..#.#.###
    .##...##.#
    .....#.#..`) === "6,3 41")


    let bigtest = `.#..##.###...#######
    ##.############..##.
    .#.######.########.#
    .###.#######.####.#.
    #####.##.#.##.###.##
    ..#####..#.#########
    ####################
    #.####....###.#.#.##
    ##.#################
    #####.##.###..####..
    ..######..##.#######
    ####.##.####...##..#
    .#####..#.######.###
    ##...#.##########...
    #.##########.#######
    .####.#.###.###.#.##
    ....##.##.###..#####
    .#.#.###########.###
    #.#.#.#####.####.###
    ###.##.####.##.#..##`
    results.push(part1(bigtest) === "11,13 210");
    results.push(main(bigtest) === 802);

    if (!results.every(el => el)) console.log(results)
    return results.every(el => el);
}

function main(input: string): number {
    const array = textToArray(input);
    let asteroids = findAsteroids(array);
    let nextInput = part1(input);
    return part2(nextInput, asteroids, array);
}


console.log(tests());
console.log(main(`.###..#######..####..##...#
########.#.###...###.#....#
###..#...#######...#..####.
.##.#.....#....##.#.#.....#
###.#######.###..##......#.
#..###..###.##.#.#####....#
#.##..###....#####...##.##.
####.##..#...#####.#..###.#
#..#....####.####.###.#.###
#..#..#....###...#####..#..
##...####.######....#.####.
####.##...###.####..##....#
#.#..#.###.#.##.####..#...#
..##..##....#.#..##..#.#..#
##.##.#..######.#..#..####.
#.....#####.##........#####
###.#.#######..#.#.##..#..#
###...#..#.#..##.##..#####.
.##.#..#...#####.###.##.##.
...#.#.######.#####.#.####.
#..##..###...###.#.#..#.#.#
.#..#.#......#.###...###..#
#.##.#.#..#.#......#..#..##
.##.##.##.#...##.##.##.#..#
#.###.#.#...##..#####.###.#
#.####.#..#.#.##.######.#..
.#.#####.##...#...#.##...#.`));

