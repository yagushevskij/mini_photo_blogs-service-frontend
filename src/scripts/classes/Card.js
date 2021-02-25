import { BaseComponent } from './BaseComponent';

export class Card extends BaseComponent {

  constructor(openPopup, cardTemplate, requestApiLike, requestApiDislike, requestApiRemoveCard) {
    super();
    this._openPopup = openPopup;
    this._cardTemplate = cardTemplate;
    this._requestApiLike = requestApiLike;
    this._requestApiDislike = requestApiDislike;
    this._requestApiRemoveCard = requestApiRemoveCard;
  };

  _like = () => {
    const changeLike = this._hasOwnLike() ? this._requestApiDislike : this._requestApiLike;
    changeLike(this._item._id)
      .then((res) => {
        this._item = res;
        this._changeLikesCount();
        this._view.likeIcon.classList.toggle('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _changeLikesCount = () => this._view.likeCount.textContent = this._item.likes.length;

  _hasOwnLike = () => this._item.likes.some(item => item === this._userId);

  _isOwner = () => (this._item.owner._id || this._item.owner) === this._userId; //В зависимости от типа запроса с сервера приходят данные владельца в разных свойствах;

  _remove = (event) => {
    event.stopImmediatePropagation();
    this._requestApiRemoveCard(this._item._id)
      .then(() => {
        this._removeEventListeners()
        this._view.remove()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _handleRemove = () => {
    if (confirm("Вы действительно хотите удалить эту карточку?")) {
      /*
        Можно лучше: event не передан в функцию.
        Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
        https://developer.mozilla.org/en-US/docs/Web/API/Window/event
       */
      this._remove(event);
    }
    else {
      /*
        Можно лучше: event не передан в функцию.
        Использование window.event считается нежелательным, так как может привести к трудноотлавливаемым багам.
        https://developer.mozilla.org/en-US/docs/Web/API/Window/event
       */
      event.stopImmediatePropagation();
    }
  };

  create = (userId, item) => {
    this._userId = userId;
    this._item = item;
    this._view = this._cardTemplate.content.cloneNode(true).children[0];
    this._view.img = this._view.querySelector('.place-card__image');
    this._view.likeIcon = this._view.querySelector('.place-card__like-icon');
    this._view.likeCount = this._view.querySelector('.place-card__like-counter');
    this._view.removeIcon = this._view.querySelector('.place-card__delete-icon');
    if (!(this._isOwner())) {
      this._view.removeIcon.style.display = 'none';
    }
    if (this._hasOwnLike()) {
      this._view.likeIcon.classList.add('place-card__like-icon_liked');
    }
    this._view.querySelector('.place-card__name').textContent = this._item.name;
    this._view.img.setAttribute('style', `background-image: url(${this._item.files.preview.link})`);
    this._view.dataset.id = this._item._id;
    this._changeLikesCount();
    this._setHandlers();
    this._setEventListeners();
    return this._view;
  };

  _open = () => {
    this._openPopup(this._item.files.content.link);
  };

  _setHandlers = () => this._handlersArr = [
    {
      element: this._view.img,
      event: 'click',
      callbacks: [this._open],
    },
    {
      element: this._view.likeIcon,
      event: 'click',
      callbacks: [this._like],
    },
    {
      element: this._view.removeIcon,
      event: 'click',
      callbacks: [this._handleRemove],
    },
  ]
}
