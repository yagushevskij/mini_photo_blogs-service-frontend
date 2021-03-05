export class User {
  constructor(getDataFromApi, getUserPageUrl) {
    this._getUserPageUrl = getUserPageUrl;
    this._getDataFromApi = getDataFromApi;

  }

  create = () => {
    return this._getDataFromApi()
    .then((res) => {
      this.data = res;
      this._setPageUrl();
      return this.data;
    })
  }

  // setData = (data = {}) => {
  // };

  _setPageUrl = () => {
    this.data.pageUrl = this._getUserPageUrl(this.data.username);
  }
}