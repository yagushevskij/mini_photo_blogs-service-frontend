export class PhotoGallery {
  constructor(config) {
    this._config = config;
    // this._init();
  }

  _init = () => {
    this._container.setAttribute('style', `grid-template-columns:
    repeat(auto-fill, ${this._config.cellSize}px); grid-auto-rows: ${this._config.cellSize}px; grid-gap: ${this._config.gapSize}px;`)
    this._setMinMaxLikesCount();
  };

  create = (container, cardsArr) => {
    this._container = container;
    this._cardsArr = cardsArr;
    this._init();
  };

  setSize = (element, cardObj) => {
    this._cardObj = cardObj;
    this._likesCount = cardObj.likes.length;
    const increaseMultiplier = this._getIncreaseMultiplier();
    let columnSpanSize;
    let rowSpanSize = columnSpanSize = this._config.minFileSize / this._config.cellSize * increaseMultiplier;
    const aspectRatio = this._getAspectRatio();
    const roundHalf = (num) => Math.round(num * 2) / 2;
    if (aspectRatio < 1) {
      rowSpanSize = roundHalf(rowSpanSize * (aspectRatio + 1));
    } else if (aspectRatio > 1) {
      columnSpanSize = roundHalf(columnSpanSize * aspectRatio);
    }
    element.setAttribute('style', `grid-column: span ${Math.ceil(columnSpanSize)}; grid-row: span ${Math.ceil(rowSpanSize)};`)
  };

  _getAspectRatio = () => {
    const width = this._cardObj.files.content.dimension.width;
    const height = this._cardObj.files.content.dimension.height;
    // console.log(width, height)
    return (width / height);
  };

  _setMinMaxLikesCount = () => {
    const likesCountArr = this._cardsArr.map(elem => elem.likes.length);
    this._maxLikesCount = Math.max.apply(Math, likesCountArr);
    this._minLikesCount = Math.min.apply(Math, likesCountArr);
  }

  _getIncreaseMultiplier = () => {
    const minMultiplier = 1;
    const maxMultiplier = this._config.maxFileSize / this._config.minFileSize
    const clamp = (curr, min = 0, max = 1) => Math.min(max, Math.max(min, curr));
    const invlerp = (min, max, curr) => clamp((curr - min) / (max - min));
    return minMultiplier + (maxMultiplier - minMultiplier) * invlerp(this._minLikesCount, this._maxLikesCount, this._likesCount);
  }

}
