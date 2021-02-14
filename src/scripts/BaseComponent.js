export class BaseComponent {
  constructor() {
  }
  _setEventListeners = () => {
    this._handlersArr.forEach((el) => {
      /// Если обработчиков у элемента несколько, то на каждый будет создан отдельный слушатель
      el.callbacks.forEach((callback) => {
        el.element.addEventListener(el.event, callback);
      })
    })
  };
  _removeEventListeners = () => {
    this._handlersArr.forEach((el) => {
      el.callbacks.forEach((callback) => {
        el.element.removeEventListener(el.event, callback);
      })
    })
  };
}