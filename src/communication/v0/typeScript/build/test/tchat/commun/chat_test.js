"use strict";
exports.__esModule = true;
var chai = require("chai");
var chat_1 = require("../../../chat/commun/chat");
var anneau = chat_1.creerAnneauChat(["titi", "toto", "coco", "sissi"]);
var noeuds = anneau.noeuds();
var _loop_1 = function (cle) {
    var cleC = cle;
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
    var cleC = cle;
    describe('fonction creerAnneauChat', function () {
        describe('méthode TableNoeuds.noeuds ', function () {
            var result = noeuds[cleC].centre().enJSON().id;
            it('renvoie true', function () {
                chai.expect(result).to.equal(cleC);
            });
        });
    });
};
for (var cle in noeuds) {
    _loop_2(cle);
}
//# sourceMappingURL=chat_test.js.map