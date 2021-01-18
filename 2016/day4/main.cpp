#include <fstream>
#include <sstream>
#include <string>
#include <iostream>
#include <map>
#include <cassert>
#include <vector>
#include <algorithm>

struct 
Room
{
    std::string name;
    int sectorId;
    std::string checksum;
    std::string decoded;
    bool realRoom{ false };
};

struct
letterOccurence
{
    char letter;
    int count;
};

std::string decodeString(std::string&, int shiftValue);

Room parseLine(std::stringstream& line)
{
    Room room{};
    
    std::string nameAndId{};
    getline(line, nameAndId, '[');
    getline(line, room.checksum, ']');
    
    room.sectorId = stoi(nameAndId.substr(nameAndId.size() - 3)) ;
    room.name = nameAndId.substr(0 , nameAndId.size() - 4);
    room.decoded = decodeString(room.name, room.sectorId);

    return room;
}

void print_map(const std::map<char, int>& m)
{
    for(const auto& [key,value] : m)
    {
        std::cout << key << " = " << value << "; ";
    }
    std::cout << '\n';
}

void print_vector(const std::vector<letterOccurence> v)
{
    for(const auto& lo : v)
    {
        std::cout << lo.letter << "," << lo.count << "; ";
    }
    std::cout << '\n';
}

bool letterCountCompare(const letterOccurence& pair1, const letterOccurence& pair2) 
{
    if(pair1.count != pair2.count)
        return pair1.count > pair2.count;
    else
        return pair1.letter < pair2.letter;
}

std::string decodeString(std::string& encrypted, int shiftValue)
{
    std::string decoded{};
    for(const auto& c : encrypted ) 
    {
        if(c == '-')
        {
            decoded += ' ';
        }
        else
        {
            char temp_c { c-'a' };
            temp_c = (((temp_c+shiftValue) % 26) +26) % 26;
            decoded += temp_c+'a';
        }
    }
    return decoded;
}

int isRealRoom(Room& room)
{
    std::map<char, int> letterCount;

    for( char &c : room.name)
    {
        if(c == '-') continue;
        if(letterCount.find(c) == letterCount.end())
        {
            letterCount[c] = 0;
        }
        ++letterCount[c];
    }

    std::vector<letterOccurence > vect;
    for( const auto& [letter,count] : letterCount)
    {
        vect.push_back(letterOccurence{letter,count});
    }
    
    std::sort(vect.begin(), vect.end(), letterCountCompare);

    std::string test_checksum{};
    for(int i { 0 }; i < 5; ++i)
    {
        test_checksum += vect[i].letter;
    }
    room.realRoom = test_checksum == room.checksum;

    return room.realRoom ? room.sectorId : 0;
}

int part1(std::string input)
{
    std::ifstream file(input);
    std::string line{};
    

    int sumOfValidSectorIds{ 0 };
    while(getline(file,line))
    {
        std::stringstream ss;
        ss << line;
        Room room{ parseLine(ss) };
        sumOfValidSectorIds += isRealRoom(room);
        if(room.realRoom && room.decoded.find("north") != std::string::npos && room.decoded.find("pole") != std::string::npos)
        {
            std::cout << "Part 2: " << room.decoded << ' ' << room.sectorId << '\n';
        }
    }

    return sumOfValidSectorIds;
}

void tests()
{
    std::ifstream file("testinput");
    std::string test1 { "testinput" };
    int test1Result { part1(test1) };
    assert(test1Result== 1514 && "Test1 failed");

    std::string test2 { "qzmt-zixmtkozy-ivhz" };
    std::string decoded { decodeString(test2, 343) };
    assert(decoded == "very encrypted name" && "Decryption test failed");
}


int main()
{
    tests();
    std::string input{"input"};
    int part1result { part1(input) };
    std::cout<<"Part 1: " << part1result << '\n';
    return 0;
}

