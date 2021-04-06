import { CardsBlock } from './CardsBlock';

export class TopCardsBlock extends CardsBlock {
  constructor(params) {
    super();
    const {
      container, config, renderCardList,
    } = params;
    this._container = container;
    this._config = config;
    this._renderCardList = renderCardList;
    this._markup = `<section class="cards-wrapper cards-wrapper_type_top-cards root__section">
    <h1 class="root__title"></h1>
    <div class="cards-list cards-list_type_top-cards"></div>
    <button class="button cards-wrapper__button hidden">${config.button.text}</button>
  </section>`;
  }

  _render = () => {
    this._renderCards();
    this._container.append(this._view);
  };

  _renderCards = () => {
    super._renderCards();
    this._setElemsSize();
  }

  _setTitle = () => {
    super._setTitle();
    (this._cardsArr && this._cardsArr.length > 0)
      ? this._title.textContent = this._config.title.regular(this._config.settings.total)
      : this._title.textContent = this._config.title.empty;
  }

  _setElemsSize = () => {
    this._cardsCollection = this._cardsContainer.childNodes;
    this._cardsCollection.forEach((domElement) => {
      this._domElement = domElement;
      this._likesCount = this._domElement.dataset.likes;
      const increaseMultiplier = this._getIncreaseMultiplier();
      let columnSpanSize;
      let rowSpanSize;
      rowSpanSize = (this._config.gallery.minFileSize / this._config.gallery.cellSize)
        * increaseMultiplier;
      columnSpanSize = rowSpanSize;
      const aspectRatio = this._getAspectRatio();
      const roundHalf = (num) => Math.round(num * 2) / 2;
      if (aspectRatio < 1) {
        rowSpanSize = roundHalf(rowSpanSize * (aspectRatio + 1));
      } else if (aspectRatio > 1) {
        columnSpanSize = roundHalf(columnSpanSize * aspectRatio);
      }
      this._domElement.setAttribute('style', `grid-column: span ${Math.ceil(columnSpanSize)}; grid-row: span ${Math.ceil(rowSpanSize)};`);
    });
  };

  _getAspectRatio = () => {
    const { width } = this._domElement.dataset;
    const { height } = this._domElement.dataset;
    return (width / height);
  };

  _setMinMaxLikesCount = () => {
    const likesCountArr = this._cardsArr.map((elem) => elem.likes.length);
    const mathMax = Math.max;
    const mathMin = Math.min;
    this._maxLikesCount = mathMax.apply(Math, likesCountArr);
    this._minLikesCount = mathMin.apply(Math, likesCountArr);
  }

  _getIncreaseMultiplier = () => {
    this._setMinMaxLikesCount();
    const minMultiplier = 1;
    const maxMultiplier = this._config.gallery.maxFileSize / this._config.gallery.minFileSize;
    const clamp = (curr, min = 0, max = 1) => Math.min(max, Math.max(min, curr));
    const invlerp = (min, max, curr) => clamp((curr - min) / (max - min));
    return minMultiplier + (maxMultiplier - minMultiplier)
      * invlerp(this._minLikesCount, this._maxLikesCount, this._likesCount);
  }

  _sort = () => {
    super._sort();
    this._sliceArr();
    const shuffle = (array) => { // Перемешаем массив для построения красивой галереи;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    shuffle(this._cardsArr);
  }

  _sliceArr = () => {
    this._cardsArr = this._cardsArr.slice(0, this._config.settings.total);
  }
}
