"use strict";
exports.__esModule = true;
var chai = require("chai");
var tchat_1 = require("../../../tchat/commun/tchat");
var anneau = tchat_1.creerAnneauTchat(["titi", "toto", "coco", "sissi"]);
var IDs_noeuds = anneau.domaine();
for (var j in IDs_noeuds) {
    describe('fonction creerAnneauChat', function () {
        describe('méthode TableIdentification.possedeNoeud ', function () {
            it('renvoie true', function () {
                var res = anneau.possedeNoeud(IDs_noeuds[j]);
                chai.expect(res).to.equal(true);
            });
        });
    });
}
describe('fonction creerAnneauChat', function () {
    var ID_n = { sommet: "mauvaise" };
    describe('méthode TableIdentification.possedeNoeud ', function () {
        it('renvoie false', function () {
            var res = anneau.possedeNoeud(ID_n);
            chai.expect(res).to.equal(false);
        });
    });
});
var _loop_1 = function (j) {
    describe('fonction creerAnneauChat', function () {
        describe('méthode TableIdentification.valeur', function () {
            console.log(j);
            console.log(JSON.stringify(anneau.valeur(IDs_noeuds[j])));
            var ID_res = anneau.valeur(IDs_noeuds[j]).centre.ID;
            it('renvoie ' + ID_res.sommet, function () {
                chai.expect(ID_res.sommet).to.equal(IDs_noeuds[j].sommet);
            });
        });
    });
};
for (var j in IDs_noeuds) {
    _loop_1(j);
}
//# sourceMappingURL=tchat_test.js.map