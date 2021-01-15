#include <string>
#include <iostream>
#include <array>
#include <cmath>
#include <fstream>
#include <unordered_set>

class Coord
{
public:
	int x;
	int y;
	Coord()
	{
		x = 0;
		y = 0;
	}
	Coord(int xInput, int yInput) { x = xInput, y = yInput; }

	bool operator==(const Coord &anotherCoord) const
	{
		return (x == anotherCoord.x && y == anotherCoord.y);
	}
};

namespace std
{
	template <>
	struct hash<Coord>
	{
		size_t operator()(const Coord &k) const
		{
			// values should all be at most ~150 so should avoid collisions
			return k.x * 1000 + k.y;
		}
	};
} // namespace std

int mod(int x, int modulus)
{
	return ((x % modulus) + modulus) % modulus;
}

void move(Coord &currSpace, const Coord &direction, const int scalar)
{
	currSpace.x += scalar * direction.x;
	currSpace.y += scalar * direction.y;
}

int calcDistance(Coord &coord)
{
	return std::abs(coord.x) + std::abs(coord.y);
}

Coord followPath(std::string &input, bool part2)
{
	std::unordered_set<Coord> seen{};
	Coord currSpace{0, 0};
	int currDirection = {0};
	std::array<Coord, 4> dirs{Coord(0, 1), Coord(1, 0), Coord(0, -1), Coord(-1, 0)};
	int scalar{0};
	// messy to loop through the string like this but seemed quickest
	for (char &c : input)
	{
		switch (c)
		{
		case 'R':
			scalar = 0;
			currDirection = mod(currDirection + 1, 4);
			break;
		case 'L':
			scalar = 0;
			currDirection = mod(currDirection - 1, 4);
			break;
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '5':
		case '6':
		case '7':
		case '8':
		case '9':
			scalar = scalar * 10 + (static_cast<int>(c) - 48);
			break;
		case ',':
			for (int i{0}; i < scalar; ++i)
			{
				move(currSpace, dirs[currDirection], 1);
				if (part2)
				{
					auto search = seen.find(currSpace);
					if (search != seen.end())
					{
						return currSpace;
					}
					else
					{
						seen.insert(currSpace);
					}
				}
			}
			break;
		}
	}
	move(currSpace, dirs[currDirection], scalar);
	return currSpace;
}

int part1(std::string input)
{
	Coord endSpace{followPath(input, false)};
	return calcDistance(endSpace);
}

int part2(std::string input)
{
	Coord HQ{followPath(input, true)};
	return calcDistance(HQ);
}

void tests()
{
	std::string test1{"R2, L3"};
	std::cout << (part1(test1) == 5);

	std::string test2{"R2, R2, R2"};
	std::cout << (part1(test2) == 2);

	std::string test3{"R5, L5, R5, R3"};
	std::cout << (part1(test3) == 12);

	std::cout << '\n';
}

int main()
{
	tests();
	std::string input{};
	std::ifstream MyInput("input.txt");
	getline(MyInput, input);
	std::cout << part1(input) << std::endl;
	std::cout << part2(input) << std::endl;
	return 0;
}
