export class User {
  constructor(checkUserExist) {
    this._checkUserExist = checkUserExist;
  }
  setData = (data = {}) => {
    this.data = data;
    // console.log(data)
  };
  // _isLoggedIn = () => localStorage.getItem('token') ? true : false;
}
