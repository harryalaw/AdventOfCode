def play_game(start_nums, target):
    mem = {}
    for index, num in enumerate(start_nums):
        mem[num] = index
    turn = len(start_nums)
    next_num = 0
    while(turn != target):
        current_num = next_num
        if(current_num not in mem):
            mem[current_num] = turn
            next_num = 0
        else:
            next_num = turn - mem[current_num]
            mem[current_num] = turn
        turn += 1
    return(current_num)


assert(play_game([1, 3, 2], 2020) == 1)
assert(play_game([2, 1, 3], 2020) == 10)
assert(play_game([1, 2, 3], 2020) == 27)
assert(play_game([2, 3, 1], 2020) == 78)
assert(play_game([3, 2, 1], 2020) == 438)
assert(play_game([3, 1, 2], 2020) == 1836)

new = 30000000

# assert(play_game([0, 3, 6], new) == 175594)
# assert(play_game([1, 3, 2], new) == 2578)
# assert(play_game([2, 1, 3], new) == 3544142)
# assert(play_game([1, 2, 3], new) == 261214)
# assert(play_game([2, 3, 1], new) == 6895259)
# assert(play_game([3, 2, 1], new) == 18)
# assert(play_game([3, 1, 2], new) == 362)
# print(play_game([0, 3, 6], new))

print(play_game([1, 20, 11, 6, 12, 0], 2020))
print(play_game([1, 20, 11, 6, 12, 0], new))
