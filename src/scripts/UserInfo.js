'use strict';
export class UserInfo {

    constructor(container, textParams, picParam) {
        this._container = container;
        this._textParams = textParams;
        this._picParam = picParam;
    };

    setUserInfo = (obj) => {
        this.obj = obj;
        Object.keys(this.obj).forEach((elem) => {
            this[elem] = this.obj[elem];
        });
    };

    updateUserInfo = () => {
        this._textParams.forEach((param) => {
            this._container.querySelector(`.user-info__${param}`).textContent = this.obj[param];
        });
        this._container.querySelector(`.user-info__${this._picParam}`).setAttribute("style", `background-image: url(${this.obj[this._picParam]})`);
    };
}
