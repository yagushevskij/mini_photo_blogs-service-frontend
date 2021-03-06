import { CardsBlock } from './CardsBlock';

export class TopCardsBlock extends CardsBlock {
  constructor(params) {
    super();
    const { wrapper, container, config, renderCardList } = params;
    this._container = container;
    this._wrapper = wrapper;
    this._config = config;
    this._renderCardList = renderCardList;
  }

  _create = () => {
    super._create();
    this._renderCards();
    this._setContainerStyle();
    this._setElemsSize();
  };

  _setTitle = () => {
    super._setTitle();
    (this._cardsArr && this._cardsArr.length > 0) ?
      this._title.textContent = this._config.title.regular(this._config.settings.total) :
      this._title.textContent = this._config.title.empty;
  }

  _setContainerStyle = () => {
    this._container.setAttribute('style', `grid-template-columns:
    repeat(auto-fill, ${this._config.gallery.cellSize}px); grid-auto-rows: ${this._config.gallery.cellSize}px; grid-gap: ${this._config.gallery.gapSize}px;`)
  };

  _setElemsSize = () => {
    this._cardsCollection = this._container.childNodes;
    this._cardsCollection.forEach((domElement) => {
      this._domElement = domElement;
      this._likesCount = this._domElement.dataset.likes;
      const increaseMultiplier = this._getIncreaseMultiplier();
      let columnSpanSize, rowSpanSize;
      rowSpanSize = columnSpanSize = this._config.gallery.minFileSize / this._config.gallery.cellSize * increaseMultiplier;
      const aspectRatio = this._getAspectRatio();
      const roundHalf = (num) => Math.round(num * 2) / 2;
      if (aspectRatio < 1) {
        rowSpanSize = roundHalf(rowSpanSize * (aspectRatio + 1));
      } else if (aspectRatio > 1) {
        columnSpanSize = roundHalf(columnSpanSize * aspectRatio);
      }
      this._domElement.setAttribute('style', `grid-column: span ${Math.ceil(columnSpanSize)}; grid-row: span ${Math.ceil(rowSpanSize)};`)
    })
  };

  _getAspectRatio = () => {
    const width = this._domElement.dataset.width;
    const height = this._domElement.dataset.height;
    return (width / height);
  };

  _setMinMaxLikesCount = () => {
    const likesCountArr = this._cardsArr.map(elem => elem.likes.length);
    this._maxLikesCount = Math.max.apply(Math, likesCountArr);
    this._minLikesCount = Math.min.apply(Math, likesCountArr);
  }

  _getIncreaseMultiplier = () => {
    this._setMinMaxLikesCount();
    const minMultiplier = 1;
    const maxMultiplier = this._config.gallery.maxFileSize / this._config.gallery.minFileSize
    const clamp = (curr, min = 0, max = 1) => Math.min(max, Math.max(min, curr));
    const invlerp = (min, max, curr) => clamp((curr - min) / (max - min));
    return minMultiplier + (maxMultiplier - minMultiplier) * invlerp(this._minLikesCount, this._maxLikesCount, this._likesCount);
  }

  _sort = () => {
    super._sort();
    this._sliceArr();
    const shuffle = (array) => { // Перемешаем массив для построения красивой галереи;
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    shuffle(this._cardsArr);
  }

  _sliceArr = () => {
    this._cardsArr = this._cardsArr.slice(0, this._config.settings.total);
  }

}
