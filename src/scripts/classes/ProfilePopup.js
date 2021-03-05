import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, setValidateListeners, removeValidateListeners, sendUserDataToApi, updateUserInfo, updateUserMenu) {
        super(container, markup, setValidateListeners, removeValidateListeners);
        this._updateUserInfo = updateUserInfo;
        this._updateUserMenu = updateUserMenu;
        this._sendDataToApi = sendUserDataToApi;
    };

    updateInformation = (userData) => {
        Array.from(this._view.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.value = userData[elem.name];
        })
    };

    _submitAction = () => {
      this._updateUserInfo(this._result);
      this._updateUserMenu(this._result);
    };

    _submit = () => {
      event.preventDefault();
      this._changeButtonText();
      this._setFormData();
      super._submit();
    }
}
