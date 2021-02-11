import { FormPopup } from './FormPopup';

export class SigninPopup extends FormPopup {
  constructor(markup, container, sendAuthDataToApi) {
    super(container, markup);
    this._sendDataToApi = sendAuthDataToApi;
  }
  _submitAction = (data) => {
    localStorage.setItem('token', data.token);
};
}