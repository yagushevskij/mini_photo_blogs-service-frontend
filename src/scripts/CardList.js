'use strict';
export class CardList {

    constructor(container, createCard) {
        this._container = container;
        this._createCard = createCard;
    };
    addCard = (cardObj) => {
        this._container.appendChild(this._createCard(cardObj));
    };
    render = (items) => {
        this._items = items;
        this._items.forEach((cardObj) => {
            this.addCard(cardObj);
        });
    };
}
