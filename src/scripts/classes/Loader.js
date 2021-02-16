'use strict';
export class Loader {
    constructor() {
    }

    changeStatus = (loader, status) => {
        this._loader = loader;
        this._loader.style.display = status ? 'block' : 'none';
    };
}
