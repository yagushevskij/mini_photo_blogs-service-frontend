import { BaseComponent } from './BaseComponent';

export class UserMenu extends BaseComponent {
  constructor(userMenuTemplate, userLinksTemplate, signup, signin, signout) {
    super();
    this.userMenuTemplate = userMenuTemplate;
    this.userLinksTemplate = userLinksTemplate;
    this._signup = signup;
    this._signin = signin;
    this._signout = signout;
  }

  create = (userData, userpageUrl) => {
    this._userData = userData;
    if (this._isUserDataExist()) {
      this._view = this.userMenuTemplate.content.cloneNode(true).children[0];
      // this._view.dataset.id = this._item._id;
      const usernameElem = this._view.querySelector('.dropdown__link_type_greeting');
      const myPageElem = this._view.querySelector('.dropdown__link_type_my-page');
      const signoutElem = this._view.querySelector('.dropdown__link_type_signout');
      const dropdownElem = this._view.querySelector('.dropdown__mainmenu');
      this._imgBtnElem = this._view.querySelector('.dropdown__mainmenubtn');
      this._menuElem = this._view.querySelector('.dropdown__child');
      this._view.querySelector('.card__name').textContent = this._item.name;
      this._imgBtnElem.setAttribute('src', userData.avatar);
      usernameElem.textContent = userData.username;
      myPageElem.setAttribute('href', userpageUrl);
      this._handlersArr = [
        {
          element: dropdownElem,
          event: 'click',
          callbacks: [this._open]
        },
        {
          element: signoutElem,
          event: 'click',
          callbacks: [this._signout]
        },
        {
          element: document,
          event: 'click',
          callbacks: [this._close]
        },
      ];
      this._setEventListeners()
      return { userMenu: this._view };
    } else {
      this._view = this.userLinksTemplate.content.cloneNode(true);
      const signinButton = this._view.querySelector('.header__button_type_signin');
      const signupButton = this._view.querySelector('.header__button_type_signup');
      this._handlersArr = [
        {
          element: signinButton,
          event: 'click',
          callbacks: [this._signin]
        },
        {
          element: signupButton,
          event: 'click',
          callbacks: [this._signup]
        }
      ];
      this._setEventListeners()
      return { userMenu: this._view };
    }
  }

  update = (userData) => {
    this._imgBtnElem.setAttribute('src', userData.avatar)
  };

  _isUserDataExist = () => (this._userData) ? Object.keys(this._userData).length != 0 : false;

  _open = () => {
    this._menuElem.classList.add('dropdown__child_is-visible');
  };

  _close = () => {
    this._menuElem.classList.remove('dropdown__child_is-visible');
  };
}
