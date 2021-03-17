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

  setServerError = (message) => {
    const errorEl = this._form.querySelector('.error-message_type_server')
    console.log(this._form)
    errorEl.textContent = message;
  };

  _isDataFormatValid = () => {
    const regExp = (ext) => new RegExp(`\\.*${ext}`);
    const result = this._extArray.some(ext => regExp(ext.toLowerCase()).test(this._input.value.toLowerCase()));
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
    const isInputedElemExist = inputsArr.some(el => (el.value));
    if (isInputedElemExist) {
      inputsArr.forEach((el) => {
        if (!el.value) {
          el.setAttribute('disabled', 'disabled');
        }
        el.setCustomValidity('');
      });
    } else {
      inputsArr.forEach((el) => {
        if (!el.value) {
          el.removeAttribute('disabled', 'disabled');
        }
        el.setCustomValidity(this.validationMessages.groupRequired);
      });
    }
  };

  _checkInputValidity = (event) => {
    if (event.target.classList.contains('popup__input')) { // Привязываемся к классу для исключения валидации радиокнопок и прочих ненужных вещей;
      this._input = event.target;
      this._validateGroupInputs();
      this._validateByExtension();
      this._setValidationError();
      this._checkForm();
      this._setSubmitButtonState();
    };
    return;
  };
  
  _checkForm = () => {
    this._isFormValid = this._form.checkValidity();
    if (this._isFormValid) {
      this._resetClientErrors();
    }
  }

  _resetClientErrors = () => {
    const errorsArr = Array.from(this._form.querySelectorAll('.error-message_type_client'));
    errorsArr.forEach(el => el.textContent = '');
  }

  _setSubmitButtonState = () => {
    const submitButton = this._form.querySelector('button');
    submitButton.disabled = !this._isFormValid;
  };

  // _setHandlers = () => {
  //   this._handlersArr = [];
  //   Array.from(this._form.querySelectorAll(this.inputClassName)).forEach((elem) => {
  //     this._handlersArr.push({
  //       element: elem,
  //       event: 'input',
  //       callbacks: [this._checkInputValidity],
  //     });
  //   });
  // }

  setEventListeners = (form) => {
    this._form = form;
    this._form.addEventListener('input', this._checkInputValidity);
  };

  removeEventListeners = () => {
    this._form.removeEventListener('input', this._checkInputValidity);
    // this._removeEventListeners();
  };
}
