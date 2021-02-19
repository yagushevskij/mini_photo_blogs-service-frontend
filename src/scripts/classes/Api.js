export class Api {
  constructor() {
  }

  sendRequest = async (objParams, formData) => {
    const { url, method, headers } = objParams;
    const res = await fetch(url, {
      method, headers,
      body: formData,
    });
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
