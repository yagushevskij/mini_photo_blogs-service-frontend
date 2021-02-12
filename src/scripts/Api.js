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
  sendRequest = (objParams, dataObj) => {
    const { url, method } = objParams;
    return fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(dataObj)
    })
      .then(this._checkResponse)
  }
}
