import {Popup} from './Popup';
export class ImagePopup extends Popup {

    constructor(markup, container) {
        super(container, markup);
    }

    _create = (data) => {
        super._create();
        this._view.querySelector('.popup__image-content').setAttribute('src', data);
    };

    _close = () => {
      super._close();
    }
}
