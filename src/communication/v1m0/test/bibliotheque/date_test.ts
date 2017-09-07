import * as chai from 'chai';
import * as mocha from 'mocha';

import { DateImmutable, creerDate, creerDateMaintenant } from "../../bibliotheque/types";

describe('creerDate', () => {
    let r = creerDateMaintenant();
    console.log("Date : " + JSON.stringify(r.ex()));
    let oracle = creerDate(r.ex());

    it('renvoie ' + r.representation(), () => {
        chai.expect(r.representation()).to.equal(oracle.representation());
    });
});

