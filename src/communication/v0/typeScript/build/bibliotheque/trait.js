"use strict";
// Traits : classes possiblement abstraites
//    utilisées par composition dans une classe
// abstract class Trait { 
//   attributs publics (champ, méthodes)      
// }
// class classe implements Trait* {
//   attributs sous la forme de propriétés
//   autres propriétés   
// }
exports.__esModule = true;
function composerTraits(classe, traits) {
    traits.forEach(function (trait) {
        Object.getOwnPropertyNames(trait.prototype).forEach(function (name) {
            classe.prototype[name] = trait.prototype[name];
        });
    });
}
exports.composerTraits = composerTraits;
//# sourceMappingURL=trait.js.map