import { FormPopup } from './FormPopup';

export class SigninPopup extends FormPopup {
  constructor(markup, container, sendAuthDataToApi) {
    super(container, markup);
    this._sendDataToApi = sendAuthDataToApi;
  }
  _submitAction = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.user._id);
    localStorage.setItem('username', data.user.username);
};
}