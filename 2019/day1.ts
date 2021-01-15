let input: string = `83133
130874
140147
117477
144367
54627
133133
65928
76778
102928
135987
125674
74597
136246
117771
92413
64422
56693
92601
54694
95137
86188
126454
99142
94487
53785
69679
123479
124598
121152
146564
101173
82025
55187
84083
69403
114456
84722
88667
80619
121281
118139
125808
54034
81780
116401
136396
137830
108481
103712
144950
85621
57973
99549
107704
115782
83445
91681
87607
52745
76839
61881
73658
102315
100651
72929
124015
134764
135088
127294
66563
100125
83062
91212
143130
78993
58940
120981
110504
142779
95328
135936
84490
112005
101554
111185
124249
126525
96909
145482
140368
83014
77784
130376
79031
122317
100188
66679
89074
120969`

function parseInput(text: string): number[] {
    const textArr: string[] = text.split("\n");
    return textArr.map((el) => parseInt(el));
}

function fuelMass(mass: number): number {
    const prevFuel: number = mass;
    let fuel: number = (mass / 3 >> 0) - 2;
    return fuel > 0 ? prevFuel + fuelMass(fuel) : prevFuel;
}

function main(input): void {
    let array: number[] = parseInput(input);
    console.log(array.reduce((total: number, mass: number) => total + fuelMass(mass) - mass, 0));
}


console.log(fuelMass(12) - 12)
console.log(fuelMass(14) - 14)
console.log(fuelMass(1969) - 1969)
console.log(fuelMass(100756) - 100756)
main(input)
