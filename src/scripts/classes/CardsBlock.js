export class CardsBlock {
  constructor(wrapper, container, renderCardList) {
    this._wrapper = wrapper;
    this._container = container;
    this._renderCardList = renderCardList;
  };
  create = (cards) => {
    if (cards && Object.keys(cards).length != 0) {
      this._renderCardList(cards, this._container)
    }
    this.open();
  };
  open = () => {
    this._wrapper.classList.remove('hidden')
  };
  close = () => {
    this._wrapper.classList.add('hidden')
  };
}