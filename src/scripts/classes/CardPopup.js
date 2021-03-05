import { FormPopup } from './FormPopup';

export class CardPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendCardToApi, uploadCard, addCard) {
    super(container, markup, setValidateListeners, removeValidateListeners);
    this._addCard = addCard;
    this._sendCardToApi = sendCardToApi
    this._uploadCard = uploadCard;
  }

  _submit = () => {
    event.preventDefault();
    this._changeButtonText();
    this._setFormData()
    this._sendDataToApi = this._isFileUploadExist() ? this._uploadCard : this._sendCardToApi;
    super._submit();
  }

  _submitAction = () => {
    this._addCard(this._result);
  }

  _isFileUploadExist = () => this._formData.has('picture') ? true : false;
};
