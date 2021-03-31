import { Popup } from './Popup';

export class ImagePopup extends Popup {
  constructor(params) {
    super();
    const { container, template, config } = params;
    this._container = container;
    this._template = template;
    this._config = config;
  }

  _create = () => {
    super._create();
    this._toggleLoader();
    this._imgElem = this._view.querySelector('.popup__image-content');
    this._createAsyncImage()
      .then(() => {
        this._isImageLoaded() ? this._setBackgroundImage() : this._setDefaultImage();
      })
      .catch(() => this._setDefaultImage())
      .finally(() => {
        this._toggleLoader();
        this._container.append(this._view);
      });
  }

  _createAsyncImage = () => new Promise((resolve, reject) => {
    this._img = new Image();
    this._img.onload = () => resolve();
    this._img.onerror = () => reject(
      new Error(this._config.errLoadMsg(this._data)),
    );
    this._img.src = this._data;
  });

  _isImageLoaded = () => {
    if (!this._img.complete) {
      return false;
    }
    if (this._img.naturalWidth + this._img.naturalHeight === 0) {
      return false;
    }
    return true;
  }

  _setDefaultImage = () => {
    this._imgElem.src = this._config.errThumbUrl;
  }

  _setBackgroundImage = () => {
    this._imgElem.src = this._data;
  }

  _toggleLoader = () => {
    const loader = this._container.querySelector('.loader');
    loader.classList.toggle('hidden');
    // this._container.append(this._view);
  }

  _close = () => {
    super._close();
  }
}
