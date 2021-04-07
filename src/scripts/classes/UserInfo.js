import { BaseComponent } from './BaseComponent';

export class UserInfo extends BaseComponent {
  constructor({
    container, template, openCardPopup, openAvatarPopup, openProfilePopup, renderAsyncImage, config,
    loader,
  }) {
    super();
    this._container = container;
    this._template = template;
    this._openCardPopup = openCardPopup;
    this._openAvatarPopup = openAvatarPopup;
    this._openProfilePopup = openProfilePopup;
    this._renderAsyncImage = renderAsyncImage;
    this._config = config;
    this._loader = loader;
  }

  _setUserInfo = () => {
    const name = this._view.querySelector('.user-info__name');
    const about = this._view.querySelector('.user-info__about');
    name.textContent = this.userPageData.name;
    about.textContent = this.userPageData.about;
  }

  _renderAvatar = () => {
    const avatar = this._view.querySelector('.user-info__avatar-content');
    const avatarContainer = this._view.querySelector('.user-info__avatar-img-container');
    this._loader.show({ container: avatarContainer });
    this._renderAsyncImage({
      url: this.userPageData.avatar,
      element: avatar,
      config: this._config,
      callbacks: [this._loader.remove],
    });
  }

  update = (userPageData) => {
    if (userPageData) {
      this.userPageData = userPageData;
      this._setUserInfo();
      this._renderAvatar();
    }
  }

  render = (params) => {
    const { userPageData, authUserData = {} } = params;
    this._authUserData = authUserData;
    this.userPageData = userPageData;
    if (this.userPageData && Object.keys(this.userPageData).length !== 0) {
      this._create();
      this._setUserInfo();
      this._renderAvatar();
      this._container.appendChild(this._view);
    }
  }

  _isUserPageOwner = () => this._authUserData._id === this.userPageData._id;

  _create = () => {
    this._view = this._template.content.cloneNode(true).children[0];
    const addCardBtn = this._view.querySelector('.user-info__button');
    const editProfileBtn = this._view.querySelector('.user-info__edit-button');
    this._avatarBtn = this._view.querySelector('.user-info__avatar');
    if (this._isUserPageOwner()) {
      addCardBtn.classList.remove('hidden');
      editProfileBtn.classList.remove('hidden');
      this._avatarBtn.classList.add('user-info__avatar_is-active');
      this._handlersArr = [
        {
          element: addCardBtn,
          event: 'click',
          callbacks: [this._openCardPopup],
        },
        {
          element: editProfileBtn,
          event: 'click',
          callbacks: [() => { this._openProfilePopup(this.userPageData); }],
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
}
