export class Header {
  constructor(userBlockContainer) {
    this.userBlockContainer = userBlockContainer;
  }
  render = ({ userMenu }) => {
    this._userMenu = userMenu;
    this._setUserMenu();
  };
  _setUserMenu = () => {
    this.userBlockContainer.textContent = '';
    this.userBlockContainer.append(this._userMenu);
  }
}