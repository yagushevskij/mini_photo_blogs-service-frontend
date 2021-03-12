export class CardList {

  constructor(createCard, container, wrapper) {
    this._createCard = createCard;
    this._container = container;
    this._wrapper = wrapper;
    // this._updateCardsBlock = updateCardsBlock;
    this.cardsArr = [];
  };
  // _doCardsBlockVisible = () => {
  //   if (this._wrapper.classList.contains('hidden')) {
  //     this._wrapper.classList.remove('hidden');
  //   }
  // }
  addCard = (cardObj) => {
    this._cardsArr.push(cardObj);
    this._container.appendChild(this._createCard(cardObj));
    this.update();
  };
  removeCard = (cardId) => {
    const index = this.cardsArr.indexOf(cardObj)
    if (index > -1) {
      this.cardsArr.splice(index, 1);
      this._container.removeChild(card);
    }
  };
  render = (cardsArr) => {
    this._cardsArr = cardsArr;
    this._cardsArr.forEach((cardObj) => {
      this.addCard(cardObj);
    });
  };
  update = () => {
    (this._cardsArr && this._cardsArr.length>0) ? this.show() : this.hide();
  }
  show = () => {
    this._wrapper.classList.remove('hidden')
  };
  hide = () => {
    this._wrapper.classList.add('hidden')
  };
}
