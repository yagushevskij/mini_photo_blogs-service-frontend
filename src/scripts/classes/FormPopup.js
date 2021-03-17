import { Popup } from './Popup.js';
export class FormPopup extends Popup {

  constructor(container, markup, setValidateListeners, removeValidateListeners, setServerError) {
    super(container, markup)
    this._setValidateListeners = setValidateListeners;
    this._removeValidateListeners = removeValidateListeners;
    this._setServerError = setServerError;
  }

  _create = () => {
    super._create();
    const form = this._view.querySelector('.popup__form')
    this._setValidateListeners(form);
  };

  _close = () => {
    super._close();
    this._removeValidateListeners();
  };

  _setFormData() {
    this._formData = new FormData();
    const inputsArr = Array.from(this._view.querySelector('form').elements)
      .filter((elem) => (!elem.classList.contains('button') && (elem.value)));
    inputsArr.forEach((elem) => {
      (elem.type === 'file') ? this._formData.append(elem.name, elem.files[0]) : this._formData.append(elem.name, elem.value);
    })
  }

  _changeButtonText = () => {
    this._view.querySelector('button').textContent = 'Загрузка...';
  };

  _submit() {
    this._sendDataToApi(this._formData)
      .then((obj) => {
        this._result = obj;
        this._submitAction();
      })
      .then(() => this._close())
      .catch((err) => {
        console.log(err);
        this._setServerError(err);
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
