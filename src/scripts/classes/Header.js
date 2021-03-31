export class Header {
  constructor(userBlockContainer) {
    this.userBlockContainer = userBlockContainer;
  }

  render = ({ userMenu }) => {
    this._userMenu = userMenu;
    this._setUserMenu();
  };

  _setUserMenu = () => {
    this._clearContainer();
    this.userBlockContainer.append(this._userMenu);
  }

  _clearContainer = () => {
    this.userBlockContainer.textContent = '';
  }
}
