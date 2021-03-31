export class Loader {
  constructor(element) {
    this._element = element;
  }

    show = (container) => {
      container.append(this._element);
      this._element.classList.remove('hidden');
    };

    hide = () => {
      this._element.classList.add('hidden');
    };
}
