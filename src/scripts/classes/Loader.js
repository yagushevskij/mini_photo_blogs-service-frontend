/**
* Управление прелоадером на странице методами this.show(container) и this.remove();
@template - <template> шаблон прелоадера;
*/
export class Loader {
  constructor(template) {
    this._template = template;
  }

  /**
* Вывод прелоадера на странице.
* @container - DOM элемент контейнера прелоадера;
*/
  show = ({ container }) => {
    this._container = container;
    this._create();
    this._render();
  }

  _create = () => {
    this._element = this._template.content.cloneNode(true).children[0];
  }

  _render = () => {
    if (this._container) {
      this._container.prepend(this._element);
    }
  }

  remove = () => {
    this._element.remove();
  }
}
