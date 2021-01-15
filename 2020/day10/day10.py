with open("day10input.txt") as f:
    data = sorted([int(x) for x in f.read().split("\n")])
    data.append(data[-1]+3)


def countSteps(array):
    steps = [0, 0, 0, 0]
    steps[array[0]] += 1
    for i in range(len(array)-1):
        steps[array[i+1]-array[i]] += 1
    return steps[1]*steps[3]


def countPermutations(array, maxVal):
    dp = [0 for _ in range(maxVal+1)]
    dp[0] = 1
    for num in array:
        if(num == 1):
            dp[1] = 1
        elif(num == 2):
            dp[2] = dp[1]+dp[0]
        else:
            dp[num] = dp[num-3] + dp[num-2] + dp[num-1]
    return dp[-1]


print(countSteps(data))
print(countPermutations(data, data[-1]))
