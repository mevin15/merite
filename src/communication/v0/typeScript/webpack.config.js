var config = {
    entry: {
        tchat : "./build/tchat/client/clientTchat.js",
        jeu1 : "./build/jeu1_adressageRoutage/client/clientJeu1_adressageRoutage.js"
    }, // Les clés remplacent name ci-dessous.
    output: {
        path: __dirname + "/build",
        filename: "[name].client.js"
    }
};

module.exports = config;
