export class FormValidator {

  constructor(form, configText) {
    this._form = form;
    this.validationMessages = configText.validationMessages;
    this.inputClassName = configText.inputClassName;
    console.log(this.validationMessages, this.inputClassName)
  };

  _checkInputValidity = () => {
    const input = event.target;
    const errorEl = input.nextElementSibling;
    if (input.validity.valueMissing) {
      errorEl.textContent = this.validationMessages.required;
    }
    else if (input.validity.tooLong) {
      errorEl.textContent = this.validationMessages.tooLong + ' ' + input.maxLength;
    }
    else if (input.validity.tooShort) {
      errorEl.textContent = this.validationMessages.tooShort + ' ' + input.minLength;
    }
    else if (input.validity.typeMismatch && input.type === 'url') {
      errorEl.textContent = this.validationMessages.requiredLink;
    }
    else if (input.validity.typeMismatch && input.type === 'email') {
      errorEl.textContent = this.validationMessages.requiredEmail;
    }
    else {
      errorEl.textContent = '';
    }
    this._setSubmitButtonState();
  };

  _setSubmitButtonState = () => {
    const submitButton = this._form.querySelector('button');
    const isFormValid = this._form.checkValidity();
    submitButton.disabled = !isFormValid;
  };

  setEventListeners = () => {
    Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
      elem.addEventListener('input', this._checkInputValidity);
    });
  };

  removeEventListeners = () => {
    Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
      elem.removeEventListener('input', this._checkInputValidity);
    });
  };
}
