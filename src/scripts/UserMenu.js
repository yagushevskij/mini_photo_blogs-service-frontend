import { BaseComponent } from './BaseComponent';

export class UserMenu extends BaseComponent {
  constructor(userMenuTemplate, userLinksTemplate, signup, signin) {
    super();
    this.userMenuTemplate = userMenuTemplate;
    this.userLinksTemplate = userLinksTemplate;
    this._signup = signup;
    this._signin = signin;
  }

  create = (userData) => {
    this._userData = userData;
    if (this._isUserDataExist()) {
      this._view = this.userMenuTemplate.content.cloneNode(true).children[0];
      // this._view.dataset.id = this._item._id;
      this._imgBtn = this._view.querySelector('.dropdown__mainmenubtn');
      const dropdown = this._view.querySelector('.dropdown__mainmenu');
      this._menu = this._view.querySelector('.dropdown__child');
      // this._view.querySelector('.place-card__name').textContent = this._item.name;
      this._imgBtn.setAttribute('src', userData.avatar);
      this._handlersArr = [
        {
          element: dropdown,
          event: 'click',
          callbacks: [this._open]
        }
      ];
      this._setEventListeners()
      return {userMenu: this._view};
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
      console.log(this._handlersArr)
      this._setEventListeners()
      return {userMenu: this._view};
    }
  }

  update = (userData) => {
    console.log('123')
    this._imgBtn.setAttribute('src', userData.avatar)
  };

  _isUserDataExist = () => Object.keys(this._userData).length != 0;

  _open = () => this._menu.classList.add('dropdown__child_is-visible');
}
