import { Couleur } from "./couleur";
import { Identifiant } from "../../bibliotheque/types";
export interface Individu {
  readonly id: Identifiant<'sommet'>;
  readonly nom: string;
  readonly fond: Couleur;
  readonly encre: Couleur;
}

export interface Message {
  readonly emetteur: Individu;
  readonly destinataire: Individu;
  readonly cachet: string;
  readonly contenu: string
}

