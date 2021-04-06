import { FormPopup } from './FormPopup';

export class ProfilePopup extends FormPopup {
  constructor(params) {
    super();
    const {
      template, container, sendDataToApi, updateUserData, createFormValidator,
      updateUserInfo, updateUserMenu,
    } = params;
    this._template = template;
    this._container = container;
    this._sendDataToApi = sendDataToApi;
    this._updateUserData = updateUserData;
    this._formValidator = createFormValidator();
    this._updateUserInfo = updateUserInfo;
    this._updateUserMenu = updateUserMenu;
  }

  _create = () => {
    super._create();
    this._fillInputs();
  }

  _submitAction = () => {
    this._updateUserInfo(this._result);
    this._updateUserMenu(this._result);
  }

  _submit = (event) => {
    event.preventDefault();
    this._changeButtonText();
    this._setFormData();
    super._submit();
  }
}
