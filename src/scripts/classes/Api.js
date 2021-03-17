export class Api {
  constructor(config) {
    this._errMessages = config.text.errors;
  }

  sendRequest = async (objParams, formData) => {
    const { url, method, headers } = objParams;
    try {
      const res = await fetch(url, {
        method, headers,
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        return data;
      }
      if (res.status === 400 || res.status === 401 || res.status === 409) {
        const errMessage = data.message;
        return Promise.reject(errMessage);
      }
      return Promise.reject(this._errMessages.srvErr)
    } catch (err) {
      console.log(err);
      return Promise.reject(this._errMessages.srvConnectErr)
    }
  }
}
