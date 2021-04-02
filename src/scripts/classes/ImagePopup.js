import { Popup } from './Popup';

export class ImagePopup extends Popup {
  constructor(params) {
    super();
    const {
      container, template, config, renderAsyncImage, loader
    } = params;
    this._container = container;
    this._template = template;
    this._config = config;
    this._renderAsyncImage = renderAsyncImage;
    this._loader = loader;
  }

  _create = () => {
    super._create();
    const imgElem = this._view.querySelector('.popup__image-content');
    this._loader.show({ container: this._container });
    this._renderAsyncImage({
      url: this._data,
      element: imgElem,
      config: this._config,
      callbacks: [this._render, this._loader.remove],
    });
  }

  _render = () => {
    this._container.append(this._view);
  }

  _close = () => {
    super._close();
  }
}
