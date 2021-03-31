import { Popup } from './Popup';

export class ImagePopup extends Popup {
  constructor(params) {
    super();
    const {
      container, template, config, renderAsyncImage,
    } = params;
    this._container = container;
    this._template = template;
    this._config = config;
    this._renderAsyncImage = renderAsyncImage;
  }

  _create = () => {
    super._create();
    this._toggleLoader();
    const imgElem = this._view.querySelector('.popup__image-content');
    this._renderAsyncImage({
      url: this._data,
      element: imgElem,
      config: this._config,
      callbacks: [this._render, this._toggleLoader],
    });
  }

  _toggleLoader = () => {
    const loader = this._container.querySelector('.loader');
    loader.classList.toggle('hidden');
  }

  _render = () => {
    this._container.append(this._view);
  }

  _close = () => {
    super._close();
  }
}
