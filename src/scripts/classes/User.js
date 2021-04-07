export class User {
  constructor(getUserPageUrl) {
    this._getUserPageUrl = getUserPageUrl;
  }

  setData = (data) => {
    this.data = data;
  };

  updateData = (data = {}) => {
    this.data = data;
    if (Object.keys(this.data).length !== 0) {
      this._setPageUrl();
    }
  };

  _setPageUrl = () => {
    this.data.pageUrl = this._getUserPageUrl(this.data.username);
  }
}
