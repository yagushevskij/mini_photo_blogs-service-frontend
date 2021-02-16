import {FormPopup} from './FormPopup.js';
export class ProfilePopup extends FormPopup {

    constructor(markup, container, createFormValidator, sendUserDataToApi, updateUserInfo, updateUserMenu) {
        super(container, markup, createFormValidator, sendUserDataToApi);
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
