import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, sendRegDataToApi) {
    super(container, markup);
    this._sendDataToApi = sendRegDataToApi;
  }
  _submitAction = (data) => {
    localStorage.setItem('token', data.token);
};
}
