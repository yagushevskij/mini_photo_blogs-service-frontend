import { BaseComponent } from './BaseComponent';

export class Card extends BaseComponent {
  constructor(callbacks) {
    super();
    const {
      openImagePopup, addLikeRequest, removeLikeRequest, removeCardRequest, updateCardsBlock,
      config, renderAsyncImage, loader, renderUserPage,
    } = callbacks;
    this._openImagePopup = openImagePopup;
    this._addLikeRequest = addLikeRequest;
    this._removeLikeRequest = removeLikeRequest;
    this._removeCardRequest = removeCardRequest;
    this._updateCardsBlock = updateCardsBlock;
    this._config = config;
    this._renderAsyncImage = renderAsyncImage;
    this._loader = loader;
    this._renderUserPage = renderUserPage;
  }

  _like = (event) => {
    if (this._userId) { // Если пользователь авторизован;
      this._preventDefaultEvent(event);
      const changeLike = this._hasOwnLike() ? this._removeLikeRequest : this._addLikeRequest;
      changeLike(this._item._id)
        .then((res) => {
          this._item = res;
          this._changeLikesCount();
          this._view.likeIcon.classList.toggle(this._view.likedIconClassName);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const likeInfoMsgElem = this._view.querySelector('.card__info-message_like');
      likeInfoMsgElem.classList.remove('hidden');
    }
  }

  _changeLikesCount = () => {
    if (this._view.likeCount) {
      const likesCount = this._item.likes.length;
      this._view.likeCount.textContent = likesCount;
      this._view.dataset.likes = likesCount;
    }
  }

  _hasOwnLike = () => {
    if (this._userId) {
      return this._item.likes.some((item) => item === this._userId);
    }
    return false;
  }

  // В зависимости от типа запроса с сервера приходят данные владельца в разных свойствах;
  _isOwner = () => (this._item.owner._id || this._item.owner) === this._userId;

  _remove = (event) => {
    this._preventDefaultEvent(event);
    this._removeCardRequest(this._item._id)
      .then(() => {
        this._removeEventListeners();
        this._view.remove();
        this._updateCardsBlock({ removedCard: this._item });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _handleRemove = (event) => {
    this._preventDefaultEvent(event);
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      this._remove(event);
    }
  }

  /**
   * Создание карточки
   * @params view - узел разметки карточки;
   * @params userData - объект данных авторизованного пользователя;
   * @item - объект данных карточки;
   */
  create = (params, item) => {
    const { view, userData = {} } = params;
    this._userId = (Object.keys(userData).length !== 0) ? userData._id : null;
    this._item = item;
    this._view = view;
    try {
      this._view.likedIconClassName = 'card__like-icon_liked';
      this._view.imgContainer = this._view.querySelector('.card__image');
      this._view.imgElem = this._view.querySelector('.card__image-content');
      this._view.likeIcon = this._view.querySelector('.card__like-icon');
      this._view.likeCount = this._view.querySelector('.card__like-counter');
      this._view.removeIcon = this._view.querySelector('.card__delete-icon');
      this._view.name = this._view.querySelector('.card__name');
      this._view.userLink = this._view.querySelector('.card__username-link');
    } catch (err) {
      console.log(err);
    }
    if (!(this._isOwner()) && this._view.removeIcon) {
      this._view.removeIcon.style.display = 'none';
    }
    if (this._hasOwnLike() && this._view.likeIcon) {
      this._view.likeIcon.classList.add(this._view.likedIconClassName);
    }
    if (this._view.name) {
      this._view.name.textContent = this._item.name;
    }
    if (this._view.imgElem) {
      if (this._view.imgContainer && this._loader) {
        this._loader.show({ container: this._view.imgContainer });
      }
      this._renderAsyncImage({
        url: this._item.files.preview.link,
        element: this._view.imgElem,
        config: this._config,
        callbacks: (this._loader) ? [this._loader.remove] : [],
      });
    }
    if (this._view.userLink) {
      this._view.userLink.textContent = this._item.owner.name;
    }
    this._view.dataset.id = this._item._id;
    this._view.dataset.width = this._item.files.content.dimension.width;
    this._view.dataset.height = this._item.files.content.dimension.height;
    this._changeLikesCount();
    this._setHandlers();
    this._setEventListeners();
    return this._view;
  }

  _open = (event) => {
    if (!event.defaultPrevented && (event.target === this._view.imgElem
      || event.target === this._view.imgContainer)) {
      this._openImagePopup(this._item.files.content.link);
    }
  };

  _preventDefaultEvent = (event) => {
    event.preventDefault();
  }

  _setHandlers = () => {
    this._handlersArr = [
      {
        element: this._view.imgContainer,
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
      {
        element: this._view.userLink,
        event: 'click',
        callbacks: [this._preventDefaultEvent,
          () => { this._renderUserPage(this._item.owner.username); }],
      },
    ];
  }
}
