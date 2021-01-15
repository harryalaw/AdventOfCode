def parseInput(text):
    with open(text) as f:
        lines = f.read()
        food = lines.replace("(contains", ":").replace(")", "").split("\n")
        food = [line.split(" : ") for line in food]
        food = [(line[0].split(" "), line[1].split(", ")) for line in food]
    return food


def part1():
    food = parseInput("day21input.txt")
    ingredientCount = dict()
    possibleAllergens = dict()
    allIngredients = set()

    for item in food:
        ingredients, allergens = item
        for ingredient in ingredients:
            if ingredient not in ingredientCount:
                ingredientCount[ingredient] = 0
            ingredientCount[ingredient] += 1
            allIngredients.add(ingredient)
        for allergen in allergens:
            if allergen not in possibleAllergens:
                possibleAllergens[allergen] = set(ingredients)
            else:
                possibleAllergens[allergen] &= set(ingredients)

    for allergen, ingredients in possibleAllergens.items():
        allIngredients -= ingredients
    niceCount = 0

    for key, value in possibleAllergens.items():
        print(key, value)

    for ingredient in allIngredients:
        niceCount += ingredientCount[ingredient]
    return niceCount, possibleAllergens


def part2(possibleAllergens):
    fixed = dict()
    solved = False
    while len(fixed) != len(possibleAllergens):
        for allergen, ingredients in possibleAllergens.items():
            if allergen in fixed:
                continue
            elif len(ingredients) == 1:
                temp = ingredients.pop()
                fixed[allergen] = temp
                ingredients.add(temp)
            else:
                for value in fixed.values():
                    ingredients.discard(value)

    out = sorted([(key, value)for key, value in fixed.items()])
    return ','.join(pair[1] for pair in out)


def main():
    niceCount, possibleAllergens = part1()
    print(niceCount)
    print(part2(possibleAllergens))


if __name__ == '__main__':
    main()
