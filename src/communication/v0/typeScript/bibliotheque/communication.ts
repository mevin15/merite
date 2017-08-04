import {
    Unite,
    FormatIdentifiableIN, FormatIdentifiableEX, Identifiant,
    Enveloppe,
    TableIdentification, FormatTableIN,
    FormatTableEX, conversionFormatTable
} from "./types"



// Cette interface pourrait être complétée à l'avenir.
export interface FormatConfigurationInitiale {
    readonly "configurationInitiale": Unite
};
// Cette interface pourrait être complétée à l'avenir.
export interface FormatErreurRedhibitoire {
    readonly "erreurRedhibitoire": Unite
}
// Cette interface pourrait être complétée à l'avenir.
// Clés "configurationInitiale" et "erreurRedhibitoire" interdites dans les messages
export interface FormatMessage { }

export abstract class Message<
    FMIN extends FormatMessage,
    FMEX extends FormatMessage,
    EM extends string
    >
    extends Enveloppe<FMIN, FMEX, EM> {

}

export abstract class Configuration<
    FCIN extends FormatConfigurationInitiale,
    FCEX extends FormatConfigurationInitiale,
    EC extends string
    >
    extends Enveloppe<FCIN, FCEX, EC> {

}

export abstract class ErreurRedhibitoire<
    FEIN extends FormatErreurRedhibitoire,
    FEEX extends FormatErreurRedhibitoire,
    EE extends string
    >
    extends Enveloppe<FEIN, FEEX, EE> {

}


/*
- réseau ::= noeud*
- noeud ::= (sommet, sommet*)
- sommet ::= {identifiant, ...}

- Serveur : agrégation d'un réseau
- Client : agrégation d'un noeud du réseau 

- Remarque : compatibilité ES3 pour les objets.
*/


// - sommet ::= {identifiant, ...}

// La sorte pour les identifiants de sommets est 'sommet'. 
export abstract class Sommet<
    SIN extends FormatIdentifiableEX<'sommet'>,
    SEX extends FormatIdentifiableEX<'sommet'>,
    E extends string
    >
    extends Enveloppe<SIN, SEX, E> {

}


// - réseau ::= noeud*

// Hypothèse : le réseau ne modifie ni les sommets ni les neouds. 
//   Conséquence : un seul format est utilisé, pour les sommets et pour les noeuds respectivement.
export class Reseau<SEX extends FormatIdentifiableEX<'sommet'>>
    extends TableIdentification<'sommet', FormatNoeudEX<SEX>, FormatNoeudEX<SEX>>{

    constructor() {
        super('sommet', (x) => x);
    }

    representer(): string {
        return "réseau de " + this.net('taille') + " noeuds : "
            + this.net('graphe');
    }
    // (simple renommmage)
    possedeNoeud(ID_sommet: Identifiant<'sommet'>): boolean {
        return this.contient(ID_sommet);
    }
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    sontVoisins(ID_sommet1: Identifiant<'sommet'>, ID_sommet2: Identifiant<'sommet'>): boolean {
        return this.etat.table[ID_sommet1.val].voisins.table[ID_sommet2.val] !== undefined;
    }
    ajouterNoeud(n: FormatNoeudEX<SEX>): void {
        this.ajouter(n.centre.ID, n);
    }
    retirerNoeud(n: FormatNoeudEX<SEX>): void {
        this.retirer(n.centre.ID);
    }
}

export function creerReseauVide<
    S extends FormatIdentifiableEX<'sommet'>
    >(): Reseau<S> {
    return new Reseau();
}

// - noeud ::= (sommet, sommet*)
// Hypothèse : un noeud ne modifie pas les sommets.
//    Conséquence : un seul format (sortie) est utilisé pour les sommets.
export interface FormatNoeudIN<S extends FormatIdentifiableEX<'sommet'>> {
    readonly centre: S;
    readonly voisins: FormatTableIN<S>
}

export interface FormatNoeudEX<S extends FormatIdentifiableEX<'sommet'>> {
    readonly centre: S;
    readonly voisins: FormatTableEX<S>
}

function conversionFormatNoeud<S extends FormatIdentifiableEX<'sommet'>>(
    n: FormatNoeudIN<S>): FormatNoeudEX<S> {
    return { centre: n.centre, voisins: conversionFormatTable<S, S>((s) => s)(n.voisins) };
}

export type EtiquetteNoeud = 'centre' | 'voisins';

export abstract class NoeudIN<S extends FormatIdentifiableEX<'sommet'>>
    extends Enveloppe<FormatNoeudIN<S>, FormatNoeudEX<S>, EtiquetteNoeud> {

    constructor(etat: FormatNoeudIN<S>) {
        super(conversionFormatNoeud, etat);
    }

    aPourVoisin(ID_sommet: Identifiant<'sommet'>): boolean {
        return this.etat.voisins.table[ID_sommet.val] !== undefined;
    }
    ajouterVoisin(v: S): void {
        this.etat.voisins.table[v.ID.val] = v;
    }
    foncteurProceduralSurVoisins(proc: (v: S) => void) {
        for (let c in this.etat.voisins.table) {
            proc(this.etat.voisins.table[c]);
        }
    }
}

export abstract class NoeudEX<S extends FormatIdentifiableEX<'sommet'>>
    extends Enveloppe<FormatNoeudEX<S>, FormatNoeudEX<S>, EtiquetteNoeud> {

    constructor(etat: FormatNoeudEX<S>) {
        super(conversionFormatNoeud, etat);
    }

    aPourVoisin(ID_sommet: Identifiant<'sommet'>): boolean {
        return this.etat.voisins.table[ID_sommet.val] !== undefined;
    }
    foncteurProceduralSurVoisins(proc: (v: S) => void) {
        for (let c in this.etat.voisins.table) {
            proc(this.etat.voisins.table[c]);
        }
    }
}


export class AssemblageReseauEnAnneau<S extends FormatIdentifiableEX<'sommet'>> {
    // Les sommetts doivent avoir des identifiants deux à deux distincts.
    private sommets: S[];
    private taille: number;


    constructor(
        taille: number,
        private fabriqueNoeud: (n: FormatNoeudIN<S>) => NoeudIN<S>
    ) {
        console.log("* Construction d'un réseau en anneau de " + taille + " éléments.");
        this.sommets = [];
        this.taille = taille;
    }

    ajouterSommet(s: S): void {
        if (this.sommets.length < this.taille) {
            this.sommets.push(s);
        } else {
            console.log("- Impossible d'ajouter un sommet : le réseau en anneau est complet.");
        }
    }

    assembler(): Reseau<S> {
        let restant = this.taille - this.sommets.length;
        if (restant > 0) {
            console.log("- Impossible d'assembler un réseau en anneau de la taille donnée : ajouter " + restant + " sommets.");
            throw new Error("[Exception : AssemblageReseau.assembler non défini.]")
        }
        // Définition du réseau
        let reseau: Reseau<S> = creerReseauVide();
        this.sommets.forEach((s: S, i: number, tab: S[]) => {
            let n: NoeudIN<S> = this.fabriqueNoeud({ centre: s, voisins: { table : {}, mutable : Unite.un} });
            n.ajouterVoisin(tab[(i + 1) % this.taille]);
            n.ajouterVoisin(tab[(i + (this.taille - 1)) % this.taille]);
            reseau.ajouterNoeud(n.ex());
        });
        return reseau;
    }
}

export function creerAssemblageReseauEnAnneau<SO extends FormatIdentifiableEX<'sommet'>>(
    taille: number,
    fabriqueNoeud: (n: FormatNoeudIN<SO>) => NoeudIN<SO>)
    : AssemblageReseauEnAnneau<SO> {
    return new AssemblageReseauEnAnneau<SO>(taille, fabriqueNoeud);
}
