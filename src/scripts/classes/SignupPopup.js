import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendRegDataToApi, renderPage, updateUserData) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    // this._getUserPageUrl = getUserPageUrl;
    this._sendDataToApi = sendRegDataToApi;
    this._renderPage = renderPage;
    this._updateUserData = updateUserData;
  }
  // _setFormData = () => {
  //   super._setFormData();
  //   const username = this._formData.get('username')
  //   this._formData.append('pageUrl', this._getUserPageUrl(username));
  // };

  _submitAction = () => {
    this._updateUserData(this._result);
    this._renderPage();
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
