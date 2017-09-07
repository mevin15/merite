

export interface FormatMessage { };

export class Message<T extends FormatMessage> {
    _enJSON: T;
    constructor(enJSON: T) {
        this._enJSON = enJSON; // JSON
    };
    enJSON(): T {
        return this._enJSON;
    };

    enSerie(): string {
        return JSON.stringify(this.enJSON());
    };
};

