'use strict';
/*
    +Надо исправить: Имелось ввиду создание класса FormPopup, который наследуется от Popup,
    а ProfilePopup, CardPopup, AvatarPopup наследуются от FormPopup.
    В классах с формами сейчас также присутствует одинаковый код: добавление/удаление обработчиков событий,
    сабмит формы по структуре одинаков (различаются только вызов метода апи и обработка результата выполнения запроса),
    создание валидатора также необходимо делать в конструкторе и выглядеть это будет одинаково для всех.
    Текущий вариант тоже право на существование, но тогда его не надо называть попапом,
    можно переименовать, например, в FormHelper, так как в данный момент это набор вспомогательных функций.
 */
class FormPopup extends Popup {

    constructor(container, markup) {
        super(container, markup)
    }

    create = (formValidator) => {
        super.create();
        this._formValidator = formValidator(this._view);
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

    _apiParamsUpdate = () => {
        this._apiParams.data = this._getDataObj(this._view);
        return this._apiParams;
    };

    _changeButtonText = (elem) => {
        elem.querySelector('.button').textContent = 'Загрузка...';
    };

    _submit = () => {
        /*
        Можно лучше: event не передан в функцию.
        Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
        https://developer.mozilla.org/en-US/docs/Web/API/Window/event
       */
        event.preventDefault();
        this._changeButtonText(this._view);
        this._api.createData(this._apiParamsUpdate())
            .then((obj) => {
                this._submitAction(obj);
            })
            .then(() => this._close())
            .catch((err) => {
                console.log(err);
            });
    };

    _setEventListeners = () => {
        super._setEventListeners();
        this._view.addEventListener('submit', this._submit);
        // document.addEventListener('keydown', () => { this._escPopup(event) });
        this._formValidator.setEventListeners();
    }

    _removeEventListeners = () => {
        super._removeEventListeners();
        this._view.removeEventListener('submit', this._submit);
        // document.removeEventListener('keydown', () => { this._escPopup(event) });
        this._formValidator.removeEventListeners();
    };
}
