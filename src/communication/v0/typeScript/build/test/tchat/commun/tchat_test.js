"use strict";
exports.__esModule = true;
var chai = require("chai");
var tchat_1 = require("../../../tchat/commun/tchat");
var anneau = tchat_1.creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
var noeuds = anneau.noeuds();
var _loop_1 = function (cle) {
    describe('fonction creerAnneauChat', function () {
        describe('méthode TableNoeuds.possedeNoeud ', function () {
            it('renvoie true', function () {
                var result = anneau.possedeNoeud(cle);
                chai.expect(result).to.equal(true);
            });
        });
    });
};
for (var cle in noeuds) {
    _loop_1(cle);
}
describe('fonction creerAnneauChat', function () {
    var cle = "mauvaise";
    describe('méthode TableNoeuds.possedeNoeud ', function () {
        it('renvoie false', function () {
            var result = anneau.possedeNoeud(cle);
            chai.expect(result).to.equal(false);
        });
    });
});
var _loop_2 = function (cle) {
    describe('fonction creerAnneauChat', function () {
        describe('méthode TableNoeuds.noeuds ', function () {
            var result = noeuds[cle].centre().enJSON().id;
            it('renvoie true', function () {
                chai.expect(result).to.equal(cle);
            });
        });
    });
};
for (var cle in noeuds) {
    _loop_2(cle);
}
//# sourceMappingURL=tchat_test.js.map