export class Loader {
  constructor(template) {
    this._template = template;
  }

    show = ({ container }) => {
      this._container = container;
      this._create();
      this._render();
    }

    _create = () => {
      this._element = this._template.content.cloneNode(true).children[0];
    }

    _render = () => {
      this._container.prepend(this._element);
    }

    remove = () => {
      this._element.remove();
    }
}
