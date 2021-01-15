def parseText(text):
    with open(text) as f:
        input = f.split("\n\n")
        ruletext = input[0].splitlines()
        rules = {}

        for rule in ruletext:
            data = rule.split(": ")
            id = data[0]
            content = [sub.split(" ") for sub in data[1].split(" | ")]
            rules[id] = content

        samples = input[1].splitlines()

    return rules, samples


def check(rules, id, text, startingPoint):
    rule = rules[id]
    if rule[0][0][0] == '"':
        return {startingPoint+1} if startingPoint < len(text) and rule[0][0][1] == text[startingPoint] else set()
    else:
        endings = set()
        for subrule in rule:
            buffer = {startingPoint}
            for part in subrule:
                temp = set()
                for num in buffer:
                    temp = temp | check(rules, part, text, num)
                buffer = temp
            endings = endings | buffer
        return endings


def part1():
    rules, samples = parseText("day19input.txt")
    out = [len(sample) in check(rules, "0", sample, 0) for sample in samples]
    return out.count(True)


def __main__():
    print(part1())


if __name__ == '__main__':
    main()
