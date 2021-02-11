'use strict';
import {FormPopup} from './FormPopup.js';
export class AvatarPopup extends FormPopup {

    constructor(markup, container, userInfo, sendAvatarDataToApi) {
        super(container, markup);
        this._userInfo = userInfo;
        this._sendDataToApi = sendAvatarDataToApi;
    };

    _submitAction = (obj) => {
        this._userInfo.setUserInfo(obj);
        this._userInfo.updateUserInfo();
    };
}
