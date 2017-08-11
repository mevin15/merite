"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function recupererElementHTML(id) {
    var r = document.getElementById(id);
    if (typeof r === "undefined") {
        throw new Error("[Erreur : elementParId(" + id + ") non d\u00E9fini.]");
    }
    return r;
}
function elementParId(id) {
    return recupererElementHTML(id);
}
exports.elementParId = elementParId;
function entreeParId(id) {
    return recupererElementHTML(id);
}
exports.entreeParId = entreeParId;
function recupererEntree(id) {
    return entreeParId(id).value;
}
exports.recupererEntree = recupererEntree;
function initialiserEntree(id, val) {
    entreeParId(id).value = val;
}
exports.initialiserEntree = initialiserEntree;
function initialiserDocument(contenu) {
    document.write(contenu);
}
exports.initialiserDocument = initialiserDocument;
function contenuBalise(champ) {
    var r = recupererElementHTML(champ);
    return r.innerHTML;
}
exports.contenuBalise = contenuBalise;
function poster(id, val) {
    var r = recupererElementHTML(id);
    r.innerHTML += val;
}
exports.poster = poster;
function posterNL(id, val) {
    poster(id, val + "<br>");
}
exports.posterNL = posterNL;
function gererEvenementDocument(type, gestionnaire) {
    console.log("- Document : enregistrement d'un gestionnaire pour l'événement " + type);
    document.addEventListener(type, gestionnaire);
}
exports.gererEvenementDocument = gererEvenementDocument;
function gererEvenementElement(id, type, gestionnaire) {
    var r = recupererElementHTML(id);
    r.addEventListener(type, gestionnaire);
}
exports.gererEvenementElement = gererEvenementElement;
function elementSaisieEnvoi(idSaisie, idBoutonEnvoi, msg) {
    return '<input type="text" id="' + idSaisie + '">'
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg + '" >';
}
exports.elementSaisieEnvoi = elementSaisieEnvoi;
//# sourceMappingURL=vueClient.js.map