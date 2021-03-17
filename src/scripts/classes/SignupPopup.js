import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(params) {
    super();
    const {
      template, container, sendDataToApi, updateUserData, setValidateListeners,
      removeValidateListeners, setServerError, renderPage,
    } = params;
    this._template = template;
    this._container = container;
    this._sendDataToApi = sendDataToApi;
    this._updateUserData = updateUserData;
    this._setValidateListeners = setValidateListeners;
    this._removeValidateListeners = removeValidateListeners;
    this._setServerError = setServerError;
    this._renderPage = renderPage;
  }

  _submitAction = () => {
    this._updateUserData(this._result);
    this._renderPage();
  }

  _submit = (event) => {
    event.preventDefault();
    this._changeButtonText();
    this._setFormData();
    super._submit();
  }
}
