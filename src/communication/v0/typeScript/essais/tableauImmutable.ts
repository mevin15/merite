import {
    creerTableauImmutable, TableauImmutable
} from "../bibliotheque/types"

let tab : TableauImmutable<number> = creerTableauImmutable([0, 1, 2, 3]);

console.log(tab.brut()); // Conclusion : les objets built-in (string, number, array, etc.)sont traduits en JSON correctememnt.