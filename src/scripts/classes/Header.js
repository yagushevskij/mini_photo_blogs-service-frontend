import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor({
    userBlockContainer, container, renderMainPage, openSigninPopup,
  }) {
    super();
    this._container = container;
    this.userBlockContainer = userBlockContainer;
    this._renderMainPage = renderMainPage;
    this._openSigninPopup = openSigninPopup;
  }

  render = ({ userMenu }) => {
    if (userMenu) {
      this._userMenu = userMenu;
      this._setUserMenu();
    }
    this._setHandlers();
    this._setEventListeners();
  };

  _setUserMenu = () => {
    this._clearContainer();
    this.userBlockContainer.append(this._userMenu);
  }

  _clearContainer = () => {
    this.userBlockContainer.textContent = '';
  }

  _toggleMobileMenu = () => {
    const linksListElem = this._container.querySelector('.header__links');
    this._habmurgerBtn.classList.toggle('is-active');
    linksListElem.classList.toggle('header__links_is-visible');
  }

  _setHandlers = () => {
    const signinButton = this._container.querySelector('.header__button_type_signin');
    const logo = this._container.querySelector('.logo');
    this._habmurgerBtn = this._container.querySelector('.hamburger');
    this._handlersArr = [
      {
        element: logo,
        event: 'click',
        callbacks: [this._renderMainPage],
      },
      {
        element: signinButton,
        event: 'click',
        callbacks: [this._openSigninPopup],
      },
      {
        element: this._habmurgerBtn,
        event: 'click',
        callbacks: [this._toggleMobileMenu],
      },
    ];
  }
}
