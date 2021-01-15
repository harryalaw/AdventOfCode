function passwordCracker(min, max, part2) {
    var count = 0;
    for (var i = min; i <= max; i++) {
        if (validPassword(i, part2))
            count++;
    }
    return count;
}
function validPassword(i, part2) {
    var pair = false;
    var digits = i.toString().split("").map(function (el) { return parseInt(el); });
    if (digits.length != 6)
        return false;
    var digitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    digitCount[digits[0]]++;
    for (var i_1 = 1; i_1 < 6; i_1++) {
        if (digits[i_1 - 1] > digits[i_1])
            return false;
        digitCount[digits[i_1]]++;
        if (digitCount[digits[i_1]] >= 2)
            pair = true;
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
