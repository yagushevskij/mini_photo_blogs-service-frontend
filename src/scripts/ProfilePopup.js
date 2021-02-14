'use strict';
import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, createFormValidator, sendUserDataToApi, userInfo) {
        super(container, markup, createFormValidator, sendUserDataToApi);
        this._userInfo = userInfo;
    };

    /*
        Можно лучше: Метод не возвращает информацию, а обновляет. Лучше назвать, например, updateInformation.
     */
    getInformation = () => {
      console.log(this._view)
        Array.from(this._view.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.value = this._userInfo.obj[elem.name];
        })
    };

    _submitAction = (userData) => {
      this._userInfo.setUserInfo(userData)
      this._userInfo.updateUserInfo();
    };
}
