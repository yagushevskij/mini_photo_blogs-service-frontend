export class Header {
  constructor(userBlockContainer) {
    this.userBlockContainer = userBlockContainer;
  }
  render = ({ userMenu }) => {
    this.userBlockContainer.append(userMenu);
  };
}