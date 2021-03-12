export class CardsBlock {
  constructor(wrapper, container, renderCardList) {
    this._wrapper = wrapper;
    this._container = container;
    this._renderCardList = renderCardList;
  };
  create = (cardsArr) => {
    this._cardsArr = cardsArr;
    if (this._cardsArr && Object.keys(this._cardsArr).length != 0) {
      this._renderCardList(this._cardsArr, this._container);
      this.open();
    }
  };
  open = () => {
    this._wrapper.classList.remove('hidden')
  };
  close = () => {
    this._wrapper.classList.add('hidden')
  };
  update = () => {
    console.log(this._cardsArr)
  }
}