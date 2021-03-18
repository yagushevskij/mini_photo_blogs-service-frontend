import { CardsBlock } from './CardsBlock';

export class UserCardsBlock extends CardsBlock {

  constructor(params) {
    super();
    const { wrapper, container, config, renderCardList } = params;
    this._container = container;
    this._wrapper = wrapper;
    this._config = config;
    this._renderCardList = renderCardList;
  };
  _setTitle = () => {
    super._setTitle();
    if (this._cardsArr && this._cardsArr.length > 0) {
      this._title.textContent = (this._isCardsOwner) ?
      this._config.title.authorized.regular(this._cardsArr.length) : this._config.title.unAuthorized.regular(this._cardsArr.length, this._cardsOwner.name);
    } else {
      this._title.textContent = (this._isCardsOwner) ?
      this._config.title.authorized.empty : this._config.title.unAuthorized.empty(this._cardsOwner.name);
    }
  };

  _render = () => {
    super._render();
    this._renderCards();
  }

  update = (params) => {
    if (params) {
      const { removedCard, addedCard } = params;
      if (removedCard) {
        const index = this._cardsArr.indexOf(removedCard);
        this._cardsArr.splice(index, 1);
      }
      if (addedCard) {
        const newArr = this._cardsArr.push(addedCard);
      }
    }
    this.create({
      authUser: this._authUser,
      cardsOwner: this._cardsOwner,
      cardsArr: this._cardsArr,
    });
  }
}
