import { FormPopup } from './FormPopup';

export class AvatarPopup extends FormPopup {
  constructor(params) {
    super();
    const {
      template, container, sendDataToApi, updateUserData, setValidateListeners,
      removeValidateListeners, setServerError, updateUserInfo, updateUserMenu,
    } = params;
    this._template = template;
    this._container = container;
    this._sendDataToApi = sendDataToApi;
    this._updateUserData = updateUserData;
    this._setValidateListeners = setValidateListeners;
    this._removeValidateListeners = removeValidateListeners;
    this._setServerError = setServerError;
    this._updateUserInfo = updateUserInfo;
    this._updateUserMenu = updateUserMenu;
  }

  _submitAction = () => {
    this._updateUserInfo(this._result);
    this._updateUserMenu(this._result);
  };

  _submit = (event) => {
    event.preventDefault();
    this._changeButtonText();
    this._setFormData();
    super._submit();
  }
}
