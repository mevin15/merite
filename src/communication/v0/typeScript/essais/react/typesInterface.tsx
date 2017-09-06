import { Couleur } from "./couleur";

export interface Individu {
  readonly nom : string;
  readonly fond : Couleur;
  readonly encre : Couleur;
}

export interface Message {
  readonly emetteur : Individu;
  readonly destinataire : Individu;
  readonly cachet : string;
  readonly contenu : string
}

