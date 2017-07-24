var config = {
    entry: {
        client : "./build/chat/client/clientChat.js"
    }, // Les clés remplacent name ci-dessous.
    output: {
        path: __dirname + "/build",
        filename: "[name].appli.js"
    }
};

module.exports = config;
