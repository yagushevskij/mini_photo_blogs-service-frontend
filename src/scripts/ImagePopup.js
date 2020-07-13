'use strict';
import {Popup} from './Popup.js';
export class ImagePopup extends Popup {

    constructor(markup, container) {
        super(container, markup);
    }

    create = (link) => {
        super.create();
        this._view.querySelector('.popup__image-content').setAttribute('src', link);
    };
}
