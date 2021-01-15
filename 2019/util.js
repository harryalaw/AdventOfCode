"use strict";
exports.__esModule = true;
exports.coordinate = exports.util = void 0;
var util = /** @class */ (function () {
    function util() {
    }
    util.arraysEqual = function (a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (a.length !== b.length)
            return false;
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    };
    util.gcd = function (a, b) {
        if (!b) {
            return a;
        }
        return util.gcd(b, a % b);
    };
    util.mod = function (num, modulo) {
        return ((num % modulo) + modulo) % modulo;
    };
    util.lcm = function (a, b) {
        return (a * b) / util.gcd(a, b);
    };
    util.getIntputerInput = function (s) {
        return s.split(",").map(function (el) { return parseInt(el); });
    };
    return util;
}());
exports.util = util;
var coordinate = /** @class */ (function () {
    function coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    coordinate.prototype.add = function (point) {
        return new coordinate(this.x + point.x, this.y + point.y);
    };
    coordinate.prototype.distance = function (point) {
        return new coordinate(point.x - this.x, this.y - point.y);
    };
    coordinate.prototype.normalise = function () {
        // Floats are bad
        // Want to convert it so that it is a coordinate of the form [int,int] where x,y are coprime and x is as small as can be;
        var absx = Math.abs(this.x);
        var absy = Math.abs(this.y);
        var g = util.gcd(absx, absy);
        while (g != 1) {
            this.x /= g;
            this.y /= g;
            absx = Math.abs(this.x);
            absy = Math.abs(this.y);
            g = util.gcd(absx, absy);
        }
        return this;
    };
    coordinate.prototype.equals = function (point) {
        return this.x === point.x && this.y === point.y;
    };
    coordinate.prototype.toString = function () {
        return this.x + " " + this.y;
    };
    return coordinate;
}());
exports.coordinate = coordinate;
