import {Popup} from './Popup';
export class ErrorPopup extends Popup {

    constructor(markup, container) {
        super(container, markup);
    }

    _create = () => {
        super._create();
        this._view.querySelector('.popup__description').textContent = this._data;
    };

    _close = () => {
      super._close();
    }
}
