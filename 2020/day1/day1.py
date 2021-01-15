with open("day1input.txt") as data:
    nums = data.read()
    nums = [int(x, 10) for x in nums.split("\n")]


def twoSum(target, data):
    seen = set()
    for num in data:
        if num in seen:
            return(num)
        seen.add(target-num)


def threeSum(target, data):
    for num in data:
        temp = twoSum(target-num, data)
        if(temp):
            return temp * num * (target-temp-num)


def uniqueInput():
    return len(set(nums)) == len(nums)


print(threeSum(2020, nums))
