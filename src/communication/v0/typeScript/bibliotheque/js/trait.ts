// Traits : classes possiblement abstraites
//    utilisées par composition dans une classe
// abstract class Trait { 
//   attributs publics (champ, méthodes)      
// }
// class classe implements Trait* {
//   attributs sous la forme de propriétés
//   autres propriétés   
// }

export function composerTraits(classe: any, traits: any[]) {
    traits.forEach(trait => {
        Object.getOwnPropertyNames(trait.prototype).forEach(name => {
            classe.prototype[name] = trait.prototype[name];
        });
    });
}
