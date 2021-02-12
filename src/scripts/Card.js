'use strict';
export class Card {

  constructor(imagePopup, templateCard, sendLikeCardToApi, sendDislikeCardToApi, userId) {
    this._imagePopup = imagePopup;
    this._templateCard = templateCard;
    this._sendLikeCardToApi = sendLikeCardToApi;
    this._sendDislikeCardToApi = sendDislikeCardToApi;
    (userId) ? this._userId = userId : false;
  };

  _like = () => {
    const changeLike = this._hasOwnLike() ? this._sendDislikeCardToApi : this._sendLikeCardToApi;
    // console.log(this._hasOwnLike(), this._userId)
    changeLike(this._item._id)
    // this._api.changeData({ url: this._api.cardsApiUrl + '/' + this._api.paths.like, id: this._view.getAttribute('data-id'), method: method })
      .then((res) => {
        this._item = res;
        this._changeLikesCount();
        this._view.likeIcon.classList.toggle('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _changeLikesCount = () => {
    this._view.likeCount.textContent = this._item.likes.length;
  }

  _hasOwnLike = () => this._item.likes.some(item => item === this._userId);

  _isOwner = () => this._item.owner._id === this._userId;

  _remove = (event) => {
    this._api.changeData({ url: this._api.cardsApiUrl, id: this._view.getAttribute('data-id'), method: 'DELETE' })
      .then(() => {
        this._removeEventListeners()
        this._view.remove()
      })
      .catch((err) => {
        console.log(err);
      });
    event.stopImmediatePropagation();
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

  create = (item) => {
    this._item = item;
    this._view = this._templateCard.cloneNode(true).children[0];
    this._view.dataset.id = this._item._id;
    this._view.querySelector('.place-card__name').textContent = this._item.name;
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
    this._view.img.setAttribute('style', `background-image: url(${this._item.link})`);
    this._changeLikesCount();
    this._setEventListeners();
    return this._view;
  };

  _open = () => {
    this._imagePopup.create(this._item.link);
    this._imagePopup.open();
  };

  _setEventListeners = () => {
    this._view.img.addEventListener('click', this._open);
    this._view.likeIcon.addEventListener('click', this._like);
    this._view.removeIcon.addEventListener('click', this._handleRemove);
  };

  _removeEventListeners = () => {
    this._view.img.removeEventListener('click', this._open);
    this._view.likeIcon.removeEventListener('click', this._like);
    this._view.removeIcon.removeEventListener('click', this._handleRemove);
  };
}
