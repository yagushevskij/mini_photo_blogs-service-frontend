'use strict';
export class Api {
    constructor(config) {
        this._headers = config.headers;
        this.cohort = config.cohort;
        this.cardsApiUrl = config.cardsApiUrl;
        this.userApiUrl = config.userApiUrl;
        this.userId = config.userId;
        this.paths = config.paths;
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
    createData = (obj) => {
        const { url, data, method } = obj
        return fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(this._checkResponse)
    }
    changeData = (obj) => {
        const url = obj.url;
        const id = obj.id;
        const method = obj.method;
        return fetch(url + '/' + id, {
            method: method,
            headers: headers,
        })
            .then(this._checkResponse)
    }
}
