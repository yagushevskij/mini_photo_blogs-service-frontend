import { FormPopup } from './FormPopup.js';
export class AvatarPopup extends FormPopup {

  constructor(markup, container, setValidateListeners, removeValidateListeners, sendAvatarDataToApi, updateUserInfo, updateUserMenu) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    this._updateUserInfo = updateUserInfo;
    this._updateUserMenu = updateUserMenu;
    this._sendDataToApi = sendAvatarDataToApi;
  };

  _submitAction = () => {
    this._updateUserInfo(this._result);
    this._updateUserMenu(this._result);
  };

  _submit = () => {
    super._submit();
  }
}
