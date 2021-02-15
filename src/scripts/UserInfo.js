export class UserInfo {

  constructor(container, template, textParams, picParam) {
    this._container = container;
    this._template = template;
    this._textParams = textParams;
    this._picParam = picParam;
  };

  setUserInfo = () => {
    Object.keys(this._userPageData).forEach((elem) => {
      this[elem] = this._userPageData[elem];
    });
  };

  updateUserInfo = () => {
    this._textParams.forEach((param) => {
      this._container.querySelector(`.user-info__${param}`).textContent = this._userPageData[param];
    });
    this._container.querySelector(`.user-info__${this._picParam}`).setAttribute("style", `background-image: url(${this._userPageData[this._picParam]})`);
  };

  render = (userAuthData, userPageData) => {
    this._userPageData = userPageData;
    this._userAuthData = userAuthData;
    this._create()
    this._container.appendChild(this._view);
    console.log(userAuthData)
  }

  _create = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    const addCardBtn = this._view.querySelector('.user-info__button');
    const editProfileBtn = this._view.querySelector('.user-info__edit-button');
    const updateAvatarBtn = this._view.querySelector('.user-info__avatar');
    if (this._isUserPageOwner()) {
      addCardBtn.classList.add('user-info__button_is-visible');
      editProfileBtn.classList.add('user-info__edit-button_is-visible');
    }

    return this._view;
  }

  _isUserPageOwner = () => this._userPageData._id === this._userAuthData._id;

  // addCardBtn.addEventListener('click', () => {
  //   cardPopup.open();
  // });
  // editProfileBtn.addEventListener('click', () => {
  //   profilePopup.getInformation();
  //   profilePopup.open();
  // });
  // updateAvatarBtn.addEventListener('click', () => {
  //   avatarPopup.open();
  // });
}