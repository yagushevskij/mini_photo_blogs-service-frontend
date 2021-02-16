import { FormPopup } from './FormPopup';

export class CardPopup extends FormPopup {
  constructor(markup, container, setValidateListeners, removeValidateListeners, sendCardToApi, addCard) {
    super(container, markup, setValidateListeners, removeValidateListeners, sendCardToApi);
    this._addCard = addCard;
  }

  _submitAction = (obj) => {
    this._addCard(obj);
  }
}
