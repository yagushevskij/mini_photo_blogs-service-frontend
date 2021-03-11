import { BaseComponent } from './BaseComponent';

export class UserInfo extends BaseComponent {

  constructor(container, template, openCardPopup, openAvatarPopup, openProfilePopup, textParams) {
    super();
    this._container = container;
    this._template = template;
    this._openCardPopup = openCardPopup;
    this._openAvatarPopup = openAvatarPopup;
    this._openProfilePopup = openProfilePopup;
    this._textParams = textParams;
  };

  setUserInfo = () => {
    Object.keys(this._userPageData).forEach((elem) => {
      this[elem] = this._userPageData[elem];
    });
  };

  update = (userData) => {
    (userData) ? this._userPageData = userData : false;
    this._textParams.forEach((param) => {
      this._container.querySelector(`.user-info__${param}`).textContent = this._userPageData[param];
    });
    this._avatarBtn.setAttribute("style", `background-image: url(${this._userPageData.avatar})`);
  };

  render = (userAuthData, userPageData) => {
    this._userPageData = userPageData;
    this._userAuthData = userAuthData;
    this._create()
    this._container.appendChild(this._view);
    this.setUserInfo();
    this.update();
  }

  _create = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    const addCardBtn = this._view.querySelector('.user-info__button');
    const editProfileBtn = this._view.querySelector('.user-info__edit-button');
    this._avatarBtn = this._view.querySelector('.user-info__avatar');
    if (this._userAuthData && this._isUserPageOwner()) {
      addCardBtn.classList.add('user-info__button_is-visible');
      editProfileBtn.classList.add('user-info__edit-button_is-visible');
      this._handlersArr = [
        {
          element: addCardBtn,
          event: 'click',
          callbacks: [this._openCardPopup]
        },
        {
          element: editProfileBtn,
          event: 'click',
          callbacks: [this._openProfilePopup]
        },
        {
          element: this._avatarBtn,
          event: 'click',
          callbacks: [this._openAvatarPopup]
        }
      ];
      this._setEventListeners();
    }
    return this._view;
  }

  _isUserPageOwner = () => this._userPageData._id === this._userAuthData._id;

}
