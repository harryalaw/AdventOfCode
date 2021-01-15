var input = "83133\n130874\n140147\n117477\n144367\n54627\n133133\n65928\n76778\n102928\n135987\n125674\n74597\n136246\n117771\n92413\n64422\n56693\n92601\n54694\n95137\n86188\n126454\n99142\n94487\n53785\n69679\n123479\n124598\n121152\n146564\n101173\n82025\n55187\n84083\n69403\n114456\n84722\n88667\n80619\n121281\n118139\n125808\n54034\n81780\n116401\n136396\n137830\n108481\n103712\n144950\n85621\n57973\n99549\n107704\n115782\n83445\n91681\n87607\n52745\n76839\n61881\n73658\n102315\n100651\n72929\n124015\n134764\n135088\n127294\n66563\n100125\n83062\n91212\n143130\n78993\n58940\n120981\n110504\n142779\n95328\n135936\n84490\n112005\n101554\n111185\n124249\n126525\n96909\n145482\n140368\n83014\n77784\n130376\n79031\n122317\n100188\n66679\n89074\n120969";
function parseInput(text) {
    var textArr = text.split("\n");
    return textArr.map(function (el) { return parseInt(el); });
}
function fuelMass(mass) {
    var prevFuel = mass;
    var fuel = (mass / 3 >> 0) - 2;
    return fuel > 0 ? prevFuel + fuelMass(fuel) : prevFuel;
}
function main(input) {
    var array = parseInput(input);
    console.log(array.reduce(function (total, mass) { return total + fuelMass(mass) - mass; }, 0));
}
console.log(fuelMass(12) - 12);
console.log(fuelMass(14) - 14);
console.log(fuelMass(1969) - 1969);
console.log(fuelMass(100756) - 100756);
main(input);
