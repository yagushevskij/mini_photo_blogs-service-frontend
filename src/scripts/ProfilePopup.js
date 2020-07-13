'use strict';
import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, userInfo, api) {
        super(container, markup);
        this._userInfo = userInfo;
        this._api = api;
        this._apiParams = { url: api.userApiUrl, method: 'PATCH' };
    };

    /*
        Можно лучше: Метод не возвращает информацию, а обновляет. Лучше назвать, например, updateInformation.
     */
    getInformation = () => {
        Array.from(this._view.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.value = this._userInfo.obj[elem.name];
        })
    };

    _submitAction = (obj) => {
        this._userInfo.setUserInfo(obj);
        this._userInfo.updateUserInfo();
    };
}
