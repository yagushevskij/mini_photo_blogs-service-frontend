export class User {
  constructor(getDataFromApi, getUserPageUrl) {
    this._getUserPageUrl = getUserPageUrl;
    this._getDataFromApi = getDataFromApi;
  }

  setData = () => this._getDataFromApi()
    .then((res) => {
      this.data = res;
      this._setPageUrl();
      return this.data;
    })

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
