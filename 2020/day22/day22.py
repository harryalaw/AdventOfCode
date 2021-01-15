def parseInput(text):
    with open(text) as f:
        decks = []
        data = f.read().split("\n\n")
        decks = [int(x) for x in data[0].split('\n')[1:]], [int(x)
                                                            for x in data[1].split('\n')[1:]]
    return decks


def part1(decks):
    deck1, deck2 = decks

    while(deck1 and deck2):
        temp1 = deck1.pop(0)
        temp2 = deck2.pop(0)
        if temp1 > temp2:
            deck1 += [temp1, temp2]
        else:
            deck2 += [temp2, temp1]
    out = 0
    return score(deck1+deck2)


def score(deck):
    out = 0
    for i, el in enumerate(deck):
        out += el*(len(deck)-i)
    return out


def recursiveCombat(deck1, deck2):
    # RETURNS  WINNER,DECK1,DECK2
    # Check if an exact ordering has appeared before
    rounds = set()
    while(deck1 and deck2):
        # check if an exact ordering has appeared before
        if tuple(deck1+["$"] + deck2) in rounds:
            return 0, deck1, deck2
        rounds.add(tuple(deck1 + ["$"] + deck2))
        temp1 = deck1.pop(0)
        temp2 = deck2.pop(0)
        # then if both temp1 <= len(deck1) and temp2<=len(deck2)
        if temp1 <= len(deck1) and temp2 <= len(deck2):
            winner = recursiveCombat(deck1[:temp1], deck2[:temp2])[0]
            # Recurse using temp1 cards from deck1 and temp2 cards from deck2
        else:
            winner = 0 if temp1 > temp2 else 1
            # Otherwise winner is higher card
        if winner == 0:
            deck1 += [temp1, temp2]
        else:
            deck2 += [temp2, temp1]
    winner = 0 if deck1 else 1
    return winner, deck1, deck2


def part2(decks):
    deck1, deck2 = decks

    winner, deck1, deck2 = recursiveCombat(deck1, deck2)
    out = deck1+deck2
    return score(out)


def main():
    decks = parseInput("day22input.txt")
    # print(part1(decks[:]))
    print(part2(decks[:]))


if __name__ == '__main__':
    main()
