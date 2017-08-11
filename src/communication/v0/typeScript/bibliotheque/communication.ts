import {
    Unite,
    FormatIdentifiableIN, FormatIdentifiableEX, Identifiant,
    Enveloppe,
    Tableau, creerTableauVide,
    TableIdentification, creerTableIdentification,
    FormatTableIN,
    FormatTableEX, conversionFormatTable,
    TableIdentificationImmutable, creerTableIdentificationImmutable
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


export interface ReseauImmutable<S extends FormatIdentifiableEX<'sommet'>> {
    representation(): string;
    possedeNoeud(ID_sommet: Identifiant<'sommet'>): boolean;
    sontVoisins(ID_sommet1: Identifiant<'sommet'>, ID_sommet2: Identifiant<'sommet'>): boolean;
    pourChaqueNoeud(f: (id: Identifiant<'sommet'>, n: FormatNoeudEX<S>) => void): void;
    noeud(ID_sommet: Identifiant<'sommet'>): FormatNoeudEX<S>;
    identifiantsNoeuds(): Identifiant<'sommet'>[];
    selectionNoeud(): Identifiant<'sommet'>;
}


export interface ReseauMutable<S extends FormatIdentifiableEX<'sommet'>> extends
    ReseauImmutable<S> {
    ajouterNoeud(n: FormatNoeudEX<S>): void;
    retirerNoeud(n: FormatNoeudEX<S>): void;
}

export class ReseauTableDeNoeuds<S extends FormatIdentifiableEX<'sommet'>>
    extends TableIdentification<'sommet', FormatNoeudEX<S>, FormatNoeudEX<S>>
    implements ReseauMutable<S> {

    constructor() {
        super('sommet', (x) => x);
    }

    representation(): string {
        return "réseau de " + this.net('taille') + " noeuds : "
            + this.net('graphe');
    }
    // (simple renommmage)
    possedeNoeud(ID_sommet: Identifiant<'sommet'>): boolean {
        return this.contient(ID_sommet);
    }
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    sontVoisins(ID_sommet1: Identifiant<'sommet'>, ID_sommet2: Identifiant<'sommet'>): boolean {
        return creerTableIdentificationImmutable('sommet', this.valeurIN(ID_sommet1).voisins).
            contient(ID_sommet2);
    }
    pourChaqueNoeud(f: (id: Identifiant<'sommet'>, n: FormatNoeudEX<S>) => void) {
        this.pourChaqueIn(f);
    }
    noeud(ID_sommet: Identifiant<'sommet'>): FormatNoeudEX<S> {
        return this.valeur(ID_sommet);
    }
    identifiantsNoeuds(): Identifiant<'sommet'>[] {
        return this.domaine();
    }
    selectionNoeud() {
        return this.selectionCle();
    }
    ajouterNoeud(n: FormatNoeudEX<S>): void {
        this.ajouter(n.centre.ID, n);
    }
    retirerNoeud(n: FormatNoeudEX<S>): void {
        this.retirer(n.centre.ID);
    }
}

export function creerReseauVide<
    S extends FormatIdentifiableEX<'sommet'>
    >(): ReseauMutable<S> {
    return new ReseauTableDeNoeuds();
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


export interface NoeudImmutable<S extends FormatIdentifiableEX<'sommet'>> {
    aPourVoisin(ID_sommet: Identifiant<'sommet'>): boolean;
    pourChaqueVoisin(proc: (ID_sommet: Identifiant<'sommet'>, v: S) => void): void;
    ex() : FormatNoeudEX<S>
}

export interface NoeudMutable<S extends FormatIdentifiableEX<'sommet'>>
    extends NoeudImmutable<S> {
    ajouterVoisin(v: S): void;
}


export abstract class NoeudIN<S extends FormatIdentifiableEX<'sommet'>>
    extends Enveloppe<FormatNoeudIN<S>, FormatNoeudEX<S>, EtiquetteNoeud>
    implements NoeudMutable<S> {

    constructor(etat: FormatNoeudIN<S>) {
        super(conversionFormatNoeud, etat);
    }

    aPourVoisin(ID_sommet: Identifiant<'sommet'>): boolean {
        return creerTableIdentificationImmutable('sommet', this.in().voisins).
            contient(ID_sommet);
    }
    pourChaqueVoisin(proc: (ID_sommet: Identifiant<'sommet'>, v: S) => void) {
        creerTableIdentificationImmutable('sommet', this.in().voisins).pourChaque(proc);
    }

    ajouterVoisin(v: S): void {
        return creerTableIdentification('sommet', x => x, this.in().voisins)
            .ajouter(v.ID, v);
    }

}

export abstract class NoeudEX<S extends FormatIdentifiableEX<'sommet'>>
    extends Enveloppe<FormatNoeudEX<S>, FormatNoeudEX<S>, EtiquetteNoeud>
    implements NoeudImmutable<S> {

    constructor(etat: FormatNoeudEX<S>) {
        super(conversionFormatNoeud, etat);
    }

    aPourVoisin(ID_sommet: Identifiant<'sommet'>): boolean {
        return creerTableIdentificationImmutable('sommet', this.in().voisins).
            contient(ID_sommet);
    }
    pourChaqueVoisin(proc: (ID_sommet: Identifiant<'sommet'>, v: S) => void) {
        creerTableIdentificationImmutable('sommet', this.in().voisins).pourChaque(proc);
    }

}

export interface AssemblageReseau<S extends FormatIdentifiableEX<'sommet'>> {
    ajouterSommet(s: S): void;
    assembler(): ReseauMutable<S>;
}

class AssemblageReseauEnAnneau<S extends FormatIdentifiableEX<'sommet'>>
    extends Tableau<S, S>
    implements AssemblageReseau<S> {

    constructor(
        private nombreSommets: number,
        private fabriqueNoeud: (n: FormatNoeudIN<S>) => NoeudIN<S>
    ) {
        super(x => x)
        console.log("* Construction d'un réseau en anneau de " + nombreSommets.toString() + " éléments.");
    }
    // Les sommetts doivent avoir des identifiants deux à deux distincts.
    ajouterSommet(s: S): void {
        if (this.taille() < this.nombreSommets) {
            this.ajouterEnFin(s);
        } else {
            console.log("- Impossible d'ajouter un sommet : le réseau en anneau est complet.");
        }
    }

    assembler(): ReseauMutable<S> {
        let restant = this.nombreSommets - this.taille();
        if (restant > 0) {
            console.log("- Impossible d'assembler un réseau en anneau de la taille donnée : ajouter " + restant + " sommets.");
            throw new Error("[Exception : AssemblageReseau.assembler non défini.]")
        }
        // Définition du réseau
        let reseau: ReseauMutable<S> = creerReseauVide();
        this.pourChaque((i: number, s: S) => {
            let n: NoeudIN<S> = this.fabriqueNoeud({ centre: s, voisins: { table: {}, mutable: Unite.ZERO } });
            n.ajouterVoisin(this.valeurIn((i + 1) % this.nombreSommets));
            n.ajouterVoisin(this.valeurIn((i + (this.nombreSommets - 1)) % this.nombreSommets));
            reseau.ajouterNoeud(n.ex());
        });
        return reseau;
    }
}

export function creerAssemblageReseauEnAnneau<SO extends FormatIdentifiableEX<'sommet'>>(
    taille: number,
    fabriqueNoeud: (n: FormatNoeudIN<SO>) => NoeudIN<SO>)
    : AssemblageReseau<SO> {
    return new AssemblageReseauEnAnneau<SO>(taille, fabriqueNoeud);
}
