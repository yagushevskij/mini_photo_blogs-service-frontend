export class User {
  constructor(checkUserExist) {
    this._checkUserExist = checkUserExist;
  }
  setData = (data = {}) => this.data = data;
}
