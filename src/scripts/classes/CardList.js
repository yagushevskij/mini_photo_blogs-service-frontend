export class CardList {
  constructor(params) {
    const { createCard, updateCardsBlock } = params;
    this._createCard = createCard;
    this._updateCardsBlock = updateCardsBlock;
  }

  addCard = (card = {}) => {
    this._card = card;
    this._insertCard();
    this._updateCardsBlock({ addedCard: this._card });
  }

  _insertCard = () => {
    this._container.appendChild(this._createCard(this._card));
  }

  /**
 * @cards - массив объектов карточек;
 * @container - контейнер для карточек;
 */
  render = ({ cards = [], container }) => {
    this._container = container;
    if (cards.length !== 0) {
      cards.forEach((card) => {
        this._card = card;
        this._insertCard();
      });
    }
  }
}
