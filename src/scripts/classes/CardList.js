export class CardList {

  constructor(params) {
    const { createCard, wrapper, container } = params;
    this._createCard = createCard;
    this._container = container;
    this._wrapper = wrapper;
  };
  addCard = (cardObj) => {
    this._container.appendChild(this._createCard(cardObj));
    this.update();
  };
  render = (cardsArr) => {
    cardsArr.forEach((cardObj) => {
      this.addCard(cardObj);
    });
  };
  update = () => {
    this.toggleVisibility()
  }
  toggleVisibility = () => {
    const cardsCollection = this._container.childNodes;
    (cardsCollection && cardsCollection.length>0) ? this.show() : this.hide();
  }
  show = () => {
    this._wrapper.classList.remove('hidden')
  };
  hide = () => {
    this._wrapper.classList.add('hidden')
  };
}
