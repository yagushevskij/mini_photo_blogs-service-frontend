export class CardList {

    constructor(container, wrapper, createCard) {
        this._container = container;
        this._wrapper = wrapper;
        this._createCard = createCard;
    };
    _doCardsBlockVisible = () => {
      this._wrapper.classList.remove('hidden');
    }
    addCard = (cardObj) => {
        this._container.appendChild(this._createCard(cardObj));
    };
    render = (items) => {
        items.forEach((cardObj) => {
            this.addCard(cardObj);
        });
        this._doCardsBlockVisible();
    };
}
