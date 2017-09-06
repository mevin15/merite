// Revue 02/08 - Testé.
import { normalisationNombre, jamais } from "./outils";

// Les enum sont des sous-types de number.
export enum Unite { ZERO }
export enum Deux {
    ZERO,
    UN
}

// Problème / readonly properties
// Cf. https://github.com/Microsoft/TypeScript/issues/13347
// Interface with readonly property is assignable to interface with mutable property.
// Remède : par défaut, les champs sont en lecture seulement. Lorsque ce n'est pas le cas, on rajoute 
//   un champ (mutable : Unite). Lorsqu'il s'agit de champs indexés, on introduit un champ table contenant 
//   la structure. Voir FormatTableIN ci-dessous. 
export interface Mutable {
    mutable: Unite
}

// Inutile.
export type EnLecture<T> = {
    readonly [P in keyof T]: T[P];
}

// Types formats JSON : FormatX par convention
// Il est recommandé de choisir le plus possible des formats immutables.
// Format ::= { (readonly etiquette : Format)*} 
//          | { (readonly etiquette : Format)*, (etiquette : Format)+, mutable : Unite} 
//          | { readonly table: { readonly [cle: string]: T }}
//          | { readonly table: { [cle: string]: T }}
//          | { table: { readonly [cle: string]: T }, mutable : Unite}
//          | { table: { [cle: string]: T }, mutable : Unite}

// Modèle générique d'une enveloppe d'un état
// TEX : type de sortie immutable (souvent format JSON en lecture seulement)
// TIN : type d'entrée pour l'état en format JSON ou non (mutable ou non, confiné si mutable)
// E : étiquettes utiles pour une représentation (cf. méthode net)
// La différence entre TIN et TEX permet de gérer les effets de bord sur l'état, souvent au format JSON.
// Une fonction de conversion de TIN vers TEX est requise.
// Toute méthode ayant une occurrence positive de TIN est protected. En effet, elle est susceptible
//   de permettre un effet de bord sur l'état s'il est mutable.
// Cette classe abstraite doit être étedue ;
// - implémentation de net et représenter,
// - extension par de méthodes modifiant ou observant l'état.

export abstract class Enveloppe<TIN, TEX, E extends string> {
    private etat: TIN;
    protected inEnEx: (x: TIN) => TEX;
    constructor(inEnEx: (x: TIN) => TEX, etat: TIN) {
        this.etat = etat;
        this.inEnEx = inEnEx;
    }
    protected in(): TIN {
        return this.etat;
    }
    ex(): TEX {
        return this.inEnEx(this.etat);
    }
    // transformation brute du json de type TIN en string
    brut(): string {
        return JSON.stringify(this.etat);
    };
    // représentation dans un json simplifié
    abstract net(etiquette: E): string;
    abstract representation(): string;
}

/* ***********************************************************************************************
*
*/

export enum Semaine {
    LUNDI,
    MARDI,
    MERCREDI,
    JEUDI,
    VENDREDI,
    SAMEDI,
    DIMANCHE
}

export enum Mois {
    JANVIER, FEVRIER, MARS,
    AVRIL, MAI, JUIN,
    JUILLET, AOUT, SEPTEMBRE,
    OCTOBRE, NOVEMBRE, DECEMBRE
}

export interface FormatDateFrEX {
    readonly seconde: number;
    readonly minute: number;
    readonly heure: number;
    readonly jourSemaine: Semaine;
    readonly jourMois: number;
    readonly mois: Mois;
    readonly annee: number;
}

export type EtiquetteDateFr =
    'heure'
    | 'jourSemaine' | 'jourMois'
    | 'moisLettre' | 'moisNumero'
    | 'annee'
    | 'date' | 'dateLongue';


export interface DateImmutable {
    ex() : FormatDateFrEX;
    detail(e: EtiquetteDateFr): string;
    representation(): string;
    representationLongue() : string;
    representationLog() : string;
}

export function conversionDate(d: Date): FormatDateFrEX {
    return {
        seconde: d.getSeconds(),
        minute: d.getMinutes(),
        heure: d.getHours(),
        jourSemaine: (d.getDay() + 6)%7,
        jourMois: d.getDate(),
        mois: d.getMonth(),
        annee: d.getFullYear()
    };
}


export class DateFrEnveloppe extends Enveloppe<FormatDateFrEX, FormatDateFrEX, EtiquetteDateFr>
    implements DateImmutable {

    net(e: EtiquetteDateFr): string {
        // A déplacer sous les cas.
        let s = normalisationNombre(this.in().seconde, 2);
        let min = normalisationNombre(this.in().minute, 2);
        let h = normalisationNombre(this.in().heure, 2);
        let js = this.in().jourSemaine;
        let jsL = Semaine[js].toLowerCase();
        let jm = normalisationNombre(this.in().jourMois, 2);
        let mo = this.in().mois;
        let moL = Mois[mo].toLowerCase();
        let moN = normalisationNombre(mo + 1, 2);
        let a = this.in().annee.toString();

        switch (e) {
            case 'heure': return `${h}:${min}:${s}`;
            case 'jourSemaine': return jsL;
            case 'jourMois': return jm;
            case 'moisLettre': return moL;
            case 'moisNumero': return moN;
            case 'annee': return a;
            case 'date': return `${jm}/${moN}/${a}`;
            case 'dateLongue': return `${jsL} ${jm} ${moL} ${a}`
        }
        return jamais(e);
    }
    detail(e: EtiquetteDateFr): string {
        return this.detail(e);
    }
    representation(): string {
        return this.net('heure') + ", le " + this.net('date');
    }
    representationLongue() : string {
        return this.net('heure') + ", le " + this.net('dateLongue');
    }
    representationLog() : string {
        return this.net('heure') + " " + this.net('date');
    }

}

export function creerDateMaintenant(): DateImmutable {
    return new DateFrEnveloppe(x => x, conversionDate(new Date()));
}

export function creerDate(d : FormatDateFrEX): DateImmutable {
    return new DateFrEnveloppe(x => x, d);
}

/* ************************************************************************************************
* Tableau.
*/

export interface FormatTableauIN<T> extends Mutable {
    readonly taille: number;
    readonly tableau: T[]
}

export interface FormatTableauEX<T> {
    readonly taille: number;
    readonly tableau: ReadonlyArray<T>
}

export class ModuleTableau {

    pourChaque<T>(
        f: (index: number, val: T, tab?: ReadonlyArray<T>) => void,
        t: FormatTableauEX<T>
    ): void {
        t.tableau.forEach((v, i, t) => f(i, v, t));
    }


    valeur<T>(t: FormatTableauEX<T>, index: number): T {
        return t.tableau[index];
    }

    taille<T>(t: FormatTableauEX<T>): number {
        return t.tableau.length;
    }

    foncteur<T, S>(t: FormatTableauEX<T>, f: (x: T) => S): FormatTableauIN<S> {
        let r: S[] = [];
        this.pourChaque((i, v) => {
            r[i] = f(v);
        }, t);
        return { taille: r.length, tableau: r, mutable: Unite.ZERO };
    }
    reduction<T>(t: FormatTableauEX<T>, neutre: T, op: (x: T, y: T) => T): T {
        let r: T = neutre;
        this.pourChaque((i, v) => {
            r = op(r, v);
        }, t);
        return r;
    }
    ajouterEnFin<T>(t: FormatTableauIN<T>, x: T): void {
        t.tableau.push(x);
    }

    retirerEnFin<T>(t: FormatTableauIN<T>): T {
        if (t.taille === 0) {
            throw new Error("[Exception : retirerEnFin() non défini.]");
        }
        return <T>t.tableau.pop();
    }

}

const MODULE_TABLEAU = new ModuleTableau();

export type EtiquetteTableau = 'taille' | 'valeurs';

// Conversion pour les tables 
export function conversionFormatTableau<TIN, TEX>(conv: (x: TIN) => TEX)
    : (t: FormatTableauIN<TIN>) => FormatTableauEX<TEX> {
    return (
        (t: FormatTableauIN<TIN>) => {
            let r: TEX[] = new Array(t.taille);
            MODULE_TABLEAU.pourChaque((i, v) => {
                r[i] = conv(v);
            }, t);
            return { taille: t.taille, tableau: r };
        });
}



// Tableau immutable : TIN = TEX (recommandé : immutable)
export class TableauImmutable<TEX>
    extends Enveloppe<FormatTableauEX<TEX>, FormatTableauEX<TEX>, EtiquetteTableau> {
    constructor(etat: FormatTableauEX<TEX>) {
        super((x) => x, etat);
    }
    net(e: EtiquetteTableau): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'valeurs': return this.in().tableau.toString();
        }
        return jamais(e);
    }
    representation(): string {
        return "[" + this.net('valeurs') + "]";
    }
    pourChaque(
        f: (index: number, val: TEX, tab?: TEX[]) => void
    ): void {
        MODULE_TABLEAU.pourChaque(f, this.in());
    }
    foncteur<S>(f: (x: TEX) => S): TableauImmutable<S> {
        return new TableauImmutable(MODULE_TABLEAU.foncteur(this.in(), f));
    }
    reduction(neutre: TEX, op: (x: TEX, y: TEX) => TEX): TEX {
        return MODULE_TABLEAU.reduction(this.in(), neutre, op);
    }
    valeur(index: number): TEX {
        return MODULE_TABLEAU.valeur(this.in(), index);
    }
    taille(): number {
        return MODULE_TABLEAU.taille(this.in());
    }
    estVide(): boolean {
        return this.taille() === 0;
    }
}

export function creerTableauImmutable<TEX>(t: ReadonlyArray<TEX>)
    : TableauImmutable<TEX> {
    return new TableauImmutable({
        taille: t.length,
        tableau: t
    });
}

// Tableau mutable - TIN peut être différent de TEX.
//   Recommandé : TEX immutable.
// Attention : la méthode ex() requiert un parcours du tableau formant l'état.
export class Tableau<TIN, TEX>
    extends Enveloppe<FormatTableauIN<TIN>, FormatTableauEX<TEX>, EtiquetteTableau> {

    constructor(
        protected valInVersEx: (x: TIN) => TEX,
        etat: FormatTableauIN<TIN> = { taille: 0, tableau: [], mutable: Unite.ZERO }) {
        super(conversionFormatTableau(valInVersEx), etat);
    }

    net(e: EtiquetteTableau): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'valeurs': return this.in().tableau.toString();
        }
        return jamais(e);
    }
    representation(): string {
        return "[" + this.net('valeurs') + "]";
    }

    protected pourChaqueIn(
        f: (index: number, val: TIN, tab?: TIN[]) => void
    ): void {
        MODULE_TABLEAU.pourChaque(f, this.in());
    }

    pourChaque(
        f: (index: number, val: TEX) => void
    ): void {
        this.pourChaqueIn((i, v, t) => f(i, this.valInVersEx(v)));
    }
    valeurIn(i: number): TIN {
        return MODULE_TABLEAU.valeur(this.in(), i);
    }

    valeur(i: number): TEX {
        return this.valInVersEx(this.valeurIn(i));
    }
    taille(): number {
        return MODULE_TABLEAU.taille(this.in());
    }
    estVide(): boolean {
        return this.taille() === 0;
    }
    ajouterEnFin(x: TIN): void {
        MODULE_TABLEAU.ajouterEnFin(this.in(), x);
    }
    retirerEnFin(): void {
        MODULE_TABLEAU.retirerEnFin(this.in());
    }
}

export function creerTableauVide<TIN, TEX>(valInVersEx: (x: TIN) => TEX) {
    return new Tableau(valInVersEx);
}


/* ***********************************************************************************************
 * Table mutable.
 * On définit un type pour les tables car il est impossible d'avoir un type indexé avec un champ 
 * supplémentaire :
 * { [cle: string]: T }, mutable : Unite
*/
export interface FormatTableIN<T> extends Mutable {
    readonly table: { [cle: string]: T }
}

export interface FormatTableEX<T> {
    readonly table: { readonly [cle: string]: T }
}

// Un module réservoir de fonctions utiles sur les tables.
export class ModuleTable {

    pourChaque<T>(
        f: (cle: string, val: T, tab?: { [cle: string]: T }) => void,
        t: FormatTableEX<T>
    ): void {
        for (let c in t.table) {
            f(c, t.table[c], t.table);
        }
    }


    valeur<T>(t: FormatTableEX<T>, cle: string): T {
        return t.table[cle];
    }
    contient<T>(t: FormatTableEX<T>, cle: string): boolean {
        if (t.table[cle]) {
            return true;
        }
        return false;;
    }
    image<T>(t: FormatTableEX<T>): T[] {
        let tab: T[] = [];
        this.pourChaque((c, v) => {
            tab.push(v);
        }, t);
        return tab;
    }
    domaine<T>(t: FormatTableEX<T>): string[] {
        let tab: string[] = [];
        this.pourChaque((c, v) => {
            tab.push(c);
        }, t);
        return tab;
    }

    taille<T>(t: FormatTableEX<T>): number {
        let n: number = 0;
        this.pourChaque((c, v) => {
            n++;
        }, t);
        return n;
    }

    foncteur<T, S>(t: FormatTableEX<T>, f: (x: T) => S): FormatTableIN<S> {
        let r: { [cle: string]: S }
            = {};
        this.pourChaque((c, v) => {
            r[c] = f(v);
        }, t);
        return { table: r, mutable: Unite.ZERO };
    }

    transformationTableVersTableau<T, S>(t: FormatTableEX<T>, f: (cle: string, x: T) => S): S[] {
        let r: S[] = [];
        this.pourChaque((c, v) => {
            r.push(f(c, v));
        }, t);
        return r;
    }

    selectionCle<T>(t: FormatTableEX<T>): string {
        // sélection d'une clé
        for (let c in t.table) { // une seule itération
            return c;
        }
        throw new Error("[Exception : selectionCle() non défini.]");
    }

    selectionCleSuivantCritere<T>(t: FormatTableEX<T>, prop: (x: T) => boolean): string {
        // sélection d'une clé
        for (let c in t.table) { // une seule itération
            if (prop(t.table[c])) {
                return c;
            }
        }
        throw new Error("[Exception : selectionCleSuivantCritere() non défini.]");
    }


    ajouter<T>(t: FormatTableIN<T>, cle: string, x: T): void {
        t.table[cle] = x;
    }

    retirer<T>(t: FormatTableIN<T>, cle: string): void {
        delete t.table[cle];
    }

}

const MODULE_TABLE = new ModuleTable();

// Conversion pour les tables 
export function conversionFormatTable<TIN, TEX>(conv: (x: TIN) => TEX)
    : (t: FormatTableIN<TIN>) => FormatTableEX<TEX> {
    return (
        (t: FormatTableIN<TIN>) => {
            let r: { [cle: string]: TEX } = {};
            MODULE_TABLE.pourChaque((c, v) => {
                r[c] = conv(v);
            }, t);
            return { table: r };
        });
}
export type EtiquetteTable = 'taille' | 'graphe' | 'domaine' | 'image';

// Table immutable : TIN = TEX (recommandé : immutable)
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
    representation(): string {
        return this.net('graphe');
    }
    pourChaque(
        f: (cle: string, val: TEX, tab?: { [cle: string]: TEX }) => void
    ): void {
        MODULE_TABLE.pourChaque(f, this.in());
    }
    valeur(cle: string): TEX {
        return MODULE_TABLE.valeur(this.in(), cle);
    }
    contient(cle: string): boolean {
        return MODULE_TABLE.contient(this.in(), cle);
    }
    image(): TEX[] {
        return MODULE_TABLE.image(this.in());
    }
    domaine(): string[] {
        return MODULE_TABLE.domaine(this.in());
    }
    taille(): number {
        return MODULE_TABLE.taille(this.in());
    }
    selectionCle(): string {
        return MODULE_TABLE.selectionCle(this.in());
    }
    selectionCleSuivantCritere(prop: (x: TEX) => boolean): string {
        return MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop);
    }

    application<T>(f: (x : TEX) => T) : TableImmutable<T> {
        return new TableImmutable<T>(
            MODULE_TABLE.foncteur(this.in(), f)
        );
    }
}

export function creerTableImmutable<TEX>(t: FormatTableEX<TEX>)
    : TableImmutable<TEX> {
    return new TableImmutable(t);
}

// Table mutable - TIN peut être différent de TEX.
//   Recommandé : TEX immutable.
// Attention : la méthode ex() requiert un parcours de la table formant l'état.
export class Table<TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {

    constructor(protected valInVersEx: (x: TIN) => TEX, etat: FormatTableIN<TIN>) {
        super(conversionFormatTable(valInVersEx), etat);
    }

    net(e: EtiquetteTable): string {
        switch (e) {
            case 'taille': return this.taille().toString();
            case 'domaine': return this.domaine().toString();
            case 'image': return this.image().map((v, i) => JSON.stringify(v)).toString();
            case 'graphe': return this.brut();
        }
        return jamais(e);
    }
    representation(): string {
        return this.net('graphe');
    }
    protected pourChaqueIn(
        f: (cle: string, val: TIN, tab?: { [cle: string]: TIN }) => void
    ): void {
        MODULE_TABLE.pourChaque(f, this.in());
    }
    pourChaque(
        f: (cle: string, val: TEX) => void
    ): void {
        this.pourChaqueIn((c, v, t) => f(c, this.valInVersEx(v)))
        // moins efficace (deux parcours) : MODULE_TABLE.pourChaque(f, this.ex());
    }
    valeurIn(cle: string): TIN {
        return MODULE_TABLE.valeur(this.in(), cle);
    }

    valeur(cle: string): TEX {
        return this.valInVersEx(this.valeurIn(cle));
        // moins efficace : MODULE_TABLE.valeur(this.ex(), cle);
    }
    contient(cle: string): boolean {
        return MODULE_TABLE.contient(this.in(), cle);
    }
    protected imageIn(): TIN[] {
        return MODULE_TABLE.image(this.in());
    }
    image(): TEX[] {
        return MODULE_TABLE.transformationTableVersTableau(this.in(), (c, v) => this.valInVersEx(v));
        // moins efficace : MODULE_TABLE.image(this.ex());
    }
    domaine(): string[] {
        return MODULE_TABLE.domaine(this.in());
    }
    taille(): number {
        return MODULE_TABLE.taille(this.in());
    }
    estVide(): boolean {
        return this.taille() === 0;
    }
    selectionCle(): string {
        return MODULE_TABLE.selectionCle(this.in());
    }
    protected selectionCleSuivantCritereIn(prop: (x: TIN) => boolean): string {
        return MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop);
    }
    selectionCleSuivantCritere(prop: (x: TEX) => boolean): string {
        return this.selectionCleSuivantCritereIn(x => prop(this.valInVersEx(x)));
        // moins efficace : MODULE_TABLE.selectionCleSuivantCritere(this.ex(), prop);
    }
    ajouter(cle: string, x: TIN): void {
        MODULE_TABLE.ajouter(this.in(), cle, x);
    }
    retirer(cle: string): void {
        MODULE_TABLE.retirer(this.in(), cle);
    }
}

export function creerTableVide<TIN, TEX>(valInVersEx: (x: TIN) => TEX) {
    return new Table(valInVersEx, { table: {}, mutable: Unite.ZERO });
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
        return creerIdentifiant(s, id);
    }

}

export function creerIdentificationParCompteur<
    Sorte extends string
    >(prefixe: string)
    : Identification<Sorte> {
    return new IdentificationParCompteur(prefixe);
}

export function creerIdentifiant<Sorte extends string>(
    s: Sorte, cle: string
): Identifiant<Sorte> {
    return {
        val: cle,
        sorte: s
    };
}

/*
* Table utilisant des identificateurs comme clé.
* Remarque : les tables précédentes fondées sur les tables en JSON utilisent nécessdairement le type string pour les clés. 
*/
export class TableIdentification<Sorte extends string, TIN, TEX>
    extends Enveloppe<FormatTableIN<TIN>, FormatTableEX<TEX>, EtiquetteTable> {
    protected sorte: Sorte; // la sorte des clés
    protected valInVersEx: (x: TIN) => TEX;
    constructor(
        sorte: Sorte,
        valInVersEx: (x: TIN) => TEX,
        pop: FormatTableEX<TIN> = { table: {} }) {
        super(conversionFormatTable(valInVersEx), { table: pop.table, mutable: Unite.ZERO });
        this.sorte = sorte;
        this.valInVersEx = valInVersEx;
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
    representation(): string {
        return this.net('graphe');
    }

    protected pourChaqueIn(
        f: (ID_sorte: Identifiant<Sorte>, val: TIN, tab?: { [cle: string]: TIN }) => void
    ): void {
        MODULE_TABLE.pourChaque((id, v, t) => f(creerIdentifiant(this.sorte, id), v, t), this.in());
    }
    pourChaque(
        f: (ID_sorte: Identifiant<Sorte>, val: TEX) => void
    ): void {
        this.pourChaqueIn((c, v, t) => f(c, this.valInVersEx(v)))
        // moins efficace (deux parcours) : MODULE_TABLE.pourChaque(f, this.ex());
    }

    protected valeurIN(ID_sorte: Identifiant<Sorte>): TIN {
        return MODULE_TABLE.valeur(this.in(), ID_sorte.val);
    }

    valeur(ID_sorte: Identifiant<Sorte>): TEX {
        return this.valInVersEx(this.valeurIN(ID_sorte));
    }
    contient(ID_sorte: Identifiant<Sorte>): boolean {
        return MODULE_TABLE.contient(this.in(), ID_sorte.val);
    }
    protected imageIn(): TIN[] {
        return MODULE_TABLE.image(this.in());
    }
    image(): TEX[] {
        return MODULE_TABLE.transformationTableVersTableau(this.in(), (c, v) => this.valInVersEx(v));
        // moins efficace : MODULE_TABLE.image(this.ex());
    }


    domaine(): Identifiant<Sorte>[] {
        return MODULE_TABLE.transformationTableVersTableau(this.in(), (c, v) => creerIdentifiant(this.sorte, c));
        // moins efficace : return MODULE_TABLE.domaine(this.in()).
        //    map((s) => { return { val: s, sorte: this.sorte } });
    }
    selectionCle(): Identifiant<Sorte> {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCle(this.in()), );
    }
    protected selectionCleSuivantCritereIn(prop: (x: TIN) => boolean): Identifiant<Sorte> {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop));
    }

    selectionCleSuivantCritere(prop: (x: TEX) => boolean): Identifiant<Sorte> {
        return this.selectionCleSuivantCritereIn(x => prop(this.valInVersEx(x)));
        // moins efficace : MODULE_TABLE.selectionCleSuivantCritere(this.ex(), prop);
    }

    taille(): number {
        return MODULE_TABLE.taille(this.in());
    }
    estVide(): boolean {
        return this.taille() === 0;
    }


    ajouter(ID_sorte: Identifiant<Sorte>, x: TIN): void {
        MODULE_TABLE.ajouter(this.in(), ID_sorte.val, x);
    }

    retirer(ID_sorte: Identifiant<Sorte>): void {
        MODULE_TABLE.retirer(this.in(), ID_sorte.val);
    }
}
export function creerTableIdentificationVide<
    Sorte extends string, TIN, TEX>(
    sorte: Sorte,
    valInVersEx: (x: TIN) => TEX) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx);
}

export function creerTableIdentification<
    Sorte extends string, TIN, TEX>(
    sorte: Sorte,
    valInVersEx: (x: TIN) => TEX,
    pop: FormatTableEX<TIN>
    ) {
    return new TableIdentification<Sorte, TIN, TEX>(
        sorte, valInVersEx, pop);
}

// Version immutable
export class TableIdentificationImmutable<Sorte extends string, TEX>
    extends Enveloppe<FormatTableEX<TEX>, FormatTableEX<TEX>, EtiquetteTable> {
    protected sorte: Sorte; // la sorte des clés
    constructor(
        sorte: Sorte,
        pop: FormatTableEX<TEX> = { table: {} }) {
        super(conversionFormatTable((x) => x), pop);
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
    representation(): string {
        return this.net('graphe');
    }

    pourChaque(
        f: (ID_sorte: Identifiant<Sorte>, val: TEX, tab?: { [cle: string]: TEX }) => void
    ): void {
        MODULE_TABLE.pourChaque((id, v, t) => f(creerIdentifiant(this.sorte, id), v, t), this.in());
    }

    valeur(ID_sorte: Identifiant<Sorte>): TEX {
        return MODULE_TABLE.valeur(this.in(), ID_sorte.val);
    }

    contient(ID_sorte: Identifiant<Sorte>): boolean {
        return MODULE_TABLE.contient(this.in(), ID_sorte.val);
    }
    image(): TEX[] {
        return MODULE_TABLE.image(this.in());
    }
    domaine(): Identifiant<Sorte>[] {
        return MODULE_TABLE.transformationTableVersTableau(this.in(), (c, v) => creerIdentifiant(this.sorte, c));
    }
    selectionCle(): Identifiant<Sorte> {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCle(this.in()));
    }
    selectionCleSuivantCritere(prop: (x: TEX) => boolean): Identifiant<Sorte> {
        return creerIdentifiant(this.sorte, MODULE_TABLE.selectionCleSuivantCritere(this.in(), prop));
    }

    taille(): number {
        return MODULE_TABLE.taille(this.in());
    }
    estVide(): boolean {
        return this.taille() === 0;
    }

}
export function creerTableIdentificationImmutableVide<
    Sorte extends string, TEX>(sorte: Sorte)
    : TableIdentificationImmutable<Sorte, TEX> {
    return new TableIdentificationImmutable<Sorte, TEX>(sorte);
}

export function creerTableIdentificationImmutable<
    Sorte extends string, TEX>(sorte: Sorte, pop: FormatTableEX<TEX>)
    : TableIdentificationImmutable<Sorte, TEX> {
    return new TableIdentificationImmutable<Sorte, TEX>(sorte, pop);
}

