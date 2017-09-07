"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function donneeDynamique(doc, champ) {
    return doc.getElementById(champ).innerHTML;
}
exports.donneeDynamique = donneeDynamique;
function poster(doc, champ, val) {
    doc.getElementById(champ).innerHTML += val;
}
exports.poster = poster;
//# sourceMappingURL=vueClient.js.map