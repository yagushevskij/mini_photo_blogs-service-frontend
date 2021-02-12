export class User {
  constructor(requestUserExistToApi) {
    this._requestUserExistToApi = requestUserExistToApi
  }
  _isLoggedIn = () => localStorage.getItem('token') ? true : false;
  _checkUserExist = () => this._isLoggedIn() ? this._requestUserExistToApi() : false;
  updateUserData = async () => {
    this.data = await this._checkUserExist()
      .catch(err => console.log(err));
  }
};