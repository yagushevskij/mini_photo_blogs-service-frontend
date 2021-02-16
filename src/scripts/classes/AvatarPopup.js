import { FormPopup } from './FormPopup.js';
export class AvatarPopup extends FormPopup {

  constructor(markup, container, setValidateListeners, removeValidateListeners, sendAvatarDataToApi, updateUserInfo, updateUserMenu) {
    super(container, markup, setValidateListeners, removeValidateListeners, sendAvatarDataToApi);
    this._updateUserInfo = updateUserInfo;
    this._updateUserMenu = updateUserMenu;
  };

  _submitAction = (userData) => {
    this._updateUserInfo(userData);
    this._updateUserMenu(userData);
  };
}
