"""
lr bags => 1 bw bag , 2 my bags
do bags => 3 bw bags, 4 my bags
bw bags => 1 sg bag
my bags => 2 sg bags, 9 fb bags
sg bags => 1 dv bag , 2 vp bags

dv bags => 3 fb bags, 4 db bags
vp bags => 5 fb bags, 6 db bags
fb bags => NONE
db bags => NONE

you have a sg bag. If you wanted to carry it in at least one other bag, how many different bag colours are valid for the outermost bag:
how many colors can eventually carry a sg bag?

In the above rules:
BW => SG directly
MY => SG directly + others
DO => BW + MY
LR => BW + MY

"""
""" A graph traversal problem, each node is a bag colour, and it is adjacent to the bags it can contain"""

import re
with open("day7input.txt") as f:
    # with open("day7test.txt") as f:
    data = [re.sub(r'[0-9]', '', line) for line in f.read().split("\n")]
    data = [re.sub(r'bags|bag|\.', '', line) for line in data]
    data = [line.split(" contain ") for line in data]
    data = [[line[0].strip(), line[1].strip().split(",")] for line in data]
    data = [[line[0], [el.strip() for el in line[1]]]for line in data]
    graph = {line[0]: line[1] for line in data}

with open("day7input.txt") as g:
    data = [re.sub(r'bags|bag|\.', '', line) for line in g.read().split("\n")]
    data = [line.split(" contain ") for line in data]
    data = [[line[0].strip(), [el.strip() for el in line[1].split(",")]]
            for line in data]
    graph2 = {line[0]: line[1] for line in data}

# print(graph2)


def solve1():
    goodKeys = set()

    def dfs(visited, graph, node, origin):
        if node not in visited:
            if(node == 'shiny gold'):
                goodKeys.add(origin)
            visited.add(node)
            for neighbour in graph[node]:
                if(neighbour == "no other"):
                    return
                dfs(visited, graph, neighbour, origin)
    for node in graph.keys():
        dfs(set(), graph, node, node)
    print(len(goodKeys))


# Solve 2 doesn't sum the numbers up as I want them to
def solve2():
    def countBags(node, graph):
        total = 0
        for neighbour in graph[node]:
            if(neighbour == "no other"):
                return 0
            count = int(neighbour[0])
            next_node = neighbour[2:]
            total += count * (countBags(next_node, graph)+1)
        return total
    countBags("shiny gold", graph2)
    print(countBags("shiny gold", graph2))


solve1()
solve2()
