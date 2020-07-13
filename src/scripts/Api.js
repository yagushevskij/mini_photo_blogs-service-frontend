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
        /*
            Можно лучше: В this лучше не заносить переменные, которые используются только в данном методе.
            url, который передаётся сюда используется только здесь, в другом методе передаётся свой url,
            и использовать там текущий url нет нужды. Поэтому лучше использовать const вместо записи в this.
         */
        this._url = url;
        return fetch(this._url, { headers: this._headers })
            .then(this._checkResponse)
    }
    createData = (obj) => {
        /*
            Можно лучше: В this лучше не заносить переменные, которые используются только в данном методе.
            _url, который передаётся сюда используется только здесь, в другом методе передаётся свой _url,
            и использовать там текущий _url нет нужды. Поэтому лучше использовать const вместо записи в this.
            С _data и _method та же ситуация.
         */
        this._url = obj.url;
        this._data = obj.data;
        this._method = obj.method;
        return fetch(this._url, {
            method: this._method,
            headers: this._headers,
            body: JSON.stringify(this._data)
        })
            /*
                Можно лучше: Можно сразу использовать this._checkResponse без создания анонимной функции:
                .then(this._checkResponse)
             */
            .then(res => {
                return this._checkResponse(res);
            })
    }
    changeData = (obj) => {
        /*
            Можно лучше: В this лучше не заносить переменные, которые используются только в данном методе.
            _url, который передаётся сюда используется только здесь, в другом методе передаётся свой _url,
            и использовать там текущий _url нет нужды. Поэтому лучше использовать const вместо записи в this.
            С _id и _method та же ситуация.
         */
        this._url = obj.url;
        this._id = obj.id;
        this._method = obj.method;
        return fetch(this._url + '/' + this._id, {
            method: this._method,
            headers: this._headers,
        })
            /*
			   Можно лучше: Можно сразу использовать this._checkResponse без создания анонимной функции:
			   .then(this._checkResponse)
			*/
            .then(res => {
                return this._checkResponse(res);
            })
    }
}
