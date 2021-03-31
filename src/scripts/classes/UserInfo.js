import { BaseComponent } from './BaseComponent';

export class UserInfo extends BaseComponent {
  constructor({
    container, template, openCardPopup, openAvatarPopup, openProfilePopup, renderAsyncImage, config,
  }) {
    super();
    this._container = container;
    this._template = template;
    this._openCardPopup = openCardPopup;
    this._openAvatarPopup = openAvatarPopup;
    this._openProfilePopup = openProfilePopup;
    this._renderAsyncImage = renderAsyncImage;
    this._config = config;
  }

  _setUserInfo = () => {
    const name = this._view.querySelector('.user-info__name');
    const about = this._view.querySelector('.user-info__about');
    const avatar = this._view.querySelector('.user-info__avatar-content');
    name.textContent = this.data.name;
    about.textContent = this.data.about;
    this._renderAsyncImage({
      url: this.data.avatar,
      element: avatar,
      config: this._config,
      callbacks: [this._hideLoader],
    });
  }

  update = (data) => {
    if (data) {
      this.data = data;
      this._setUserInfo();
    }
  }

  render = (params) => {
    const { data, isUserPageOwner } = params;
    this.isUserPageOwner = isUserPageOwner;
    this._clearContainer();
    this.data = data;
    this._create();
    this._setUserInfo();
    this._container.appendChild(this._view);
  }

  _clearContainer = () => {
    this._container.textContent = '';
  }

  _create = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    const addCardBtn = this._view.querySelector('.user-info__button');
    const editProfileBtn = this._view.querySelector('.user-info__edit-button');
    this._avatarImgElem = this._view.querySelector('.user-info__avatar-content');
    this._avatarBtn = this._view.querySelector('.user-info__avatar');
    if (this.isUserPageOwner) {
      addCardBtn.classList.remove('hidden');
      editProfileBtn.classList.remove('hidden');
      this._handlersArr = [
        {
          element: addCardBtn,
          event: 'click',
          callbacks: [this._openCardPopup],
        },
        {
          element: editProfileBtn,
          event: 'click',
          callbacks: [this._openProfilePopup],
        },
        {
          element: this._avatarBtn,
          event: 'click',
          callbacks: [this._openAvatarPopup],
        },
      ];
      this._setEventListeners();
    }
  }

  _hideLoader = () => {
    const loader = this._view.querySelector('.load-wraper');
    loader.classList.add('hidden');
  }
}
