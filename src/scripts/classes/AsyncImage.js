export class AsyncImage extends Image {
  render = ({
    element, config, url, callbacks = [],
  }) => {
    this._element = element;
    this._config = config;
    this._callbacks = callbacks;
    this._url = url;
    this._create()
      .then(() => {
        this._isLoaded() ? this._setContentImage() : this._setDefaultImage();
      })
      .catch(() => this._setDefaultImage())
      .finally(() => {
        this._callbacks.forEach((callback) => callback());
      });
  }

  _create = () => new Promise((resolve, reject) => {
    this.src = this._url;
    this.onload = () => resolve();
    this.onerror = () => reject(new Error(this._config.errLoadMsg(this._url)));
  });

  _isLoaded = () => {
    if (!this.complete) {
      return false;
    }
    if (this.naturalWidth + this.naturalHeight === 0) {
      return false;
    }
    return true;
  }

  _setContentImage = () => {
    this._element.src = this._url;
  }

  _setDefaultImage = () => {
    this._element.src = this._config.errThumbUrl;
  }
}
