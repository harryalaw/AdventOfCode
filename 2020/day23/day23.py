def playGame(graph, current, iterations):
    for i in range(iterations):
        # current = graph[current]
        prev_next = graph[current]
        temp = current
        temp_vals = []
        for i in range(3):
            temp = graph[temp]
            temp_vals.append(temp)
        graph[current] = graph[temp]
        dest_val = current - 1 if current >= 2 else len(graph)
        while dest_val in temp_vals:
            dest_val = dest_val - 1 if dest_val >= 2 else len(graph)
        temp_next = graph[dest_val]
        graph[dest_val] = prev_next
        graph[graph[graph[prev_next]]] = temp_next

        current = graph[current]
    return graph


def part1(array):
    graph = {array[i]: array[(i+1) % len(array)] for i in range(len(array))}
    start = array[0]
    graph = playGame(graph, start, 100)
    value = graph[1]
    out = []
    while value != 1:
        out.append(value)
        value = graph[value]
    print(''.join(str(x) for x in out))


def part2(array):
    totalEls = 1000000
    graph = {i: i+1 for i in range(1, totalEls)}
    for i in range(len(array)-1):
        graph[array[i]] = array[i+1]
    graph[array[-1]] = 10
    graph[totalEls] = array[0]
    start = array[0]
    graph = playGame(graph, start, 10000000)
    print(graph[1] * graph[graph[1]])


def main():
    with open("day23input.txt") as f:
        array = list(f.read())
        array = [int(x) for x in array]
    part1(array[:])
    part2(array)


if __name__ == "__main__":
    main()
