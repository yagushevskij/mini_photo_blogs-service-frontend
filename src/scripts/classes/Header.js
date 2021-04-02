import { BaseComponent } from './BaseComponent';

export class Header extends BaseComponent {
  constructor({
    userBlockContainer, container, renderMainPage,
  }) {
    super();
    this._container = container;
    this.userBlockContainer = userBlockContainer;
    this._renderMainPage = renderMainPage;
    this._setHandlers();
  }

  render = ({ userMenu }) => {
    this._userMenu = userMenu;
    this._setUserMenu();
    this._setEventListeners();
  };

  _setUserMenu = () => {
    this._clearContainer();
    this.userBlockContainer.append(this._userMenu);
  }

  _clearContainer = () => {
    this.userBlockContainer.textContent = '';
  }

  _setHandlers = () => {
    const logo = this._container.querySelector('.logo');
    this._handlersArr = [
      {
        element: logo,
        event: 'click',
        callbacks: [this._renderMainPage],
      },
    ];
  }
}
