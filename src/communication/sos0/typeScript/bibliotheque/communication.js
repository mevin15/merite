"use strict";
exports.__esModule = true;
;
var Message = (function () {
    function Message(enJSON) {
        this._enJSON = enJSON; // JSON
    }
    ;
    Message.prototype.enJSON = function () {
        return this._enJSON;
    };
    ;
    Message.prototype.enSerie = function () {
        return JSON.stringify(this.enJSON());
    };
    ;
    return Message;
}());
exports.Message = Message;
;
