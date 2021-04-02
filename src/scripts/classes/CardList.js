export class CardList {
  constructor(params) {
    const { createCard, updateCardsBlock } = params;
    this._createCard = createCard;
    this._updateCardsBlock = updateCardsBlock;
  }

  addCard = (cardObj) => {
    this._cardObj = cardObj;
    this._insertCard();
    this._updateCardsBlock({ addedCard: this._cardObj });
  }

  _insertCard = () => {
    this._container.appendChild(this._createCard(this._cardObj));
  }

  render = ({ cards: cardsArr, container }) => {
    this._container = container;
    this._cardsArr = cardsArr;
    cardsArr.forEach((cardObj) => {
      this._cardObj = cardObj;
      this._insertCard();
    });
  }
}
