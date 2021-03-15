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
    (this._cardsArr && this._cardsArr.length > 0) ?
      this._title.textContent = this._config.title.regular(this._cardsArr.length) :
      this._title.textContent = this._config.title.empty;
  }
  _create = () => {
    super._create();
    this._renderCards();
  }
}
