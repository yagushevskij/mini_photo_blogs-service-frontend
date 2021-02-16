export class FormValidator {

  constructor(configText) {
    this.validationMessages = configText.validationMessages;
    this.inputClassName = configText.inputClassName;
  };

  _validate = () => {
    const errorEl = this._input.nextElementSibling;
    if (this._input.validity.valueMissing) {
      errorEl.textContent = this.validationMessages.required;
    }
    else if (this._input.validity.tooLong) {
      errorEl.textContent = this.validationMessages.tooLong + ' ' + this._input.maxLength;
    }
    else if (this._input.validity.tooShort) {
      errorEl.textContent = this.validationMessages.tooShort + ' ' + this._input.minLength;
    }
    else if (this._input.validity.typeMismatch && this._input.type === 'url') {
      errorEl.textContent = this.validationMessages.requiredLink;
    }
    else if (this._input.validity.typeMismatch && this._input.type === 'email') {
      errorEl.textContent = this.validationMessages.requiredEmail;
    }
    else {
      errorEl.textContent = '';
    }
    this._setSubmitButtonState();
  }

  _checkInputValidity = (event) => {
    this._input = event.target
    this._validate();
  };

  _setSubmitButtonState = () => {
    const submitButton = this._form.querySelector('button');
    const isFormValid = this._form.checkValidity();
    submitButton.disabled = !isFormValid;
  };

  _validateFormByEnter = () => {
    if (event.keyCode === 13) {
      Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
        this._input = elem;
        this._validate();
      });
    }
  }

  setEventListeners = (form) => {
    this._form = form;
    Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
      elem.addEventListener('input', this._checkInputValidity);
      elem.addEventListener('keydown', this._validateFormByEnter);
    });
  };

  removeEventListeners = () => {
    Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
      elem.removeEventListener('input', this._checkInputValidity);
    });
  };
}
