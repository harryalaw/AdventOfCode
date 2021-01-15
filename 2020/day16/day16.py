def parse_ranges(rules):
    titles = []
    ranges = []
    for rule in rules:
        rule = rule.split(":")
        titles.append(rule[0])
        rule = rule[1].split("or")
        rule = [x.strip().split("-") for x in rule]
        rule = [[int(y) for y in x] for x in rule]
        ranges.append(rule)
    return titles, ranges


def inRange(value, rule):
    return rule[0][0] <= value <= rule[0][1] or rule[1][0] <= value <= rule[1][1]


def invalid_values(values, rules):
    out = []
    for value in values:
        if not any(inRange(value, rule) for rule in rules):
            out.append(value)
    return out


def parseInput(text):
    with open(text) as f:
        complete = f.read().split("\n\n")

        titles, rules = parse_ranges(complete[0].split("\n"))

        my_ticket = [int(x) for x in complete[1].split("\n")[1].split(",")]

        tickets = complete[2].split("\n")[1:]
        tickets = [[int(x) for x in ticket.split(",")] for ticket in tickets]

        return titles, rules, my_ticket, tickets


def updateInfo(activeDict, passiveDict):
    for key, value in activeDict.items():
        if len(value) == 1:
            temp = value.pop()
            for otherKey in activeDict.keys():
                if otherKey != key:
                    activeDict[otherKey].discard(temp)
            passiveDict[temp] = set([key])
            for pssvKey in passiveDict.keys():
                if pssvKey != temp:
                    passiveDict[pssvKey].discard(key)
            value.add(temp)


def match_titles(titles, ranges, tickets):
    colCount = len(ranges)
    # Map columns to the titles they could be
    columns = {column: set(titles) for column in range(colCount)}
    # Map titles to columns they can appear in
    possibles = {title: set(range(colCount)) for title in titles}
    # See if a column only has one title
    notSolved = True
    while(notSolved):
        for ticket in tickets:
            for column, value in enumerate(ticket):
                for index, interval in enumerate(ranges):
                    # Eliminate impossible title/column pairs
                    title = titles[index]
                    if(column in possibles[title] and not inRange(value, interval)):
                        columns[column].remove(title)
                        possibles[title].remove(column)
            # see if title only appears in one column
            updateInfo(columns, possibles)
            # see if a column only has one title
            updateInfo(possibles, columns)
            # breaks out once all have been uniquely identified
            if(all(len(value) == 1 for value in possibles.values())):
                notSolved = False
    # returns indices of the titles starting with departure
    return [index.pop() for title, index in possibles.items() if title.startswith("departure")]


def part1(tickets, rules):
    invalids = []
    for ticket in tickets:
        invalids += invalid_values(ticket, rules)
    return sum(invalids)


def part2(titles, rules, my_ticket, tickets):
    bad_tickets = set()
    for i, ticket in enumerate(tickets):
        if invalid_values(ticket, rules):
            bad_tickets.add(i)
    tickets = [ticket for i, ticket in enumerate(
        tickets) if i not in bad_tickets]
    matches = match_titles(titles, rules, tickets)
    product = 1
    for match in matches:
        product *= my_ticket[match]
    return product


def main():
    titles, rules, my_ticket, tickets = parseInput("day16input.txt")
    print(part1(tickets, rules))
    print(part2(titles, rules, my_ticket, tickets))


if __name__ == "__main__":
    main()
