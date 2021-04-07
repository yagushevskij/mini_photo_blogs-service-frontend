import { BaseComponent } from './BaseComponent';

export class UserMenu extends BaseComponent {
  constructor({
    userMenuTemplate, userLinksTemplate, signout,
    renderAsyncImage, config, renderPage, loader,
  }) {
    super();
    this.userMenuTemplate = userMenuTemplate;
    this.userLinksTemplate = userLinksTemplate;
    this._signout = signout;
    this._renderAsyncImage = renderAsyncImage;
    this._config = config;
    this._renderPage = renderPage;
    this._loader = loader;
  }

  create = (userData = {}) => {
    this._userData = userData;
    if (this._isUserDataExist()) {
      this._view = this.userMenuTemplate.content.cloneNode(true).children[1];
      const usernameElem = this._view.querySelector('.dropdown__item_type_username');
      const myPageElem = this._view.querySelector('.dropdown__link_type_my-page');
      const signoutElem = this._view.querySelector('.dropdown__link_type_signout');
      this._dropdownElem = this._view.querySelector('.dropdown__mainmenu');
      this._imgBtnElem = this._view.querySelector('.dropdown__mainmenubtn');
      this._menuElem = this._view.querySelector('.dropdown__child');
      usernameElem.textContent = this._userData.username;
      this._handlersArr = [
        {
          element: signoutElem,
          event: 'click',
          callbacks: [this._signout],
        },
        {
          element: myPageElem,
          event: 'click',
          callbacks: [() => this._renderPage(this._userData.username)],
        },
      ];
      this._updateAvatar();
      this._setEventListeners();
    } else {
      this._view = this.userMenuTemplate.content.cloneNode(true).children[0];
    }
    return { userMenu: this._view };
  }

  update = (userData) => {
    this._userData = userData;
    this._updateAvatar();
  }

  _updateAvatar = () => {
    this._loader.show({ container: this._dropdownElem });
    this._renderAsyncImage({
      url: this._userData.avatar,
      element: this._imgBtnElem,
      config: this._config,
      callbacks: [this._loader.remove],
    });
  }

  _isUserDataExist = () => ((this._userData) ? Object.keys(this._userData).length !== 0 : false);
}
