"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_custom_scrollbars_1 = require("react-custom-scrollbars");
var react_textarea_autosize_1 = require("react-textarea-autosize");
/*import { Corps } from "./Corps";*/
var styled_components_1 = require("styled-components");
var styled_components_2 = require("styled-components");
(_a = ["\n    * { \n        margin: 0; \n        padding: 0; \n        box-sizing: border-box;\n        font-family: Verdana, Geneva, sans serif;\n    }\n"], _a.raw = ["\n    * { \n        margin: 0; \n        padding: 0; \n        box-sizing: border-box;\n        font-family: Verdana, Geneva, sans serif;\n    }\n"], styled_components_2.injectGlobal(_a));
var styleTexteBrut = {
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
var Corps = (_b = ["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgb(229, 229, 229);\n"], _b.raw = ["\n    width: 100vw;\n    height: 100vh;\n    position: fixed;\n    top: 0;\n    left: 0;\n    background: rgb(229, 229, 229);\n"], styled_components_1.default.div(_b));
var Admin = (_c = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    left: 0;\n"], _c.raw = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    left: 0;\n"], styled_components_1.default.div(_c));
var ApresAdmin = (_d = ["\n    background: rgb(255, 255, 255);\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: rgb(200, 200, 200);\n    border-right-color: rgb(201, 201, 201);\n    border-bottom-color: rgb(200, 200, 200);\n    border-left-color: rgb(201, 201, 201);\n"], _d.raw = ["\n    background: rgb(255, 255, 255);\n    position: fixed;\n    top: 0;\n    left: 24vw;\n    width: calc(1vw);\n    height: calc(100vh);\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: rgb(200, 200, 200);\n    border-right-color: rgb(201, 201, 201);\n    border-bottom-color: rgb(200, 200, 200);\n    border-left-color: rgb(201, 201, 201);\n"], styled_components_1.default.div(_d));
var Action = (_e = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    right: 1vw;\n    width: 74vw;\n    background: rgb(229, 229, 229);\n"], _e.raw = ["\n    background: rgb(170, 170, 170);\n    position: fixed;\n    top: 0;\n    right: 1vw;\n    width: 74vw;\n    background: rgb(229, 229, 229);\n"], styled_components_1.default.div(_e));
var ApresAction = (_f = ["\n    background: rgb(255, 255, 255);\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: rgb(200, 200, 200);\n    border-right-color: rgb(201, 201, 201);\n    border-bottom-color: rgb(200, 200, 200);\n    border-left-color: rgb(201, 201, 201);\n"], _f.raw = ["\n    background: rgb(255, 255, 255);\n    position: fixed;\n    top: 0;\n    right: 0;\n    width: 1vw;\n    height: 100vh;\n    border-style: solid;\n    border-width: 0 0.33vw;\n    border-top-color: rgb(200, 200, 200);\n    border-right-color: rgb(201, 201, 201);\n    border-bottom-color: rgb(200, 200, 200);\n    border-left-color: rgb(201, 201, 201);\n"], styled_components_1.default.div(_f));
var ContainerAdmin = (_g = ["\n    background: rgb(229, 229, 229);\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(24vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n"], _g.raw = ["\n    background: rgb(229, 229, 229);\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(24vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n"], styled_components_1.default.div(_g));
var SujetAdmin = (_h = ["\n    background: rgb(229, 229, 229);\n    flex: auto;\n    align-self: center;\n    min-width: calc(24vw);\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n"], _h.raw = ["\n    background: rgb(229, 229, 229);\n    flex: auto;\n    align-self: center;\n    min-width: calc(24vw);\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n"], styled_components_1.default.div(_h));
var SujetAdminContainer = (_j = ["\n    flex: auto;\n    margin: 0;\n    background: rgb(82, 179, 217);\n    height: 7ex;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;    \n"], _j.raw = ["\n    flex: auto;\n    margin: 0;\n    background: rgb(82, 179, 217);\n    height: 7ex;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;    \n"], styled_components_1.default.div(_j));
var Separateur = (_k = ["\n        margin: 0 0 0 1em;\n"], _k.raw = ["\n        margin: 0 0 0 1em;\n"], styled_components_1.default.div(_k));
var Retour = (_l = ["\n    flex: none;\n    width: 4ex;\n    height: 4ex;\n"], _l.raw = ["\n    flex: none;\n    width: 4ex;\n    height: 4ex;\n"], styled_components_1.default.div(_l));
function pastille(r, g, b) {
    return (_a = ["\n        flex: none;\n        width: 4ex;\n        height: 4ex;\n        border-radius: 100%;\n        background-color: rgb(", ", ", ", ", ");\n    "], _a.raw = ["\n        flex: none;\n        width: 4ex;\n        height: 4ex;\n        border-radius: 100%;\n        background-color: rgb(", ", ", ", ", ");\n    "], styled_components_1.default.div(_a, r, g, b));
    var _a;
}
var PastilleRouge = pastille(255, 0, 0);
var PastilleJaune = pastille(225, 225, 0);
var PastilleViolette = pastille(128, 0, 128);
var PastilleBleueCanard = pastille(0, 128, 128);
var PastilleVerte = pastille(0, 225, 0);
var PastilleGrise = pastille(100, 100, 100);
var Pseudo = (_m = ["\n    flex: initial;\n    background: rgb(82, 179, 217);\n    color: rgb(255, 255, 255);\n    text-align: center;\n    padding: 1ex;\n    height: 4ex;\n    width: 10ex;\n    font-size: x-large;\n"], _m.raw = ["\n    flex: initial;\n    background: rgb(82, 179, 217);\n    color: rgb(255, 255, 255);\n    text-align: center;\n    padding: 1ex;\n    height: 4ex;\n    width: 10ex;\n    font-size: x-large;\n"], styled_components_1.default.div(_m));
var ObjetAdmin = (_o = ["\n    flex: initial;\n    background: rgb(82, 179, 217);\n    border-radius: 1ex;\n    padding: 1ex 1ex 1ex 1ex;\n    margin: 1em 0 1em 0;\n    max-width: 20vw;\n    width: 12em;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;    \n"], _o.raw = ["\n    flex: initial;\n    background: rgb(82, 179, 217);\n    border-radius: 1ex;\n    padding: 1ex 1ex 1ex 1ex;\n    margin: 1em 0 1em 0;\n    max-width: 20vw;\n    width: 12em;\n\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;    \n"], styled_components_1.default.div(_o));
var ContainerAction = (_p = ["\n    background: rgb(229, 229, 229);\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(74vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n"], _p.raw = ["\n    background: rgb(229, 229, 229);\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* important / overflow : deux sens haut vers bas et gauche vers droite pour le d\u00E9passement */\n    min-width: calc(74vw);\n    min-height: calc(100vh);\n    /* occupe au moins la place du container */\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n"], styled_components_1.default.div(_p));
var ContainerEmission = (_q = ["\n    flex: initial;\n    background: rgb(256, 256, 256);\n    box-shadow: 10px 10px 5px rgb(170, 170, 170);\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], _q.raw = ["\n    flex: initial;\n    background: rgb(256, 256, 256);\n    box-shadow: 10px 10px 5px rgb(170, 170, 170);\n    border-radius: 1ex;\n    margin: 1ex 1ex 1ex 1em;\n    align-self: flex-start;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], styled_components_1.default.div(_q));
var ContainerReception = (_r = ["\n    flex: initial;\n    background: rgb(256, 256, 256);\n    box-shadow: -10px 10px 5px rgb(170, 170, 170);\n    border-radius: 1ex; \n    margin: 1ex 1em 1ex 1ex;\n    align-self: flex-end;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], _r.raw = ["\n    flex: initial;\n    background: rgb(256, 256, 256);\n    box-shadow: -10px 10px 5px rgb(170, 170, 170);\n    border-radius: 1ex; \n    margin: 1ex 1em 1ex 1ex;\n    align-self: flex-end;\n    /* Contrainte : marge plus grande que la largeur des ascenseurs. */\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: flex-start;\n    min-width: 80ex;\n    max-width: calc(50vw);\n"], styled_components_1.default.div(_r));
var CouleurEncre;
(function (CouleurEncre) {
    CouleurEncre[CouleurEncre["BLANC"] = 0] = "BLANC";
    CouleurEncre[CouleurEncre["NOIR"] = 1] = "NOIR";
})(CouleurEncre || (CouleurEncre = {}));
function interlocuteur(r, g, b, c) {
    var couleur = (c === CouleurEncre.BLANC) ?
        "rgb(255, 255, 255)" :
        "rgb(0, 0, 0)";
    return (_a = ["\n        flex: none;\n        background-color: rgb(", ", ", ", ", ");\n        text-align: center;\n        padding: 1ex;\n        height: 4ex;\n        width: 18ex;\n        margin: 1ex;\n        border-radius: 1ex;\n    "], _a.raw = ["\n        flex: none;\n        background-color: rgb(", ", ", ", ", ");\n        text-align: center;\n        padding: 1ex;\n        height: 4ex;\n        width: 18ex;\n        margin: 1ex;\n        border-radius: 1ex;\n    "], styled_components_1.default.div(_a, r, g, b));
    var _a;
}
var InterlocuteurRouge = interlocuteur(255, 0, 0, CouleurEncre.BLANC);
var InterlocuteurJaune = interlocuteur(225, 225, 0, CouleurEncre.NOIR);
var InterlocuteurViolet = interlocuteur(128, 0, 128, CouleurEncre.BLANC);
var InterlocuteurBleuCanard = interlocuteur(0, 128, 128, CouleurEncre.BLANC);
var InterlocuteurVert = interlocuteur(0, 225, 0, CouleurEncre.NOIR);
var InterlocuteurGris = interlocuteur(100, 100, 100, CouleurEncre.BLANC);
var MessageFixe = (_s = ["\n    flex: auto;\n    background: rgb(255, 255, 255);\n    color: rgb(0, 0, 0);\n    text-align: justify;\n    padding: 1ex;\n    min-height: 8ex;\n    min-width: 24ex;\n    max-width: 72ex;\n    margin: 1ex;\n"], _s.raw = ["\n    flex: auto;\n    background: rgb(255, 255, 255);\n    color: rgb(0, 0, 0);\n    text-align: justify;\n    padding: 1ex;\n    min-height: 8ex;\n    min-width: 24ex;\n    max-width: 72ex;\n    margin: 1ex;\n"], styled_components_1.default.div(_s));
var Cachet = (_t = ["\n    font-size: x-small;\n    color: rgb(50, 50, 50);\n    text-align: right;\n"], _t.raw = ["\n    font-size: x-small;\n    color: rgb(50, 50, 50);\n    text-align: right;\n"], styled_components_1.default.div(_t));
function tresLongTexte() {
    var r = "";
    for (var i = 0; i < 1000; i++) {
        r = r + i.toString() + ' a ';
    }
    return r;
}
ReactDOM.render(React.createElement(Corps, null,
    React.createElement(Admin, null,
        React.createElement(react_custom_scrollbars_1.default, { style: { width: "24vw", height: "100vh" } },
            React.createElement(ContainerAdmin, null,
                React.createElement(SujetAdmin, null,
                    React.createElement(SujetAdminContainer, null,
                        React.createElement(Separateur, null),
                        React.createElement(Retour, null,
                            React.createElement("img", { src: "chevronGauche.svg" })),
                        React.createElement(Separateur, null),
                        React.createElement(Separateur, null),
                        React.createElement(PastilleRouge, null),
                        React.createElement(Pseudo, null, "Momo"))),
                "Choisissez un destinataire :",
                React.createElement(ObjetAdmin, null,
                    React.createElement(PastilleJaune, null),
                    React.createElement(Pseudo, null, "Zaza")),
                React.createElement(ObjetAdmin, null,
                    React.createElement(PastilleViolette, null),
                    React.createElement(Pseudo, null, "Toto")),
                React.createElement(ObjetAdmin, null,
                    React.createElement(PastilleBleueCanard, null),
                    React.createElement(Pseudo, null, "Titi")),
                React.createElement(ObjetAdmin, null,
                    React.createElement(PastilleVerte, null),
                    React.createElement(Pseudo, null, "Sissi")),
                "ou tous les destinataires :",
                React.createElement(ObjetAdmin, null,
                    React.createElement(PastilleGrise, null),
                    React.createElement(Pseudo, null, "tous"))))),
    React.createElement(ApresAdmin, null),
    React.createElement(Action, null,
        React.createElement(react_custom_scrollbars_1.default, { style: { width: "74vw", height: "100vh" } },
            React.createElement(ContainerAction, null,
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "coucou zaza. Cette ligne est très longue et mérite d'être étendue vers la droite. Cela se fait automatiquement.",
                        React.createElement("br", null),
                        "A bientôt.",
                        React.createElement("br", null),
                        "momo.",
                        React.createElement(Cachet, null, "12:43")),
                    React.createElement(InterlocuteurJaune, null, "A : zaza")),
                React.createElement(ContainerReception, null,
                    React.createElement(InterlocuteurJaune, null, "De : zaza"),
                    React.createElement(MessageFixe, null,
                        "Effectivement, cette ligne est très longue et mérite d'être étendue vers la droite.",
                        React.createElement("br", null),
                        " A bientôt.",
                        React.createElement("br", null),
                        "A+",
                        React.createElement(Cachet, null, "12:47")),
                    React.createElement(InterlocuteurRouge, null, "A : momo")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "coucou sissi. Ligne courte sans extension.",
                        React.createElement("br", null),
                        "A bientôt.",
                        React.createElement("br", null),
                        "A+",
                        React.createElement(Cachet, null, "12:49")),
                    React.createElement(InterlocuteurVert, null, "A : sissi")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "coucou toto. On peut écrire un long texte avec extension et passage à la ligne automatique. Pour forcer la passage à la ligne, on utilise la balise br.",
                        React.createElement("br", null),
                        "A bientôt.",
                        React.createElement(Cachet, null, "12:56")),
                    React.createElement(InterlocuteurViolet, null, "A : toto")),
                React.createElement(ContainerReception, null,
                    React.createElement(InterlocuteurViolet, null, "De : toto"),
                    React.createElement(MessageFixe, null,
                        "coucou momo.",
                        React.createElement("br", null),
                        "Messages envoyés : à gauche.",
                        React.createElement("br", null),
                        "Messages reçus : à droite.",
                        React.createElement("br", null),
                        "Les couleurs permettent de distinguer les différents interlocuteurs.",
                        React.createElement(Cachet, null, "13:09")),
                    React.createElement(InterlocuteurRouge, null, "A : momo")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "coucou toto. La longueur des lignes est ajustée automtiquement entre une valeur min et une max.",
                        React.createElement("br", null),
                        "A bientôt.",
                        React.createElement("br", null),
                        "A+",
                        React.createElement(Cachet, null, "12:49")),
                    React.createElement(InterlocuteurViolet, null, "A : toto")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "coucou titi. C'est une pastille rouge que j'utilise.",
                        React.createElement("br", null),
                        "La tienne est une sorte de bleu canard.",
                        React.createElement("br", null),
                        "Le temps augmente vers le bas : les messages les plus récents sont en bas, les plus anciens en haut.",
                        "Lorsque la pile des messages émis et reçus grandit, elle s'étend vers le haut ; quand elle dépasse les limites de sa fenêtre, un ascenseur apparaît à droite, pour permettre le défilement.",
                        React.createElement(Cachet, null, "14:47")),
                    React.createElement(InterlocuteurBleuCanard, null, "A : titi")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(MessageFixe, null,
                        "Fin",
                        React.createElement("br", null),
                        "A bientôt.",
                        React.createElement("br", null),
                        "momo.",
                        React.createElement(Cachet, null, "18:45")),
                    React.createElement(InterlocuteurVert, null, "A : sissi")),
                React.createElement(ContainerEmission, null,
                    React.createElement(InterlocuteurRouge, null, "De : momo"),
                    React.createElement(react_textarea_autosize_1.default, { placeholder: "Entrez le texte de votre message.", minRows: 3, cols: 48, style: styleTexteBrut }),
                    React.createElement(InterlocuteurVert, null, "A : sissi"))))),
    React.createElement(ApresAction, null)), document.getElementById("conteneur"));
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
//# sourceMappingURL=indexTchat.2.js.map