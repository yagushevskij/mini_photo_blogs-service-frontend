import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, setValidateListeners, removeValidateListeners, sendUserDataToApi, updateUserInfo, updateUserMenu) {
        super(container, markup, setValidateListeners, removeValidateListeners, sendUserDataToApi);
        this._updateUserInfo = updateUserInfo;
        this._updateUserMenu = updateUserMenu;
    };

    _updateInformation = (userData) => {
        Array.from(this._view.querySelectorAll('.popup__input')).forEach((elem) => {
            elem.value = userData[elem.name];
        })
    };

    _submitAction = (userData) => {
      this._updateUserInfo(userData);
      this._updateUserMenu(userData);
    };
}
