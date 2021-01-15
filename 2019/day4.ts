function passwordCracker(min: number, max: number, part2: boolean) {
    let count: number = 0;
    for (let i = min; i <= max; i++) {
        if (validPassword(i, part2)) count++;
    }
    return count;
}


function validPassword(i: number, part2: boolean): boolean {
    let pair = false;
    let digits: number[] = i.toString().split("").map(el => parseInt(el));
    if (digits.length != 6) return false;
    let digitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    digitCount[digits[0]]++;
    for (let i = 1; i < 6; i++) {
        if (digits[i - 1] > digits[i]) return false;
        digitCount[digits[i]]++;
        if (digitCount[digits[i]] >= 2) pair = true;
    }
    return part2 ? digitCount.includes(2) : pair;

}

function testSuite() {
    console.log(validPassword(111111, false) === true);
    console.log(validPassword(223450, false) === false);
    console.log(validPassword(1233789, false) === false);
    console.log(validPassword(112233, true) === true);
    console.log(validPassword(123444, true) === false);
    console.log(validPassword(111122, true) === true);

}

// testSuite();
console.log(passwordCracker(165432, 707912, false));
console.log(passwordCracker(165432, 707912, true));