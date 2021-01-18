#include <iostream>
#include <sstream>
#include <string>
#include <fstream>
#include <cassert>
#include <array>

bool validTriangle(int a, int b, int c)
{
    return (a+b > c) && (a + c > b) && (b + c > a);
}

bool validTriangle(std::array<int,3> col)
{
    return validTriangle(col[0], col[1], col[2]);
}

void tests()
{
    assert(validTriangle(5,10,25) == false && "5,10,25 not valid");
    assert(validTriangle(3,4,5) == true && "3,4,5 is valid");
    assert(validTriangle(3,3,3) == true && "3,3,3 is valid");
    assert(validTriangle(5,12,13) == true && "5,12,13 is valid");
    assert(validTriangle(1, 5, 2) == false && "1,5,2 not valid");
}

void part1(std::string& input)
{
    std::ifstream file(input);
    int validTriangleCount{ 0 };
    int side1,side2,side3; 
    std::string line{};
    while(getline(file, line))
    {
        std::stringstream ss;
        ss << line;
        ss >> side1 >> side2 >> side3;
        validTriangleCount += validTriangle(side1,side2,side3);

    }
    std::cout << validTriangleCount << '\n';
}

void part2(std::string& input)
{
    std::ifstream file(input);
    int validTriangleCount{ 0 };
    std::array<int,3> col1{ 0 , 0 , 0} ;
    std::array<int,3> col2{ 0 , 0 , 0} ;
    std::array<int,3> col3{ 0 , 0 , 0} ;
    int index = 0;
    std::string line{};
    
    while(getline(file, line))
    {
        std::stringstream ss;
        ss << line;
        ss >> col1[index] >> col2[index] >> col3[index];
        if( index == 2){
            validTriangleCount += validTriangle(col1);
            validTriangleCount += validTriangle(col2);
            validTriangleCount += validTriangle(col3);
        }
        index = (index + 1 )% 3;
    }
    std::cout << validTriangleCount << '\n';
}   

int main()
{
    std::string input{ "input" };
    part1(input); 
    part2(input);
    return 0;
}
