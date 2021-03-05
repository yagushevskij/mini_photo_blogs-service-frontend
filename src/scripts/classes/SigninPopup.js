import { FormPopup } from './FormPopup';

export class SigninPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendAuthDataToApi) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    // this._getUserPageUrl = getUserPageUrl;
    this._sendDataToApi = sendAuthDataToApi;
  }
  _submitAction = () => {
    localStorage.setItem('token', this._result.token);
    // localStorage.setItem('userId', data.user._id);
    // localStorage.setItem('username', data.user.username);
    // document.location.href = this._userPageUrl + this._result.user.username;
  };

  _submit = () => {
    event.preventDefault();
    this._changeButtonText();
    this._setFormData();
    super._submit();
  }
}