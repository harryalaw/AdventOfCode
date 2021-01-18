#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <cassert>

void moveKeyCode(int& code, char command)
{
    // 1  2  3
    // 4  5  6
    // 7  8  9
    switch(command)
    {
        case 'U':
            if(code >3)
                code -= 3;
            return;
        case 'D':
            if(code < 7)
                code +=3;
            return;
        case 'R':
            if(code % 3 != 0)
                ++code;
            return;
        case 'L':
            if(code % 3 != 1)
                --code;
            return;
    }
}

void moveKeyCode2(int& code, char command)
{
    //       1
    //    2  3  4
    // 5  6  7  8  9
    //    A  B  C
    //       D
    // A -> 10, B-> 11, C-> 12, D-> 13
    // Feels a bit janky doing it like this but should work
    switch(command)
    {
        case 'U':
            switch(code)
            {
                case 6: case 7: case 8: case 10: case 11: case 12:
                    code -=4;
                    return;
                case 3: case 13:
                    code -=2;
                    return;
                default:
                    return;
            }
        case 'D':
            switch(code)
            {

                case 2: case 3: case 4: case 6: case 7: case 8:
                    code += 4;
                    return;
                case 1: case 11:
                    code += 2;
                    return;
                default:
                    return;
            }
        case 'R':
            switch(code)
            {
                case 1: case 4: case 9: case 12: case 13:
                    return;
                default:
                    ++code;
                    return;
            }
        case 'L':
            switch(code)
            {
                case 1: case 2: case 5: case 10: case 13:
                    return;
                default:
                    --code;
                    return;
            }
    }
}
std::string getCode(const std::vector<std::string> &input, bool part2=false){
    int code = 5;
    std::string output;
    for( auto& line : input)
    {
        for(auto& c : line)
        {
            if(!part2) moveKeyCode(code,c);
            else moveKeyCode2(code,c);
        }
        output += code < 10 ? code+48 : code+55;
    }
    return output;
}

void printCode(const std::string &code)
{
    std::cout << code << std::endl;
}

void tests()
{
    std::vector<std::string> test1{"ULL","RRDDD","LURDL","UUUUD"};
    
    std::string test1Result { getCode(test1) };
    assert((test1Result == "1985") && "Test1 failed");

    std::string test1ResultPart2 { getCode(test1, true) };
    assert((test1ResultPart2 == "5DB3") && "Test1p2 failed");

}

int main()
{
    std::vector<std::string> input{};
    std::ifstream file("input");

    tests();

    for( std::string line; getline(file, line); )
    {
        input.push_back(line);
    }
    printCode(getCode(input));
    printCode(getCode(input,true));

    return 0;
}
