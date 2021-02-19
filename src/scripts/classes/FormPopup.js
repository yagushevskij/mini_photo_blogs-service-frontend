import { Popup } from './Popup.js';
export class FormPopup extends Popup {

  constructor(container, markup, setValidateListeners, removeValidateListeners) {
    super(container, markup)
    this._setValidateListeners = setValidateListeners;
    this._removeValidateListeners = removeValidateListeners;
  }

  create = () => {
    super.create();
    const form = this._view.querySelector('.popup__form')
    this._setValidateListeners(form);
  };

  _close = () => {
    super._close();
    this._removeValidateListeners();
  };

  _getFormData = () => {
    this._formData = new FormData();
    const inputsArr = Array.from(this._view.querySelector('form').elements)
      .filter((elem) => (!elem.classList.contains('button') && (elem.value)));
    inputsArr.forEach((elem) => {
      (elem.type === 'file') ? this._formData.append(elem.name, elem.files[0]) : this._formData.append(elem.name, elem.value);
    })
    return this._formData;
  }

  _changeButtonText = () => {
    this._view.querySelector('button').textContent = 'Загрузка...';
  };

  _submit() {
    event.preventDefault();
    this._changeButtonText();
    this._getFormData();
    this._sendDataToApi(this._formData)
      .then((obj) => {
        this._result = obj;
        this._submitAction();
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
    },
    )
  };
}
