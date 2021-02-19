import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendRegDataToApi, userPageUrl) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    this._userPageUrl = userPageUrl;
    this._sendDataToApi = sendRegDataToApi;
  }
  _submitAction = () => {
    localStorage.setItem('token', this._result.token);
    // localStorage.setItem('userId', data.user._id);
    // localStorage.setItem('username', data.user.username);
    document.location.href = this._userPageUrl + this._result.user.username;
  };

  _submit = () => {
    super._submit();
  }
}
