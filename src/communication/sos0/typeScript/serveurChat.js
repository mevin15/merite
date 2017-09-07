System.register(["./chat", "./serveur"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var System, chat_1, serveur_1, serveurCanaux;
    return {
        setters: [
            function (chat_1_1) {
                chat_1 = chat_1_1;
            },
            function (serveur_1_1) {
                serveur_1 = serveur_1_1;
            }
        ],
        execute: function () {
            System = require('systemjs');
            serveurCanaux = new serveur_1.ServeurLienWebSocket(1234, function (s, m) {
                var msg = m.enJSON();
                switch (msg.type) {
                    case chat_1.TypeMessageChat.COM:
                        console.log("COM : " + m.enSerie());
                        s.diffuser(m);
                        break;
                }
                ;
            });
            serveurCanaux.demarrer();
        }
    };
});
//# sourceMappingURL=serveurChat.js.map
