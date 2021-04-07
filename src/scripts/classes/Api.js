export class Api {
  constructor(config) {
    this._errMessages = config.text.errors;
  }

  /**
 * Отправка запроса к API
 * @params - объект с параметрами запроса;
 * @formData - объект с данными FormData;
 */
  sendRequest = async (params, formData) => {
    const { url, method, headers } = params;
    try {
      const res = await fetch(url, {
        method,
        headers,
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
      return Promise.reject(this._errMessages.srvErr);
    } catch (err) {
      console.log(err);
      return Promise.reject(this._errMessages.srvConnectErr);
    }
  }
}
