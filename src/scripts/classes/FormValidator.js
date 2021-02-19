import { BaseComponent } from './BaseComponent';

export class FormValidator extends BaseComponent {
  constructor(configText, fileExtensions) {
    super();
    this.validationMessages = configText.validationMessages;
    this.inputClassName = configText.inputClassName;
    this.picExtArr = fileExtensions.picture;
  };

  _setValidationError = () => {
    const errorEl = this._input.nextElementSibling;
    errorEl.textContent = 
    (this._input.validity.valueMissing) ? this.validationMessages.required :
    (this._input.validity.tooLong) ? this.validationMessages.tooLong + ' ' + this._input.maxLength :
    (this._input.validity.tooShort) ? this.validationMessages.tooShort + ' ' + this._input.minLength :
    (this._input.validity.typeMismatch && this._input.type === 'url') ? this.validationMessages.requiredLink :
    (this._input.validity.typeMismatch && this._input.type === 'email') ? this.validationMessages.requiredEmail :
    (this._input.validity.customError) ? this._input.validationMessage : '';
  }

  _isDataFormatValid = () => {
    const regExp = (ext) => new RegExp(`\\.*${ext}`);
    const result = this._extArray.some(ext => regExp(ext).test(this._input.value));
    return result;
  }

  _validateByExtension = () => {
    const pictureClass = 'popup__input_filetype_picture';
    if (this._input.classList.contains(pictureClass) && (this._input.value)) {
      this._extArray = this.picExtArr;
      (this._isDataFormatValid()) ? this._input.setCustomValidity('') : this._input.setCustomValidity(this.validationMessages.requiredPicture
        + ' ' + this.picExtArr.join(', '));
    }
  }

  _validateGroupInputs = () => {
    const inputsArr = Array.from(this._form.querySelectorAll('.popup__input_type_group'));
    const isFullInputExist = inputsArr.some(el => (el.value));
    if (isFullInputExist) {
      inputsArr.forEach((el) => {
        (!el.value) ? el.setAttribute('disabled', 'disabled') : false;
        el.setCustomValidity('');
      });
    } else {
      inputsArr.forEach((el) => {
        (!el.value) ? el.removeAttribute('disabled', 'disabled') : false
        el.setCustomValidity(this.validationMessages.groupRequired);
      });
    }
  };

  _checkInputValidity = (event) => {
    this._input = event.target
    this._validateGroupInputs();
    this._validateByExtension();
    this._setValidationError();
    this._setSubmitButtonState();
  };

  _setSubmitButtonState = () => {
    const submitButton = this._form.querySelector('button');
    const isFormValid = this._form.checkValidity();
    submitButton.disabled = !isFormValid;
  };

  _setHandlers = () => {
    this._handlersArr = [];
    Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
      this._handlersArr.push({
        element: elem,
        event: 'input',
        callbacks: [this._checkInputValidity],
      });
    });
  }

  setEventListeners = (form) => {
    this._form = form;
    this._setHandlers()
    this._setEventListeners();
  };

  removeEventListeners = () => {
    this._removeEventListeners();
  };
}
