import { Popup } from './Popup';

export class ImagePopup extends Popup {
  constructor(params) {
    super();
    const { container, template } = params;
    this._container = container;
    this._template = template;
  }

  _create = () => {
    super._create();
    this._view.querySelector('.popup__image-content').setAttribute('src', this._data);
  }

  _close = () => {
    super._close();
  }
}
