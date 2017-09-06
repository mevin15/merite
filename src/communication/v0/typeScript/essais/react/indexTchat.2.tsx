import * as React from "react";
import * as ReactDOM from "react-dom";

import Scrollbars from "react-custom-scrollbars";
import TextareaAutosize from 'react-textarea-autosize';

/*import { Corps } from "./Corps";*/

import styled from "styled-components";
import { injectGlobal } from "styled-components";

injectGlobal`
    * { 
        margin: 0; 
        padding: 0; 
        box-sizing: border-box;
        font-family: Verdana, Geneva, sans serif;
    }
`;

const styleTexteBrut = {
    alignSelf: "flex-end",
    flex: "auto",
    resize: "vertical",
    overflow: "auto",
    margin: "1ex",
    background: "rgb(17, 17, 17)",
    color: "rgb(255, 255, 255)"
};

/*class Ascenseur extends React.Component<{children: any, style: { [cle: string] : any}}> {
  render() {
    return (
      <Scrollbars
        renderTrackHorizontal={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: 'rgb(0,149,182)' }}/>
        }>
        {this.props.children}
      </Scrollbars>
    );
  }
}*/


const Corps = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgb(229, 229, 229);
`;

const Admin = styled.div`
    background: rgb(170, 170, 170);
    position: fixed;
    top: 0;
    left: 0;
`;

const ApresAdmin = styled.div`
    background: rgb(255, 255, 255);
    position: fixed;
    top: 0;
    left: 24vw;
    width: calc(1vw);
    height: calc(100vh);
    border-style: solid;
    border-width: 0 0.33vw;
    border-top-color: rgb(200, 200, 200);
    border-right-color: rgb(201, 201, 201);
    border-bottom-color: rgb(200, 200, 200);
    border-left-color: rgb(201, 201, 201);
`;

const Action = styled.div`
    background: rgb(170, 170, 170);
    position: fixed;
    top: 0;
    right: 1vw;
    width: 74vw;
    background: rgb(229, 229, 229);
`;

const ApresAction = styled.div`
    background: rgb(255, 255, 255);
    position: fixed;
    top: 0;
    right: 0;
    width: 1vw;
    height: 100vh;
    border-style: solid;
    border-width: 0 0.33vw;
    border-top-color: rgb(200, 200, 200);
    border-right-color: rgb(201, 201, 201);
    border-bottom-color: rgb(200, 200, 200);
    border-left-color: rgb(201, 201, 201);
`;

const ContainerAdmin = styled.div`
    background: rgb(229, 229, 229);
    position: absolute;
    top: 0;
    left: 0;
    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le dépassement */
    min-width: calc(24vw);
    min-height: calc(100vh);
    /* occupe au moins la place du container */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
`;

const SujetAdmin = styled.div`
    background: rgb(229, 229, 229);
    flex: auto;
    align-self: center;
    min-width: calc(24vw);

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

const SujetAdminContainer = styled.div`
    flex: auto;
    margin: 0;
    background: rgb(82, 179, 217);
    height: 7ex;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;    
`;

const Separateur = styled.div`
        margin: 0 0 0 1em;
`;

const Retour = styled.div`
    flex: none;
    width: 4ex;
    height: 4ex;
`;

function pastille(r: number, g: number, b: number) {
    return styled.div`
        flex: none;
        width: 4ex;
        height: 4ex;
        border-radius: 100%;
        background-color: rgb(${r}, ${g}, ${b});
    `;
}

const PastilleRouge = pastille(255, 0, 0);

const PastilleJaune = pastille(225, 225, 0);

const PastilleViolette = pastille(128, 0, 128);

const PastilleBleueCanard = pastille(0, 128, 128);

const PastilleVerte = pastille(0, 225, 0);

const PastilleGrise = pastille(100, 100, 100);

const Pseudo = styled.div`
    flex: initial;
    background: rgb(82, 179, 217);
    color: rgb(255, 255, 255);
    text-align: center;
    padding: 1ex;
    height: 4ex;
    width: 10ex;
    font-size: x-large;
`;

const ObjetAdmin = styled.div`
    flex: initial;
    background: rgb(82, 179, 217);
    border-radius: 1ex;
    padding: 1ex 1ex 1ex 1ex;
    margin: 1em 0 1em 0;
    max-width: 20vw;
    width: 12em;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
`;

const ContainerAction = styled.div`
    background: rgb(229, 229, 229);
    position: absolute;
    top: 0;
    left: 0;
    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le dépassement */
    min-width: calc(74vw);
    min-height: calc(100vh);
    /* occupe au moins la place du container */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const ContainerEmission = styled.div`
    flex: initial;
    background: rgb(256, 256, 256);
    box-shadow: 10px 10px 5px rgb(170, 170, 170);
    border-radius: 1ex;
    margin: 1ex 1ex 1ex 1em;
    align-self: flex-start;
    /* Contrainte : marge plus grande que la largeur des ascenseurs. */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 80ex;
    max-width: calc(50vw);
`;

const ContainerReception = styled.div`
    flex: initial;
    background: rgb(256, 256, 256);
    box-shadow: -10px 10px 5px rgb(170, 170, 170);
    border-radius: 1ex; 
    margin: 1ex 1em 1ex 1ex;
    align-self: flex-end;
    /* Contrainte : marge plus grande que la largeur des ascenseurs. */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    min-width: 80ex;
    max-width: calc(50vw);
`;

enum CouleurEncre {
    BLANC,
    NOIR
}

function interlocuteur(r: number, g: number, b: number, c: CouleurEncre) {
    const couleur = (c === CouleurEncre.BLANC) ?
        "rgb(255, 255, 255)" :
        "rgb(0, 0, 0)";
    return styled.div`
        flex: none;
        background-color: rgb(${r}, ${g}, ${b});
        text-align: center;
        padding: 1ex;
        height: 4ex;
        width: 18ex;
        margin: 1ex;
        border-radius: 1ex;
    `;
}

const InterlocuteurRouge = interlocuteur(255, 0, 0, CouleurEncre.BLANC);

const InterlocuteurJaune = interlocuteur(225, 225, 0, CouleurEncre.NOIR);

const InterlocuteurViolet = interlocuteur(128, 0, 128, CouleurEncre.BLANC);

const InterlocuteurBleuCanard = interlocuteur(0, 128, 128, CouleurEncre.BLANC);

const InterlocuteurVert = interlocuteur(0, 225, 0, CouleurEncre.NOIR);

const InterlocuteurGris = interlocuteur(100, 100, 100, CouleurEncre.BLANC);

const MessageFixe = styled.div`
    flex: auto;
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    text-align: justify;
    padding: 1ex;
    min-height: 8ex;
    min-width: 24ex;
    max-width: 72ex;
    margin: 1ex;
`;

const Cachet = styled.div`
    font-size: x-small;
    color: rgb(50, 50, 50);
    text-align: right;
`;

function tresLongTexte(): string {
    let r: string = "";
    for (let i = 0; i < 1000; i++) {
        r = r + i.toString() + ' a ';
    }
    return r;
}

ReactDOM.render(
    <Corps>
        <Admin>
            <Scrollbars style={{ width: "24vw", height: "100vh" }}>
                <ContainerAdmin>
                    <SujetAdmin>
                        <SujetAdminContainer>
                            <Separateur />
                            <Retour>
                                <img src="chevronGauche.svg" />
                            </Retour>
                            <Separateur />
                            <Separateur />
                            <PastilleRouge />
                            <Pseudo>
                                {"Momo"}
                            </Pseudo>
                        </SujetAdminContainer>
                    </SujetAdmin>
                    {"Choisissez un destinataire :"}
                    <ObjetAdmin>
                        <PastilleJaune />
                        <Pseudo>{"Zaza"}</Pseudo>
                    </ObjetAdmin>
                    <ObjetAdmin>
                        <PastilleViolette />
                        <Pseudo>{"Toto"}</Pseudo>
                    </ObjetAdmin>
                    <ObjetAdmin>
                        <PastilleBleueCanard />
                        <Pseudo>{"Titi"}</Pseudo>
                    </ObjetAdmin>
                    <ObjetAdmin>
                        <PastilleVerte />
                        <Pseudo>{"Sissi"}</Pseudo>
                    </ObjetAdmin>
                    {"ou tous les destinataires :"}
                    <ObjetAdmin>
                        <PastilleGrise />
                        <Pseudo>{"tous"}</Pseudo>
                    </ObjetAdmin>
                </ContainerAdmin>
            </Scrollbars>
        </Admin>
        <ApresAdmin />
        <Action>
            <Scrollbars style={{ width: "74vw", height: "100vh" }}>
                <ContainerAction>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>

                        <MessageFixe>
                            {"coucou zaza. Cette ligne est très longue et mérite d'être étendue vers la droite. Cela se fait automatiquement."}
                            <br />
                            {"A bientôt."}
                            <br />
                            {"momo."}
                            <Cachet>{"12:43"}</Cachet>
                        </MessageFixe>

                        <InterlocuteurJaune>
                            {"A : zaza"}
                        </InterlocuteurJaune>
                    </ContainerEmission>

                    <ContainerReception>
                        <InterlocuteurJaune>
                            {"De : zaza"}
                        </InterlocuteurJaune>
                        <MessageFixe>
                            {"Effectivement, cette ligne est très longue et mérite d'être étendue vers la droite."}
                            <br />
                            {" A bientôt."}
                            <br />
                            {"A+"}
                            <Cachet>12:47</Cachet>
                        </MessageFixe>
                        <InterlocuteurRouge>
                            {"A : momo"}
                        </InterlocuteurRouge>
                    </ContainerReception>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>

                        <MessageFixe>
                            {"coucou sissi. Ligne courte sans extension."}
                            <br />
                            {"A bientôt."}
                            <br />
                            {"A+"}
                            <Cachet>12:49</Cachet>
                        </MessageFixe>

                        <InterlocuteurVert>
                            {"A : sissi"}
                        </InterlocuteurVert>

                    </ContainerEmission>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>
                        <MessageFixe>
                            {"coucou toto. On peut écrire un long texte avec extension et passage à la ligne automatique. Pour forcer la passage à la ligne, on utilise la balise br."}
                            <br />
                            {"A bientôt."}
                            <Cachet>12:56</Cachet>
                        </MessageFixe>
                        <InterlocuteurViolet>
                            {"A : toto"}
                        </InterlocuteurViolet>
                    </ContainerEmission>

                    <ContainerReception>
                        <InterlocuteurViolet>
                            {"De : toto"}
                        </InterlocuteurViolet>
                        <MessageFixe>
                            {"coucou momo."}
                            <br />
                            {"Messages envoyés : à gauche."}
                            <br />
                            {"Messages reçus : à droite."}
                            <br />
                            {"Les couleurs permettent de distinguer les différents interlocuteurs."}
                            <Cachet>13:09</Cachet>
                        </MessageFixe>
                        <InterlocuteurRouge>
                            {"A : momo"}
                        </InterlocuteurRouge>
                    </ContainerReception>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>

                        <MessageFixe>
                            {"coucou toto. La longueur des lignes est ajustée automtiquement entre une valeur min et une max."}
                            <br />
                            {"A bientôt."}
                            <br />
                            {"A+"}
                            <Cachet>12:49</Cachet>
                        </MessageFixe>
                        <InterlocuteurViolet>
                            {"A : toto"}
                        </InterlocuteurViolet>
                    </ContainerEmission>
                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>
                        <MessageFixe>
                            {"coucou titi. C'est une pastille rouge que j'utilise."}
                            <br />
                            {"La tienne est une sorte de bleu canard."}
                            <br />
                            {"Le temps augmente vers le bas : les messages les plus récents sont en bas, les plus anciens en haut."}
                            {"Lorsque la pile des messages émis et reçus grandit, elle s'étend vers le haut ; quand elle dépasse les limites de sa fenêtre, un ascenseur apparaît à droite, pour permettre le défilement."}
                            <Cachet>14:47</Cachet>
                        </MessageFixe>
                        <InterlocuteurBleuCanard>
                            {"A : titi"}
                        </InterlocuteurBleuCanard>
                    </ContainerEmission>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>
                        <MessageFixe>
                            {"Fin"}
                            <br />
                            {"A bientôt."}
                            <br />
                            {"momo."}
                            <Cachet>18:45</Cachet>
                        </MessageFixe>
                        <InterlocuteurVert>
                            {"A : sissi"}
                        </InterlocuteurVert>
                    </ContainerEmission>

                    <ContainerEmission>
                        <InterlocuteurRouge>
                            {"De : momo"}
                        </InterlocuteurRouge>

                        <TextareaAutosize
                            placeholder={"Entrez le texte de votre message."}
                            minRows={3} cols={48}
                            style={styleTexteBrut as any}>
                        </TextareaAutosize>

                        <InterlocuteurVert>
                            {"A : sissi"}
                        </InterlocuteurVert>
                    </ContainerEmission>

                </ContainerAction>
            </Scrollbars>

        </Action>
        <ApresAction />
    </Corps>,
    document.getElementById("conteneur")
);

