export class Api {
  constructor(config) {
    this._headers = config.headers;
  }
  sendRequest = async (objParams, dataObj) => {
    const { url, method } = objParams;
    const res = await fetch(url, {
      method: method,
      headers: this._headers,
      body: JSON.stringify(dataObj)
    });
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
