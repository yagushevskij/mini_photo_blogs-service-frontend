import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, sendRegDataToApi) {
    super(container, markup);
    this._sendDataToApi = sendRegDataToApi;
  }
  _submitAction = (obj) => {
    // this._userInfo.setUserInfo(obj);
    // this._userInfo.updateUserInfo();
};
}
