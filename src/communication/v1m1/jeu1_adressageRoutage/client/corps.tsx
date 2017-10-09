import * as React from "react";

import styled from "styled-components";


import {
  Couleur, COUPLE_FOND_ENCRE_SUJET, COUPLE_FOND_ENCRE_TOUS, COUPLE_FOND_ENCRE_INCONNU,
  SuiteCouplesFondEncre, FOND, CADRE, SEPARATION_CADRE, TEXTE_ERREUR
} from "./couleur";

import {
  Identification, creerIdentificationParCompteur,
  TableIdentificationImmutable, creerTableIdentificationImmutable,
  creerTableImmutable, Identifiant, creerIdentifiant,
  FormatDateFr, creerDateEnveloppe, DateImmutable
} from "../../bibliotheque/types";

import {
} from "../../bibliotheque/communication";

import { CanalClient, creerCanalClient } from "../../bibliotheque/client";

import {
  hote, port2,
  FormatErreurJeu1, creerErreurJeu1, 
  FormatMessageJeu1, EtiquetteMessageJeu1,
  FormatConfigurationJeu1, ConfigurationJeu1, creerConfigurationJeu1
} from '../commun/jeu1_adressageRoutage';

type CanalTchat
  = CanalClient<
  FormatErreurJeu1,
  FormatConfigurationJeu1,
  FormatMessageJeu1, FormatMessageJeu1, EtiquetteMessageJeu1>;

interface ProprietesCorps {
  // see https://github.com/Microsoft/TypeScript/issues/8588
  className?: string;
}

enum EtatInterfaceJeu1 {
  INITIAL,
  NORMAL,
  ERRONE
};

/*
  Etat contenant 
  - les attributs susceptibles d'être modifiés par des sous-composants,
  - un indicateur de l'état de l'interface, chaque valeur étant associée
    à des attributs du composant, modifiés uniquement en interne 
*/
interface EtatCorps {
  etatInterface: EtatInterfaceJeu1;
}

const ID_TOUS: string = "TOUS";
const ID_INCONNU: string = "?";

/*
 * Degré du graphe limité à 4 - Cf. la liste des couples de couleurs.
 */
class CorpsBrut extends React.Component<ProprietesCorps, EtatCorps> {

  private adresseServeur: string;
  private canal: CanalTchat;
  private config: ConfigurationJeu1;

  private messageErreur: string;

  constructor(props: ProprietesCorps) {
    super(props);
    this.adresseServeur = hote + ":" + port2;

    this.messageErreur = "Aucune erreur";

    this.state = {
      etatInterface: EtatInterfaceJeu1.INITIAL,
    };

  }

  render(): JSX.Element {
    switch (this.state.etatInterface) {
      case EtatInterfaceJeu1.NORMAL:
        return (
          <div className={this.props.className}>
            <h1>Configuration terminée</h1>
            {this.config.brut()}
            <br/>
            {this.config.representation()}
          </div>
        );
      case EtatInterfaceJeu1.INITIAL:
        return (
          <h1>Connexion au serveur pour l'initialisation</h1>
        );
      case EtatInterfaceJeu1.ERRONE:
        return (
          <div>
            <h1>Fin de l'application après l'erreur suivante : </h1>
            <div style={{ color: TEXTE_ERREUR }}>
              {this.messageErreur}
            </div>
          </div>
        );
    }
  }

  componentDidMount(): void {
    console.log("* Initialisation après montage du corps");

    console.log("- du canal de communication avec le serveur d'adresse " + this.adresseServeur);
    this.canal = creerCanalClient(this.adresseServeur);

    console.log("- du traitement des messages");
    this.canal.enregistrerTraitementMessageRecu((m: FormatMessageJeu1) => {
        // TODO
    });

    console.log("- du traitement de la configuration");
    this.canal.enregistrerTraitementConfigurationRecue((c: FormatConfigurationJeu1) => {
      this.config = creerConfigurationJeu1(c);
      console.log("* Réception");
      console.log("- de la configuration brute : " + this.config.brut());
      console.log("- de la configuration nette : " + this.config.representation());
      this.setState({
        etatInterface: EtatInterfaceJeu1.NORMAL
      });

    });

    console.log("- du traitement d'une erreur rédhibitoire");
    this.canal.enregistrerTraitementErreurRecue((err: FormatErreurJeu1) => {
      let erreur = creerErreurJeu1(err);
      console.log("* Réception");
      console.log("- de l'erreur rédhibitoire brute : " + erreur.brut());
      console.log("- de l'erreur rédhibitoire nette : " + erreur.representation());
      console.log("* Affichage de l'erreur");
      this.messageErreur = erreur.representation();
      this.setState({
        etatInterface: EtatInterfaceJeu1.ERRONE,
      });
    });

  }

}

export const Corps = styled(CorpsBrut) `
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${FOND}
`;
