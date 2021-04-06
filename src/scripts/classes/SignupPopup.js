import { FormPopup } from './FormPopup';

export class SignupPopup extends FormPopup {
  constructor(params) {
    super();
    const {
      template, container, sendDataToApi, updateUserData, renderPage, createFormValidator,
      openSigninPopup,
    } = params;
    this._template = template;
    this._container = container;
    this._sendDataToApi = sendDataToApi;
    this._updateUserData = updateUserData;
    this._formValidator = createFormValidator();
    this._renderPage = renderPage;
    this._openSigninPopup = openSigninPopup;
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

  _setHandlers() {
    super._setHandlers();
    const signupButton = this._view.querySelector('.popup__link_signin');
    this._handlersArr.push({
      element: signupButton,
      event: 'click',
      callbacks: [this._openSigninPopup, this._close],
    });
  }
}
