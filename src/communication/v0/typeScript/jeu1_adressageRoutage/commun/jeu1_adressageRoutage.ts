import {
    FormatMessage, Message,
    FormatConfigurationInitiale, Configuration,
    FormatErreurRedhibitoire, ErreurRedhibitoire,
    Sommet, ReseauImmutable, AssemblageReseau,
    NoeudIN, NoeudEX, NoeudImmutable, FormatNoeudEX, FormatNoeudIN, EtiquetteNoeud,
    creerAssemblageReseauEnAnneau
} from "../../bibliotheque/communication";

import {
    Unite, Mutable,
    creerDate, creerDateMaintenant, FormatDateFrEX,
    creerTableImmutable, FormatTableEX, FormatTableIN,
    TableIdentification,
    FormatIdentifiableIN, FormatIdentifiableEX,
    Identification, creerIdentificationParCompteur, Identifiant,
    Enveloppe
} from "../../bibliotheque/types";

import { jamais } from "../../bibliotheque/outils";

import { Mot } from "../../bibliotheque/binaire";

export const hote: string = "merite"; // hôte local via TCP/IP - DNS : cf. /etc/hosts - IP : 127.0.0.1
export const port1 = 3001; // port de la essource 1 (serveur d'applications)
export const port2: number = 1111; // port de la ressouce 2 (serveur de connexions)

// Iditenfiants indéfinis utilisés dans des messages définis partiellement
export const sommetInconnu: Identifiant<'sommet'> = { val: "INCONNU", sorte: 'sommet' };
export const messageInconnu: Identifiant<'message'> = { val: "INCONNU", sorte: 'message' };


// On choisit de ne pas placer la population du domaine dans le sommet pour éviter de
//   découvrir la population des domaines voisins.
export interface FormatSommetJeu1EX extends FormatIdentifiableEX<'sommet'> {
    readonly "domaine": Mot,
}

export type EtiquetteSommetJeu1 = 'ID' | 'domaine';

export class SommetJeu1
    extends Sommet<FormatSommetJeu1EX, FormatSommetJeu1EX, EtiquetteSommetJeu1> {

    constructor(etat: FormatSommetJeu1EX) {
        super((x) => x, etat);
    }

    net(e: EtiquetteSommetJeu1): string {
        let s = this.ex();
        switch (e) {
            case 'domaine': return s.domaine.representation();
            case 'ID': return s.ID.val;
        }
        return jamais(e);
    }
    representation(): string {
        return this.net('domaine') + " (" + this.net('ID') + ")";
    }
}

export function creerSommetJeu1(s: FormatSommetJeu1EX): SommetJeu1 {
    return new SommetJeu1(s);
}

export type FormatNoeudJeu1IN = FormatNoeudIN<FormatSommetJeu1EX>;

export class NoeudJeu1IN extends NoeudIN<FormatSommetJeu1EX>{

    net(e: EtiquetteNoeud): string {
        let s = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(s.centre).representation();
            case 'voisins': return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudJeu1IN(n: FormatNoeudJeu1IN) {
    return new NoeudJeu1IN(n);
}

export type FormatNoeudJeu1EX = FormatNoeudEX<FormatSommetJeu1EX>;
export type NoudJeu1Immutable = NoeudImmutable<FormatSommetJeu1EX>;

export class NoeudJeu1EX extends NoeudEX<FormatSommetJeu1EX>{

    net(e: EtiquetteNoeud): string {
        let s = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(s.centre).representation();
            case 'voisins': return creerTableImmutable(s.voisins).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "(centre : " + this.net('centre') + " ; voisins : " + this.net('voisins') + ")";
    }
}

export function creerNoeudJeu1EX(n: FormatNoeudJeu1EX) {
    return new NoeudJeu1EX(n);
}

export type ReseauJeu1 = ReseauImmutable<FormatSommetJeu1EX>;

export type AssemblageReseauJeu1
    = AssemblageReseau<FormatSommetJeu1EX>;

/*
Protocole
Client | Serveur
1. Produire un message INIT | .
2. Transmettre un message INIT pour TRANSIT | Identifier le message en TRANSIT.
3. Transmettre un message TRANSIT pour TRANSIT | Accuser réception en TRANSIT (SUCCES ou ECHEC).
4. Ignorer un message en TRANSIT (IGNOR) | .  
5. Consulter un message en TRANSIT (FIN) | Accuser réception du message FIN (SUCCES ou ECHEC).
*/

export enum AR {
    SUCCES,
    ECHEC
}

export enum TypeMessageJeu1 {
    INIT,
    TRANSIT,
    IGNOR,
    FIN,
    SUCCES_TRANSIT,
    ECHEC_TRANSIT,
    SUCCES_FIN,
    ECHEC_FIN,
    ERREUR_CONNEXION, // TODO
    ERREUR_EMET,
    ERREUR_DEST,
    ERREUR_TYPE,
    INTERDICTION
}



export interface FormatMessageJeu1EX
    extends FormatMessage, FormatIdentifiableEX<'message'> {
    readonly "ID_origine": Identifiant<'sommet'>,
    readonly "ID_destination": Identifiant<'sommet'>,
    readonly "type": TypeMessageJeu1,
    readonly "contenu": Mot,
    readonly "date": FormatDateFrEX // Emission
}

export type EtiquetteMessageJeu1 = 'ID' | 'type' | 'date' | 'ID_de' | 'ID_à' | 'contenu';

// Structure immutable
export class MessageJeu1 extends
    Message<FormatMessageJeu1EX, FormatMessageJeu1EX, EtiquetteMessageJeu1> {

    constructor(etat: FormatMessageJeu1EX) {
        super((x) => x, etat);
    }

    net(e: EtiquetteMessageJeu1): string {
        let msg = this.ex();
        switch (e) {
            case 'ID': return msg.ID.val;
            case 'type': return TypeMessageJeu1[msg.type];
            case 'date': return creerDate(msg.date).representation();
            case 'ID_de': return msg.ID_origine.val;
            case 'ID_à': return msg.ID_destination.val;
            case 'contenu': return msg.contenu.representation();
        }
        return jamais(e);
    }

    representation(): string {
        let idm = this.net('ID');
        let dem = this.net('ID_de');
        let am = this.net('ID_à');
        let typem = this.net('type');
        let datem = this.net('date');
        let cm = this.net('contenu');
        return idm + " - " + datem + ", de " + dem + " à " + am + " (" + typem + ") - " + cm;
    }


    // 2. Client : Transmettre un message INIT pour TRANSIT.
    // 3. Client : Transmettre un message TRANSIT pour TRANSIT.
    avecAdresses(ID_origine: string, ID_destination: string): MessageJeu1 {
        let msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": { val: ID_origine, sorte: 'sommet' },
            "ID_destination": { val: ID_destination, sorte: 'sommet' },
            "type": msg.type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    // 2. Serveur : Identifier le message en TRANSIT.
    enTransit(): MessageJeu1 {
        let msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.TRANSIT,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    // 3. Serveur : Accuser réception en TRANSIT (SUCCES ou ECHEC).
    transitAvecAccuseReception(statut: AR): MessageJeu1 {
        let msg = this.ex();
        let type: TypeMessageJeu1;
        switch (statut) {
            case AR.SUCCES: type = TypeMessageJeu1.SUCCES_TRANSIT; break;
            case AR.ECHEC: type = TypeMessageJeu1.ECHEC_TRANSIT; break;
            default: return jamais(statut);
        }
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    // 4. Client : Ignorer un message en TRANSIT (IGNOR).
    aIgnorer(): MessageJeu1 {
        let msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.IGNOR,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    // 5. Client : Consulter un message en TRANSIT (FIN).
    aConsulter(): MessageJeu1 {
        let msg = this.ex();
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": TypeMessageJeu1.FIN,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }

    // 5. Serveur : Accuser réception en FIN (SUCCES ou ECHEC).
    aConsulterAvecAccuseReception(statut: AR): MessageJeu1 {
        let msg = this.ex();
        let type: TypeMessageJeu1;
        switch (statut) {
            case AR.SUCCES: type = TypeMessageJeu1.SUCCES_FIN; break;
            case AR.ECHEC: type = TypeMessageJeu1.ECHEC_FIN; break;
            default: return jamais(statut);
        }
        return new MessageJeu1({
            "ID": msg.ID,
            "ID_origine": msg.ID_origine,
            "ID_destination": msg.ID_destination,
            "type": type,
            "contenu": msg.contenu,
            "date": msg.date
        });
    }
}

// 1. Client : Produire un message INIT.
export function creerMessageInitial(contenu: Mot) {
    return new MessageJeu1({
        "ID": messageInconnu,
        "ID_origine": sommetInconnu,
        "ID_destination": sommetInconnu,
        "type": TypeMessageJeu1.INIT,
        "contenu": contenu,
        "date": creerDateMaintenant().ex()
    });
}

/* TODO gestion des erreurs


export function creerMessageErreurConnexion(emetteur: string, messageErreur: string): MessageJeu1 {
    return new MessageJeu1({
        "emetteur": emetteur,
        "destinataire": emetteur,
        "type": TypeMessageJeu1.ERREUR_CONNEXION,
        "contenu": messageErreur,
        "date": new Date()
    });
}

export function creerMessageCommunication(emetteur: string, destinataire: string, texte: string): MessageJeu1 {
    return new MessageJeu1({
        "emetteur": emetteur,
        "destinataire": destinataire,
        "type": TypeMessageJeu1.COM,
        "contenu": texte,
        "date": new Date()
    });
}

export function creerMessageRetourErreur(original: MessageJeu1, codeErreur: TypeMessageJeu1, messageErreur: string): MessageJeu1 {
    return new MessageJeu1({
        "emetteur": original.enJSON().emetteur,
        "destinataire": original.enJSON().destinataire,
        "type": codeErreur,
        "contenu": messageErreur,
        "date": original.enJSON().date
    });
}
*/

/*
Exemple de description d'une configuration - TODO approximative
- noeud de centre : {"id":"id-1","domaine":[BLANC, NOIR, BLANC], "population" : { "nombre":4, utilisateurs : {"titi" : ...}}}
- noeud de voisins : {"id-2":{"id":"id-2","domaine":[NOIR, NOIR, BLANC]},"id-0":{"id":"id-0","domaine":[BLANC, NOIR, NOIR]}}

*/

export interface FormatUtilisateurEX extends FormatIdentifiableEX<'utilisateur'> {
    readonly "pseudo": Mot, // TODO ajouter d'autres caractéristiques
}

export type EtiquetteUtilisateur = 'ID' | 'nom';

export class Utilisateur extends
    Enveloppe<FormatUtilisateurEX, FormatUtilisateurEX, EtiquetteUtilisateur> {

    constructor(u: FormatUtilisateurEX) {
        super((x) => x, u);
    }

    net(e: EtiquetteUtilisateur): string {
        let u = this.ex();
        switch (e) {
            case 'ID': return u.ID.val;
            case 'nom': return u.pseudo.representation();
        }
        return jamais(e);
    }

    representation(): string {
        return this.net('nom') + " (" + this.net('ID') + ")";
    }

}

export function creerUtilisateur(u: FormatUtilisateurEX): Utilisateur {
    return new Utilisateur(u);
}

export type FormatPopulationLocaleIN = FormatTableIN<FormatUtilisateurEX>; // inutile
export type FormatPopulationLocaleEX = FormatTableEX<FormatUtilisateurEX>;

// inutile export type EtiquettePopulationLocale = 'effectif' | 'utilisateurs';

export class PopulationLocale
    extends TableIdentification<'utilisateur',
    FormatUtilisateurEX, FormatUtilisateurEX> {
    constructor(pop: FormatPopulationLocaleEX) {
        super('utilisateur', (x) => x, pop);
    }
    pourChaque(
        f: (ID_util: Identifiant<'utilisateur'>, val: FormatUtilisateurEX) => void
    ): void {
        this.pourChaque(f);
    }
}

export function creerPopulationLocaleVide(): PopulationLocale {
    return new PopulationLocale({ table: {} });
}
export function creerPopulationLocale(pop: FormatPopulationLocaleEX)
    : PopulationLocale {
    return new PopulationLocale(pop);
}


export function peuplerPopulationLocale(
    prefixe: string, noms: Mot[]): PopulationLocale {
    let identification: Identification<'utilisateur'>
        = creerIdentificationParCompteur(prefixe);
    let pop = creerPopulationLocaleVide();
    noms.forEach((nom: Mot, i: number, tab: Mot[]) => {
        let u: FormatUtilisateurEX
            = { ID: identification.identifier('utilisateur'), pseudo: tab[i] };
        pop.ajouter(u.ID, u);
    });
    return pop;
}


/* inutile
export interface FormatConfigurationJeu1IN
    extends FormatConfigurationInitiale {
    readonly "centre": FormatSommetJeu1EX,
    readonly "population": FormatPopulationLocaleIN,
    readonly "utilisateur": FormatUtilisateurEX,
    readonly "voisins": FormatTableIN<FormatSommetJeu1EX>,
    readonly "date": Date
}
*/

export interface FormatConfigurationJeu1EX
    extends FormatConfigurationInitiale {
    readonly "centre": FormatSommetJeu1EX,
    readonly "population": FormatPopulationLocaleEX,
    readonly "utilisateur": FormatUtilisateurEX,
    readonly "voisins": FormatTableEX<FormatSommetJeu1EX>,
    readonly "date": FormatDateFrEX
}

export type EtiquetteConfigurationJeu1 = 'centre' | 'population' | 'utilisateur' | 'voisins' | 'date';

export class ConfigurationJeu1
    extends Configuration<
    FormatConfigurationJeu1EX, FormatConfigurationJeu1EX,
    EtiquetteConfigurationJeu1> {

    constructor(c: FormatConfigurationJeu1EX) {
        super((x) => x, c);
    }

    net(e: EtiquetteConfigurationJeu1): string {
        let config = this.ex();
        switch (e) {
            case 'centre': return creerSommetJeu1(config.centre).representation();
            case 'population':
                return creerTableImmutable(config.population).representation();
            case 'utilisateur': return creerUtilisateur(config.utilisateur).representation();
            case 'voisins': return creerTableImmutable(config.voisins).representation();
            case 'date': return creerDate(config.date).representation();
        }
        return jamais(e);
    }

    representation(): string {
        let c = this.net('centre');
        let pop = this.net('population');
        let util = this.net('utilisateur');
        let v = this.net('voisins');
        let d = this.net('date');
        return "(centre : " + c
            + " ; population : " + pop
            + " ; utilisateur : " + util
            + " ; voisins : " + v
            + " ; crée le : " + d + ")";
    }
}

export function creerConfigurationJeu1(c: FormatConfigurationJeu1EX) {
    return new ConfigurationJeu1(c);
}


export function composerConfigurationJeu1(
    n: FormatNoeudJeu1EX,
    pop: FormatPopulationLocaleEX,
    u: FormatUtilisateurEX,
    date: FormatDateFrEX): ConfigurationJeu1 {
    return new ConfigurationJeu1({
        "configurationInitiale": Unite.ZERO,
        "centre": n.centre,
        "population": pop,
        "utilisateur": u,
        "voisins": n.voisins,
        "date": date
    });
}

export function decomposerConfiguration(c: ConfigurationJeu1)
    : [FormatNoeudJeu1EX, FormatPopulationLocaleEX, FormatUtilisateurEX] {
    let config = c.ex();
    let centre: FormatSommetJeu1EX = config.centre;
    let voisins = config.voisins;
    let n: FormatNoeudJeu1EX = { "centre": centre, "voisins": voisins };
    let pop = config.population;
    let u = config.utilisateur;
    return [n, pop, u];
}

export interface FormatErreurJeu1EX extends FormatErreurRedhibitoire {
    readonly "messageErreur": string,
    readonly "date": FormatDateFrEX
}

export type EtiquetteErreurJeu1 = 'messageErreur' | 'date';

export class ErreurJeu1
    extends ErreurRedhibitoire<
    FormatErreurJeu1EX, FormatErreurJeu1EX, EtiquetteErreurJeu1
    > {

    constructor(err: FormatErreurJeu1EX) {
        super((x) => x, err);
    }

    net(e: EtiquetteErreurJeu1): string {
        let erreur = this.ex();
        switch (e) {
            case 'messageErreur': return erreur.messageErreur;
            case 'date': return creerDate(erreur.date).representation();
        }
        return jamais(e);
    }
    representation(): string {
        return "[" + this.net('date') + " : " + this.net('messageErreur') + "]";
    }
}

export function creerErreurJeu1(err: FormatErreurJeu1EX): ErreurJeu1 {
    return new ErreurJeu1(err);
}


export function composerErreurJeu1(msg: string, date: FormatDateFrEX): ErreurJeu1 {
    return new ErreurJeu1({
        "erreurRedhibitoire": Unite.ZERO,
        "messageErreur": msg,
        "date": date
    });
}

export function creerAnneauJeu1(domaines: Mot[]): ReseauJeu1 {
    let assembleur: AssemblageReseauJeu1
        = creerAssemblageReseauEnAnneau(domaines.length, creerNoeudJeu1IN);
    let identification: Identification<'sommet'>
        = creerIdentificationParCompteur("DOM-");
    domaines.forEach((dom: Mot, i: number, tab: Mot[]) => {
        let s: FormatSommetJeu1EX
            = { ID: identification.identifier('sommet'), domaine: tab[i] };
        assembleur.ajouterSommet(s);
    });
    return assembleur.assembler();
}

class TableUtilisateurs
    extends TableIdentification<'utilisateur',
    FormatUtilisateurEX, FormatUtilisateurEX> {
    constructor() {
        super('utilisateur', (x) => x);
    }
}

export class PopulationParDomaine
    extends TableIdentification<'sommet',
    TableUtilisateurs,
    FormatPopulationLocaleEX
    > {

    constructor() {
        super('sommet', (t: TableUtilisateurs) => t.ex());
    }

    contientUtilisateur(ID_dom: Identifiant<'sommet'>, ID_util: Identifiant<'utilisateur'>): boolean {
        if (!this.contient(ID_dom)) {
            return false;
        }
        return this.valeurIN(ID_dom).contient(ID_util);
    }

    utilisateur(ID_dom: Identifiant<'sommet'>, ID_util: Identifiant<'utilisateur'>): FormatUtilisateurEX {
        return this.valeurIN(ID_dom).valeur(ID_util);
    }


    ajouterDomaine(ID_dom: Identifiant<'sommet'>) {
        this.ajouter(ID_dom, new TableUtilisateurs());
    }

    ajouterUtilisateur(ID_dom: Identifiant<'sommet'>, u: FormatUtilisateurEX) {
        this.valeurIN(ID_dom).ajouter(u.ID, u);
    }

    retirerUtilisateur(ID_dom: Identifiant<'sommet'>, ID_util: Identifiant<'utilisateur'>) {
        this.valeurIN(ID_dom).retirer(ID_util);
    }

    selectionnerUtilisateur(): [Identifiant<'sommet'>, Identifiant<'utilisateur'>] {
        let ID_dom = this.selectionCleSuivantCritereIn(pop => !pop.estVide());
        let ID_util = this.valeurIN(ID_dom).selectionCle();
        return [ID_dom, ID_util];
    }

}

export function creerVidePopulationParDomaine() {
    return new PopulationParDomaine();
}

export function assemblerPopulationParDomaine(
    reseau: ReseauJeu1, noms: Mot[]): PopulationParDomaine {
    let popDom = creerVidePopulationParDomaine();
    reseau.pourChaqueNoeud((ID_dom, n) => {
        popDom.ajouterDomaine(ID_dom);
        let popLoc = peuplerPopulationLocale("UTIL-" + ID_dom.val + "-", noms);
        popLoc.pourChaque((ID_util, u) => {
            popDom.ajouterUtilisateur(ID_dom, u);
        })
    });
    return popDom;
}



