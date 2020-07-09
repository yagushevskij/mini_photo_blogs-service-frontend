'use strict';
class FormValidator {

    constructor(popup) {
        this._form = popup.querySelector('.popup__form');
    };

    _checkInputValidity = () => {
        /*
          Можно лучше: event не передан в функцию.
          Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
          https://developer.mozilla.org/en-US/docs/Web/API/Window/event
         */
        const input = event.target;
        this._errorEl = input.nextElementSibling;

        if (input.validity.valueMissing) {
            this._errorEl.textContent = 'Это обязательное поле';
        }
        else if (input.validity.tooLong || input.validity.tooShort) {
            this._errorEl.textContent = 'Должно быть от 2 до 30 символов';
        }
        else if (input.validity.typeMismatch && input.type === 'url') {
            this._errorEl.textContent = 'Здесь должна быть ссылка';
        }
        else {
            this._errorEl.textContent = '';
        }
        this._setSubmitButtonState();
    };

    _setSubmitButtonState = () => {
        const _submitButton = this._form.querySelector('.popup__button');
        const _isFormValid = this._form.checkValidity();
        _submitButton.disabled = !_isFormValid;
    };

    setEventListeners = () => {
        /*
            +Можно лучше: Инпуты лучше искать по классу popup__input, ане по тегу, так как может быть инпут-кнопка:
            https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit
         */
        Array.from(this._form.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.addEventListener('input', this._checkInputValidity);
        });
    };

    removeEventListeners = () => {
        Array.from(this._form.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.removeEventListener('input', this._checkInputValidity);
        });
    };
}
