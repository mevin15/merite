console.log("* Début des tests");

import * as bin from "./bibliotheque/binaire_test" ;
import * as env from "./bibliotheque/enveloppe_test";
import * as id from "./bibliotheque/identification_test";
import * as tab from "./bibliotheque/table_test";
import * as tabId from "./bibliotheque/tableIdentification_test";
import * as tchat from "./tchat/commun/tchat_test";

bin ;
env ;
id ;
tab;
tabId;
tchat;

console.log("* Fin des tests");