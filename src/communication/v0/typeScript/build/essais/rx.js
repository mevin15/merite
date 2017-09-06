"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var types_1 = require("../bibliotheque/types");
var vueClient_1 = require("../bibliotheque/vueClient");
// Cf. https://lambda-it.ch/blog/post/reactive-data-flow-in-angular-2/
var CounterComponent = (function () {
    function CounterComponent() {
        var _this = this;
        // convert event listeners into observables
        // Mieux : utiliser fromEvent - TODO cf commentaire
        var decrementCounter$ = rxjs_1.Observable.fromEvent(vueClient_1.elementParId('dec'), "click", function (e) { return -1; });
        /*Observable.create((observer : Observer<Unite>) => {
            this.decrement = () => { observer.next(Unite.un); };
        });*/
        var incrementCounter$ = rxjs_1.Observable.create(function (observer) {
            _this.increment = function () { observer.next(types_1.Unite.ZERO); };
        });
        // set up the intent
        var intent$ = rxjs_1.Observable.merge(decrementCounter$.map(function (x) { return -1; }), incrementCounter$.map(function (x) { return +1; }));
        // declare how the intent is transformed into a model
        this.count = intent$
            .startWith(0)
            .scan(function (currentCount, value) { return currentCount + value; });
        // the observable model is bound to the user interface in the template.
        // observables are understood via the async pipe
    }
    return CounterComponent;
}());
exports.CounterComponent = CounterComponent;
/*
import { Component, ChangeDetectionStrategy } from 'angular2/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'counter',
    template: `
        <div>
            <button id="dec">Decrement</button>
            <button id="inc">Increment</button>
            <p> Counter: {{ count | async }} </p>
        </div>`
})
export class CounterComponent {
    constructor() {
        // convert event listeners into observables
        const decrementCounter$ = Observable.fromEvent(document.getElementById('dec'), "click", e => -1);
        /*Observable.create(observer => {
            this.decrement = () => { observer.next(); };
        });
        const incrementCounter$ = Observable.fromEvent(document.getElementById('inc'), "click", e => +1);

        // set up the intent
        const intent$ = Observable.merge(
            decrementCounter$,
            incrementCounter$)
        );
        
        // declare how the intent is transformed into a model
        this.count = intent$
            .startWith(0)
            .scan((currentCount, value) => currentCount + value);
            
        // the observable model is bound to the user interface in the template.
        // observables are understood via the async pipe
    }
}
*/
//# sourceMappingURL=rx.js.map