"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var types_1 = require("../../bibliotheque/types");
describe('creerDate', function () {
    var r = types_1.creerDateMaintenant();
    console.log("Date : " + JSON.stringify(r.ex()));
    var oracle = types_1.creerDate(r.ex());
    it('renvoie ' + r.representation(), function () {
        chai.expect(r.representation()).to.equal(oracle.representation());
    });
});
//# sourceMappingURL=date_test.js.map