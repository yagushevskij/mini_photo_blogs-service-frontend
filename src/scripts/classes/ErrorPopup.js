import { Popup } from './Popup';

export class ErrorPopup extends Popup {
  constructor(params) {
    super();
    const { container, template } = params;
    this._container = container;
    this._template = template;
  }

  _create = () => {
    super._create();
    this._view.querySelector('.popup__description').textContent = this._data;
  };

  _close = () => {
    super._close();
  }
}
