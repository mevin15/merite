import { Couleur } from "./couleur";
import { Identifiant } from "../../bibliotheque/types";

export interface Individu {
  readonly ID: Identifiant<'sommet'>;
  readonly nom: string;
  readonly fond: Couleur;
  readonly encre: Couleur;
}

export interface Message {
  readonly ID: Identifiant<'message'>;
  readonly emetteur: Individu;
  readonly destinataire: Individu;
  readonly cachet: string;
  readonly contenu: string;
  readonly accuses: Couleur[]; // Couleurs des individus destinataires
}

