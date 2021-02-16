export class User {
  constructor(configPage) {
    this.configPage = configPage;
  }
  setData = (data = {}) => {
    this.data = data;
    this.pageUrl = this.configPage + data.username;
  };
}