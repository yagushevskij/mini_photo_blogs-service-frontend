'use strict';
class CardPopup extends FormPopup {

    constructor(markup, container, addCard, api) {
        super(container, markup);
        this._addCard = addCard;
        this._apiParams = { url: api.cardsApiUrl, method: 'POST' };
        this._api = api;
    };

    _submitAction = (obj) => {
        this._addCard(obj);
    };

}
