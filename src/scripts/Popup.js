'use strict';
export class Popup {

  constructor(container, markup) {
    this._container = container;
    this._markup = markup;
  };

  open = () => {
    this._container.classList.toggle('popup_is-opened');
    this._setEventListeners();
  };

  _close = () => {
    this._container.classList.remove('popup_is-opened');
    this._removeEventListeners();
    this._view.remove();
  };

  create() {
    this._view = this._markup.content.cloneNode(true).children[0];
    this._container.append(this._view);
  }

  _setEventListeners() {
    this._view.querySelector('.popup__close').addEventListener('click', this._close);
    // document.addEventListener('keydown', () => { this._escPopup(event) });
  };

  _removeEventListeners() {
    this._view.querySelector('.popup__close').removeEventListener('click', this._close);
    // document.removeEventListener('keydown', () => { this._escPopup(event) });
  };

  // _escPopup = (event) => {
  //   if (event.keyCode == 27) {
  //     this._close();
  //   }
  // };

}
