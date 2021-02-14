export class Header {
  constructor(userBlockContainer, userLinksTemplate) {
    this.userBlockContainer = userBlockContainer;
    this.userLinksTemplate = userLinksTemplate;
  }
  render = ({ userMenu }) => {
    this.userBlockContainer.append(userMenu);
  };
}