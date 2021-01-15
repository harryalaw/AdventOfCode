def modular_pow(base, exponent, modulus):
    if modulus == 1:
        return 0
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent % 2 == 1:
            result = result * base % modulus
        exponent = exponent >> 1
        base = (base*base) % modulus
    return result


def part1(value1, value2):
    counter = 0
    ans = {value1, value2}
    x = 1
    while(ans):
        x = x*7 % 20201227
        counter += 1
        if x in ans:
            print(x, counter)
            ans.discard(x)
            return modular_pow(ans.pop(), counter, 20201227)


def main():
    values = [int(x) for x in open("day25input.txt").read().splitlines()]
    print(part1(*values))


if __name__ == "__main__":
    main()
