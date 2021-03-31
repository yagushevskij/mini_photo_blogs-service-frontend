import { BaseComponent } from './BaseComponent';

export class UserMenu extends BaseComponent {
  constructor({
    userMenuTemplate, userLinksTemplate, signup, signin, signout, renderAsyncImage, config,
  }) {
    super();
    this.userMenuTemplate = userMenuTemplate;
    this.userLinksTemplate = userLinksTemplate;
    this._signup = signup;
    this._signin = signin;
    this._signout = signout;
    this._renderAsyncImage = renderAsyncImage;
    this._config = config;
  }

  create = (userData) => {
    this._userData = userData;
    if (this._isUserDataExist()) {
      this._view = this.userMenuTemplate.content.cloneNode(true).children[0];
      const usernameElem = this._view.querySelector('.dropdown__link_type_greeting');
      const myPageElem = this._view.querySelector('.dropdown__link_type_my-page');
      const signoutElem = this._view.querySelector('.dropdown__link_type_signout');
      const dropdownElem = this._view.querySelector('.dropdown__mainmenu');
      this._imgBtnElem = this._view.querySelector('.dropdown__mainmenubtn');
      this._menuElem = this._view.querySelector('.dropdown__child');
      usernameElem.textContent = this._userData.username;
      myPageElem.setAttribute('href', this._userData.pageUrl);
      this._handlersArr = [
        {
          element: dropdownElem,
          event: 'click',
          callbacks: [this._open],
        },
        {
          element: signoutElem,
          event: 'click',
          callbacks: [this._signout],
        },
        {
          element: document,
          event: 'click',
          callbacks: [this._close],
        },
      ];
      this._updateAvatar();
      this._setEventListeners();
      return { userMenu: this._view };
    }
    this._view = this.userLinksTemplate.content.cloneNode(true);
    const signinButton = this._view.querySelector('.header__button_type_signin');
    const signupButton = this._view.querySelector('.header__button_type_signup');
    this._handlersArr = [
      {
        element: signinButton,
        event: 'click',
        callbacks: [this._signin],
      },
      {
        element: signupButton,
        event: 'click',
        callbacks: [this._signup],
      },
    ];
    this._setEventListeners();
    return { userMenu: this._view };
  }

  update = (userData) => {
    this._userData = userData;
    this._updateAvatar();
  };

  _updateAvatar = () => {
    this._renderAsyncImage({
      url: this._userData.avatar,
      element: this._imgBtnElem,
      config: this._config,
      callbacks: [this._hideLoader],
    });
  };

  _isUserDataExist = () => ((this._userData) ? Object.keys(this._userData).length !== 0 : false);

  _open = () => {
    this._menuElem.classList.add('dropdown__child_is-visible');
  };

  _close = () => {
    this._menuElem.classList.remove('dropdown__child_is-visible');
  };

  _hideLoader = () => {
    const loader = this._view.querySelector('.load-wraper');
    loader.classList.add('hidden');
  }
}
