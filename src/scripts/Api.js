'use strict';
export class Api {
  constructor(config) {
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  getData = (url) => {
    return fetch(url, { headers: this._headers })
      .then(this._checkResponse)
  }
  createData = (objParams, dataObj) => {
    const { url, method } = objParams;
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(dataObj)
    })
      .then(this._checkResponse)
  }
  changeData = (objParams) => {
    const { url, method } = objParams;
    return fetch(url, {
      method: method,
      headers: this._headers,
    })
      .then(this._checkResponse)
  }
}
