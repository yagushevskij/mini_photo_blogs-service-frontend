'use strict';
import { FormPopup } from './FormPopup.js';
export class AvatarPopup extends FormPopup {

  constructor(markup, container, createFormValidator, sendAvatarDataToApi, userInfo) {
    super(container, markup, createFormValidator, sendAvatarDataToApi);
    this._userInfo = userInfo;
  };

  _submitAction = (userData) => {
    this._userInfo.setUserInfo(userData);
    this._userInfo.updateUserInfo();
  };
}
