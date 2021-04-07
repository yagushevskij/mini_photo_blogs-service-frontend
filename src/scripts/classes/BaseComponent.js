export class BaseComponent {
  /**
* @this._handlersArr - массив функций обработчиков с обязательными свойствами
* element, event, callbacks, пример:
* { element: domElement, event: 'click', callbacks: [this._func1, this._func2] }
*/
  _setEventListeners = () => this._handlersArr.forEach((el) => {
    el.callbacks.forEach((callback) => {
      if (el.element) {
        el.element.addEventListener(el.event, callback);
      }
    });
  })

  _removeEventListeners = () => this._handlersArr.forEach((el) => {
    el.callbacks.forEach((callback) => {
      if (el.element) {
        el.element.removeEventListener(el.event, callback);
      }
    });
  })
}
