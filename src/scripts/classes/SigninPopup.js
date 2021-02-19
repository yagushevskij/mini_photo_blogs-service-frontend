import { FormPopup } from './FormPopup';

export class SigninPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendAuthDataToApi, userPageUrl) {
    super(container, markup, setValidateListeners, removeValidateListeners, sendAuthDataToApi);
    this._userPageUrl = userPageUrl;
  }
  _submitAction = () => {
    localStorage.setItem('token', this._result.token);
    // localStorage.setItem('userId', data.user._id);
    // localStorage.setItem('username', data.user.username);
    document.location.href = this._userPageUrl + this._result.user.username;
};
}