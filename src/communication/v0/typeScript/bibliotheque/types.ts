// Revue 02/08 - Testé.

import { jamais } from "./outils";

export enum Unite { un }

// Problème / readonly properties
// Cf. https://github.com/Microsoft/TypeScript/issues/13347
// Interface with readonly property is assignable to interface with mutable property.
export interface Mutable {
    mutable: Unite
}

type EnLecture<T> = {
    readonly [P in keyof T]: T[P];
}

// Types formats JSON : FormatX par convention
// Format ::= { (etiquette : Format)*} | { [x : string] : Format }

// Modèle générique d'une enveloppe d'un document JSON
// TEX : type de sortie (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (confiné, permettant des modifications)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer la mutabilité et la visibilité de la structure 
//   de données, souvent au format JSON.
// Une fonction de conversion de TIN ves TEX est requise.
export abstract class Enveloppe<TIN, TEX, E extends string> {
    protected etat: TIN;
    protected inEnEx: (x: TIN) => TEX;
    constructor(inEnEx: (x: TIN) => TEX, etat: TIN) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    };
    ex(): TEX {
        return this.inEnEx(this.etat);
    }
    // transformation brute du json de type TIN en string
    brut(): string {
        return JSON.stringify(this.etat);
    };
    // représentation dans un json simplifié
    abstract net(etiquette: E): string;
    abstract representer(): string;
}

/*
 * Table mutable.
*/
export interface FormatTableIN<T> extends Mutable {
    table: { [cle: string]: T }
}

export interface FormatTableEX<T> {
    table: { readonly [cle: string]: T }
}

export function conversionFormatTable<TIN, TEX>(conv: (x: TIN) => TEX)
    : (t: FormatTableIN<TIN>) => FormatTableEX<TEX> {
    return (
        (t: FormatTableIN<TIN>) => {
            let r: { [cle: string]: TEX } = {};
            for (let c in t.table) {
                r[c] = conv(t.table[c]);
            }
            return { table: r };
        });
}
export type EtiquetteTable = 'taille' | 'graphe' | 'domaine' | 'image';

export class TableImmutable<TEX>
    extends Enveloppe<FormatTableEX<TEX>, FormatTableEX<TEX>, EtiquetteTable> {
    constructor(etat: FormatTableEX<TEX>) {
        super((x) => x, etat);
    }
    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return this.brut();
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }
    image(): TEX[] {
        let tab = [];
        for (let c in this.ex().table) {
            tab.push(this.ex().table[c]);
        }
        return tab;
    }
    domaine(): string[] {
        let tab = [];
        for (let c in this.ex().table) {
            tab.push(c);
        }
        return tab;
    }

    taille(): number {
        let n: number = 0;
        for (let c in this.ex().table) { // une seule itération
            n++;
        }
        return n;
    }

     foncteur<SEX>(f: (x: TEX) => SEX): TableImmutable<SEX> {
        let r: {table: { [cle: string]: SEX }} 
            = { table : {}};
        for (let c in this.etat.table) {
            r.table[c] = f(this.etat.table[c]);
        }
        return creerTableImmutable(r);
    }
}

export function creerTableImmutable<TEX>(t: FormatTableEX<TEX>)
    : TableImmutable<TEX> {
    return new TableImmutable(t);
}

export class Table<TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {

    constructor(valInVersEx: (x: TIN) => TEX, etat: FormatTableIN<TIN>) {
        super(conversionFormatTable(valInVersEx), etat);
    }

    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return this.brut();
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }
    image(): TEX[] {
        let tab = [];
        for (let c in this.ex().table) {
            tab.push(this.ex().table[c]);
        }
        return tab;
    }
    domaine(): string[] {
        let tab = [];
        for (let c in this.ex().table) {
            tab.push(c);
        }
        return tab;
    }
    selectionCle(): string {
        // sélection d'une clé
        for (let c in this.ex().table) { // une seule itération
            return c;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    }
    taille(): number {
        let n: number = 0;
        for (let c in this.ex().table) { // une seule itération
            n++;
        }
        return n;
    }
    estVide(): boolean {
        return this.taille() === 0;
    }

    ajouter(cle: string, x: TIN): void {
        this.etat.table[cle] = x;
    }
    retirer(cle: string): void {
        delete this.etat.table[cle];
    }
}

export function creerTableVide<TIN, TEX>(valInVersEx: (x: TIN) => TEX) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.un });
}
// Identifiant
// à utiliser avec Sorte = 'sorte à identifier' (chaine singleton)
// Usage : 
// - let id :Identifiant<'sorte'>
// - lecture : id.sorte de type string
// - création :  { sorte : "identite"} 
// Permet de typer les identifiants par sorte.
// Les identifiants sont toujours accéder via un champ nommé ID ou ID_x.

export type Identifiant<Sorte extends string> = {
    readonly val: string;
    readonly sorte: Sorte;
}

export interface FormatIdentifiableIN<Sorte extends string> extends Mutable {
    ID: Identifiant<Sorte>; // en majuscule par exception
}

export interface FormatIdentifiableEX<Sorte extends string> {
    readonly ID: Identifiant<Sorte>; // en majuscule par exception
}

export interface Identification<Sorte extends string> {
    identifier(s: Sorte): Identifiant<Sorte>;
}

export class IdentificationParCompteur<Sorte extends string>
    implements Identification<Sorte> {
    private compteur: number;
    constructor(private prefixe: string) {
        this.compteur = 0;
    }
    identifier(s: Sorte): Identifiant<Sorte> {
        let id: string = this.prefixe + this.compteur;
        this.compteur++;
        return { val: id, sorte: s };
    }

}

export function creerIdentificationParCompteur<
    Sorte extends string
    >(prefixe: string)
    : Identification<Sorte> {
    return new IdentificationParCompteur(prefixe);
}

/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairemetn le type string pour les clés. 
*/
export class TableIdentification<Sorte extends string, TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {
    protected sorte : Sorte;

    constructor(
        sorte : Sorte, 
        valInVersEx: (x: TIN) => TEX,
        pop : FormatTableEX<TIN> = { table: {} } ) {
        super(conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.un });
        this.sorte = sorte;
    }

    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().map((v, i, t) => JSON.stringify(v)).toString();
            case 'image': return this.image().map((v, i, t) => JSON.stringify(v)).toString();
            case 'graphe': return JSON.stringify(this.ex().table);
        }
        return jamais(e);
    }
    representer(): string {
        return this.net('graphe');
    }

    valeur(ID_sorte: Identifiant<Sorte>): TEX {
        return this.ex().table[ID_sorte.val];
    }
    contient(ID_sorte: Identifiant<Sorte>): boolean {
        if (this.ex().table[ID_sorte.val]) {
            return true;
        }
        return false;;
    }

    image(): TEX[] {
        let tab = [];
        for (let c in this.ex().table) {
            tab.push(this.ex().table[c]);
        }
        return tab;
    }
    domaine(): Identifiant<Sorte>[] {
        return creerTableImmutable<TEX>(this.ex()).domaine().
        map((s) => { return {val : s, sorte : this.sorte}} );
    }
    selectionCle(): Identifiant<Sorte> {
        // sélection d'une clé
        for (let c in this.ex().table) { // une seule itération
            return {val : c, sorte : this.sorte};
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    }
    taille(): number {
        let n: number = 0;
        for (let c in this.ex().table) { // une seule itération
            n++;
        }
        return n;
    }
    estVide(): boolean {
        return this.taille() === 0;
    }
    ajouter(ID_sorte: Identifiant<Sorte>, x: TIN): void {
        this.etat.table[ID_sorte.val] = x;
    }

    retirer(ID_sorte: Identifiant<Sorte>): void {
        delete this.etat.table[ID_sorte.val];
    }
}
export function creerTableIdentificationVide<
    Sorte extends string, TIN, TEX>(
        sorte : Sorte,
        valInVersEx: (x: TIN) => TEX) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx);
}

export function creerTableIdentification<
    Sorte extends string, TIN, TEX>(
        sorte : Sorte,
        valInVersEx: (x: TIN) => TEX,
        pop : FormatTableEX<TIN>
    ) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx, pop);
}

