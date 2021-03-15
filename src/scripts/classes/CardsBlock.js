export class CardsBlock {

  constructor() {
  };
  render = (cardsArr) => {
    this._cardsArr = cardsArr;
    if (Object.keys(this._cardsArr).length != 0) {
      this._create();
    }
    this._setTitle();
    this.show();
  };
  _create() {
    this._sort();
  }
  _setTitle() {
    this._title = this._wrapper.querySelector('.root__title');
  }
  _renderCards = () => { // Режем массив карточек на подмассивы и рендерим каждый при обращении к методу;
    let splittedArray = [];
    const arraySize = this._config.settings.itemsOnPage;
    for (let i = 0; i < Math.ceil(this._cardsArr.length / arraySize); i++) {
      splittedArray[i] = this._cardsArr.slice((i * arraySize), (i * arraySize) + arraySize);
    }
    this._totalItems = splittedArray.length;
    this._curentItem = 0;
    this._renderCardList(splittedArray[this._curentItem]);
    (this._totalItems > this._curentItem) ? this._curentItem++ : this._curentItem;
  }
  update = (params) => {
    let newArr = [];
    if (params) {
      const { removedCard, addedCard } = params;
      if (removedCard) {
        const index = this._cardsArr.indexOf(removedCard);
        newArr = this._cardsArr.splice(index, 1);
      }
      if (addedCard) {
        newArr = this._cardsArr.push(addedCard);
      }
    }
    console.log(this._cardsArr)
    this.render(newArr);
  }
  toggleVisibility = () => {
    this._cardsCollection = this._container.childNodes;
    (this._cardsCollection && this._cardsCollection.length > 0) ? this.show() : this.hide();
  }
  _sort() {
    const sortByLikes = (a, b) => {
      return b.likes.length - a.likes.length;
    }
    this._cardsArr = (this._config.settings.sortBy = 'likes') ? this._cardsArr.sort(sortByLikes) : this._cardsArr;
  }
  show = () => {
    this._wrapper.classList.remove('hidden')
  };
  hide = () => {
    this._wrapper.classList.add('hidden')
  };
}
