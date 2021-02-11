'use strict';
import {FormPopup} from './FormPopup.js';
export class CardPopup extends FormPopup {

    constructor(markup, container, addCard, sendCardToApi) {
        super(container, markup);
        this._addCard = addCard;
        this._sendDataToApi = sendCardToApi;
    };

    _submitAction = (obj) => {
        this._addCard(obj);
    };

}
