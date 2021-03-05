import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendRegDataToApi) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    // this._getUserPageUrl = getUserPageUrl;
    this._sendDataToApi = sendRegDataToApi;
  }
  // _setFormData = () => {
  //   super._setFormData();
  //   const username = this._formData.get('username')
  //   this._formData.append('pageUrl', this._getUserPageUrl(username));
  // };

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
