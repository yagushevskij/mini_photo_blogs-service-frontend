'use strict';
import { FormPopup } from './FormPopup.js';
export class AvatarPopup extends FormPopup {

  constructor(markup, container, userInfo, sendAvatarDataToApi) {
    super(container, markup);
    this._userInfo = userInfo;
    this._sendDataToApi = sendAvatarDataToApi;
  };

  _submitAction = (userData) => {
    this._userInfo.setUserInfo(userData);
    this._userInfo.updateUserInfo();
  };
}
