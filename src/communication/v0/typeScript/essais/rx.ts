import { Observable, Observer } from 'rxjs';
import { Unite } from "../bibliotheque/types"
import { elementParId} from "../bibliotheque/vueClient"

// Cf. https://lambda-it.ch/blog/post/reactive-data-flow-in-angular-2/

export class CounterComponent {
    private count : Observable<number>;
    private decrement : () => void;
    private increment : () => void;
    constructor() {
        // convert event listeners into observables
        // Mieux : utiliser fromEvent - TODO cf commentaire
        const decrementCounter$ : Observable<number>= Observable.fromEvent(elementParId('dec'), "click", e => -1);

        
        /*Observable.create((observer : Observer<Unite>) => {
            this.decrement = () => { observer.next(Unite.un); };
        });*/
        const incrementCounter$ : Observable<Unite> = Observable.create((observer : Observer<Unite>) => {
            this.increment = () => { observer.next(Unite.ZERO); };
        });
        
        // set up the intent
        const intent$ : Observable<number> = Observable.merge(
            decrementCounter$.map((x : Unite) => -1),
            incrementCounter$.map((x : Unite) => +1)
        );
        
        // declare how the intent is transformed into a model
        this.count = intent$
            .startWith(0)
            .scan((currentCount : number, value : number) => currentCount + value);
            
        // the observable model is bound to the user interface in the template.
        // observables are understood via the async pipe
    }
}

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
