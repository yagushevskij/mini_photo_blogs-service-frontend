import { Popup } from './Popup.js';
export class FormPopup extends Popup {

  constructor(container, markup, createFormValidator, sendCardToApi) {
    super(container, markup, createFormValidator, sendCardToApi)
  }

  create = () => {
    super.create();
    const form = this._view.querySelector('.popup__form')
    this._formValidator = this._createFormValidator(form);
  };

  _getDataObj = (elem) => {
    this._obj = {};
    Array.from(elem.querySelector('form').elements).forEach((elem) => {
      if (!elem.classList.contains('button')) {
        this._obj[elem.name] = elem.value;
      }
    });
    return this._obj;
  };

  _changeButtonText = (elem) => {
    elem.querySelector('button').textContent = 'Загрузка...';
  };

  _submit = () => {
    event.preventDefault();
    this._changeButtonText(this._view);
    this._sendDataToApi(this._getDataObj(this._view))
      .then((obj) => {
        this._submitAction(obj);
      })
      .then(() => this._close())
      .catch((err) => {
        console.log(err);
      });
  };

  _setHandlers() {
    super._setHandlers();
    this._handlersArr.push({
      element: this._view,
      event: 'submit',
      callbacks: [this._submit],
    })
  };
}
