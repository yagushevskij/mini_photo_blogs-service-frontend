'use strict';
import {FormPopup} from './FormPopup.js';
export class CardPopup extends FormPopup {

    constructor(markup, container, createFormValidator, sendCardToApi, addCard) {
        super(container, markup, createFormValidator, sendCardToApi);
        this._addCard = addCard;
    };

    _submitAction = (obj) => {
        this._addCard(obj);
    };

}
