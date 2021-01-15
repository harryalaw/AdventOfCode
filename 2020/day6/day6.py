def countAnswers(group):
    answers = set()
    for ans in group:
        for char in ans:
            answers.add(char)
    return len(answers)


def countAgreements(group):
    sets = []
    for ans in group:
        sets.append(set(ans))
    out = set("abcdefghijklmnopqrstuvwxyz")
    for response in sets:
        out = out.intersection(response)
    return len(out)


with open("day6input.txt") as f:
    data = f.read().split("\n\n")
    groups = [group.split("\n") for group in data]
    total = 0
    totalAgree = 0
    for group in groups:
        totalAgree += countAgreements(group)
        total += countAnswers(group)
    print(total)
    print(totalAgree)
