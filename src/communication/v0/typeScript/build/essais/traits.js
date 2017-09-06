"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trait_1 = require("../bibliotheque/js/trait");
var I = (function () {
    function I() {
    }
    I.prototype.f = function () {
        console.log("coucou de f");
    };
    return I;
}());
var J = (function () {
    function J() {
    }
    J.prototype.g = function () {
        console.log("coucou de g");
    };
    return J;
}());
var C = (function () {
    function C() {
    }
    return C;
}());
trait_1.composerTraits(C, [I, J]);
var c = new C();
c.f();
c.g();
//# sourceMappingURL=traits.js.map