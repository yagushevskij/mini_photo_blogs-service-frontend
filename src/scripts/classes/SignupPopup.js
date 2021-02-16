import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendRegDataToApi, userPageUrl) {
    super(container, markup, setValidateListeners, removeValidateListeners, sendRegDataToApi);
    this._userPageUrl = userPageUrl;
  }
  _submitAction = (data) => {
    localStorage.setItem('token', data.token);
    // localStorage.setItem('userId', data.user._id);
    // localStorage.setItem('username', data.user.username);
    document.location.href = this._userPageUrl + data.user.username;
};
}
