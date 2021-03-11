export class CardList {

    constructor(createCard) {
        this._createCard = createCard;
    };
    // _doCardsBlockVisible = () => {
    //   if (this._wrapper.classList.contains('hidden')) {
    //     this._wrapper.classList.remove('hidden');
    //   }
    // }
    addCard = (cardObj) => {
        this._container.appendChild(this._createCard(cardObj));
    };
    render = (items, container) => {
      this._container = container;
        items.forEach((cardObj) => {
            this.addCard(cardObj);
        });
        // this._doCardsBlockVisible();
    };
}
