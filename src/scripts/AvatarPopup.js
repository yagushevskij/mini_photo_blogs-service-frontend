'use strict';
import {FormPopup} from './FormPopup.js';
export class AvatarPopup extends FormPopup {

    constructor(markup, container, userInfo, api) {
        super(container, markup);
        this._userInfo = userInfo;
        this._api = api;
        this._apiParams = { url: api.userApiUrl + '/' + api.paths.avatar, method: 'PATCH' };
    };

    _submitAction = (obj) => {
        this._userInfo.setUserInfo(obj);
        this._userInfo.updateUserInfo();
    };
}
