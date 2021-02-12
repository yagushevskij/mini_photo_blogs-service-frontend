'use strict';
import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, userInfo, sendUserDataToApi) {
        super(container, markup);
        this._userInfo = userInfo;
        this._sendDataToApi = sendUserDataToApi;
    };

    /*
        Можно лучше: Метод не возвращает информацию, а обновляет. Лучше назвать, например, updateInformation.
     */
    getInformation = () => {
        Array.from(this._view.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.value = this._userInfo.obj[elem.name];
        })
    };

    _submitAction = (userData) => {
      this._userInfo.setUserInfo(userData)
      this._userInfo.updateUserInfo();
    };
}
