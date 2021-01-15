# First 8 characters specify binary halves F == 0 ; B == 1
# print(int(44, 2))
# print(int(0b0101100))
# # L -> 0, R -> 1
# print(int(0b101))


def passToSeat(boardingPass):
    out = boardingPass.replace("F", "0").replace(
        "L", "0").replace("B", "1").replace("R", "1")
    row = int(out[:7], 2)
    col = int(out[7:], 2)
    return(row*8 + col)


def seatToPass(num):
    col = num % 8
    row = (num - col)//8
    col = bin(col)[2:].replace("0", "L").replace("1", "R")
    row = bin(row)[2:].replace("0", "F").replace("1", "B")
    assert(passToSeat(row+col) == num)
    print(row+col)


with open("day5input.txt") as f:
    lines = f.read().split("\n")
    nums = [passToSeat(boardingPass) for boardingPass in lines]
    print(max(nums))
    nums = sorted(nums)
    seen = set(nums)
    for num in nums:
        if num+1 not in seen and num+2 in seen:
            print(num+1)
# # print(passToSeat("FBFBBFFRLR"))
# # print(passToSeat("BFFFBBFRRR"))
# # print(passToSeat("FFFBBBFRRR"))
# # print(passToSeat("BBFFBBFRLL"))

# print(sorted(nums))
