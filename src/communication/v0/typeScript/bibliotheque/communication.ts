export interface FormatMessage { };

// Modèle générique d'une enveloppe d'un document JSON
export abstract class Enveloppe<F, S extends F> {
    _enJSON: S;
    constructor(enJSON: S) {
        this._enJSON = enJSON; // JSON
    };
    enJSON(): S {
        return this._enJSON;
    };

    brut(): string {
        return JSON.stringify(this.enJSON());
    };

    abstract net(): string;
};

export abstract class Message<T extends FormatMessage> extends Enveloppe<FormatMessage, T> {

    constructor(enJSON: T) {
        super(enJSON); // JSON
    };
}
/*
- réseau ::= noeud*
- noeud ::= (sommet, sommet*)
- sommet ::= {identifiant, ...}

- Serveur : agrégation d'un réseau
- Client : agrégation d'un noeud du réseau 

- Remarque : compatibilité ES3 pour les objets.
*/

export type Identifiant = string;

// - sommet ::= {identifiant, ...}
export interface FormatSommet {
    id: Identifiant;
}

export abstract class Sommet<S extends FormatSommet> extends Enveloppe<FormatSommet, S> {

    constructor(enJSON: S) {
        super(enJSON); // JSON
    };
}


// - réseau ::= noeud*
export interface Reseau<S extends FormatSommet> {
    noeuds(): { [cle: string]: Noeud<S> };
    noeud(id: Identifiant): Noeud<S>;
    possedeNoeud(id: Identifiant): boolean;
    sontVoisins(id1: Identifiant, id2: Identifiant): boolean;
}

// - réseau ::= noeud*
export class TableNoeuds<S extends FormatSommet> implements Reseau<S> {
    private _noeuds: { [cle: string]: Noeud<S>; };

    constructor() {
        this._noeuds = {};
    }
    noeuds(): { [cle: string]: Noeud<S> } {
        let r: { [cle: string]: Noeud<S>; } = {};
        let id;
        for (id in this._noeuds) {
            r[id] = this._noeuds[id];
        }
        return r;
    }

    noeud(id: Identifiant): Noeud<S> {
        return this._noeuds[id];
    }

    possedeNoeud(id: Identifiant): boolean {
        return this._noeuds[id] !== undefined;
    }
    // Précondition : id1 et id2 sont deux noeuds du réseau.
    sontVoisins(id1: Identifiant, id2: Identifiant): boolean {
        return this._noeuds[id1].aPourVoisin(id2);
    }
    ajouterNoeud(n: Noeud<S>): void {
        this._noeuds[n.centre().enJSON().id] = n;
    }

    retirerNoeud(n: Noeud<S>): void {
        delete this._noeuds[n.centre().enJSON().id];
    }
}

// - noeud ::= (sommet, sommet*)
export interface Noeud<S extends FormatSommet> {
    centre(): Sommet<S>;
    voisins(): { [cle: string]: Sommet<S> };
    voisinsEnJSON(): { [cle: string]: S };
    aPourVoisin(id: Identifiant): boolean;
    voisin(id: Identifiant): Sommet<S>;
}

class SommetTableSommets<S extends FormatSommet> implements Noeud<S> {
    private _centre: Sommet<S>;
    private _voisins: { [cle: string]: Sommet<S> };

    constructor(c: Sommet<S>) {
        this._centre = c;
        this._voisins = {};
    };

    centre(): Sommet<S> {
        return this._centre;
    }

    voisins(): { [cle: string]: Sommet<S> } {
        let r: { [cle: string]: Sommet<S> } = {};
        let id;
        for (id in this._voisins) {
            r[id] = this._voisins[id];
        }
        return r;
    }

    voisinsEnJSON(): { [cle: string]: S } {
        let r: { [cle: string]: S } = {};
        let id;
        for (id in this._voisins) {
            r[id] = this._voisins[id].enJSON();
        }
        return r;
    }
    aPourVoisin(id: Identifiant): boolean {
        return this._voisins[id] !== undefined;
    }

    voisin(id: Identifiant): Sommet<S> {
        return this._voisins[id];
    };

    ajouterVoisin(v: Sommet<S>): void {
        this._voisins[v.enJSON().id] = v;
    }
};

export function creerNoeud<S extends FormatSommet>(centre: S, voisins: S[], fabrique: (s: S) => Sommet<S>): Noeud<S> {
    let r = new SommetTableSommets<S>(fabrique(centre));
    voisins.forEach((s: S, i: number, tab: S[]) => {
        r.ajouterVoisin(fabrique(s));
    });
    return r;
}


export class AssemblageReseauEnAnneau<S extends FormatSommet> {
    // Les sommetts doivent avoir des identifiants deux à deux distincts.
    private sommets: Sommet<S>[];
    private taille: number;

    constructor(taille: number) {
        console.log("* Construction d'un réseau en anneau de " + taille + " éléments.");
        this.sommets = [];
        this.taille = taille;
    }

    ajouterSommet(s: Sommet<S>): void {
        if (this.sommets.length < this.taille) {
            this.sommets.push(s);
        } else {
            console.log("- Impossible d'ajouter un sommet : le réseau en anneau est complet.");
        }
    }

    assembler(): TableNoeuds<S> {
        let restant = this.taille - this.sommets.length;
        if (restant > 0) {
            console.log("- Impossible d'assembler un réseau en anneau : ajouter " + restant + " sommets.");
            return null;
        }
        // Définition du réseau
        let r = new TableNoeuds<S>();
        let ns: Noeud<S>[] = [];
        this.sommets.forEach((s: Sommet<S>, i: number, tab: Sommet<S>[]) => {
            let n = new SommetTableSommets(s);
            n.ajouterVoisin(tab[(i + 1) % this.taille]);
            n.ajouterVoisin(tab[(i + (this.taille - 1)) % this.taille]);
            r.ajouterNoeud(n);
        });
        return r;
    }
} 
