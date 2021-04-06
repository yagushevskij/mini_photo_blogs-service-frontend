import { FormPopup } from './FormPopup';

export class CardPopup extends FormPopup {
  constructor(params) {
    super();
    const {
      template, container, addCard, sendCardToApi, uploadCard, createFormValidator,
    } = params;
    this._template = template;
    this._container = container;
    this._formValidator = createFormValidator();
    this._addCard = addCard;
    this._sendCardToApi = sendCardToApi;
    this._uploadCard = uploadCard;
  }

  _submit = (event) => {
    event.preventDefault();
    this._setFormData();
    this._sendDataToApi = this._isFileUploadExist() ? this._uploadCard : this._sendCardToApi;
    super._submit();
  }

  _submitAction = () => {
    this._addCard(this._result);
  }

  _isFileUploadExist = () => this._formData.has('picture');
}
