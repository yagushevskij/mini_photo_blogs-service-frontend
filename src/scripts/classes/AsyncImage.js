/*
Класс создания асинхронной загрузки изображений: вывод прелоадера во время загрузки картинки
браузером вывода заглушки при ошибке загрузки.
*/
export class AsyncImage extends Image {
  /**
* Рендер прелоадера
* @element - DOM элемент изображения;
* @config.errThumbUrl - url резервого изображения;
* @config.showErrLoadMsg(url) - функция вывода сообщения;
* @url - url изображения, которое необходимо загрузить на страницу;
* @callbacks - массив колбэков, которые нужно выполнить после разрешения всех промисов;
*/
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
    this.onerror = () => reject(new Error(this._config.showErrLoadMsg(this._url)));
  })

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
