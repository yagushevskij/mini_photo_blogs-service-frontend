import { BaseComponent } from './BaseComponent';

export class Card extends BaseComponent {

  constructor(callbacks){
    super();
    const { openImagePopup, addLikeRequest, removeLikeRequest, removeCardRequest, updateCardsBlock, getUserPageUrl } = callbacks;
    this._openImagePopup = openImagePopup;
    this._addLikeRequest = addLikeRequest;
    this._removeLikeRequest = removeLikeRequest;
    this._removeCardRequest = removeCardRequest;
    this._updateCardsBlock = updateCardsBlock;
    this._getUserPageUrl = getUserPageUrl;
  };

  _like = (event) => {
    event.preventDefault();
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
  };

  _changeLikesCount = () => {
    if (this._view.likeCount) {
      const likesCount = this._item.likes.length;
      this._view.likeCount.textContent = likesCount;
      this._view.dataset.likes = likesCount;
    }
  };

  _hasOwnLike = () => {
    if (this._userId) {
      return this._item.likes.some(item => item === this._userId);
    }
    return false;
  };

  _isOwner = () => (this._item.owner._id || this._item.owner) === this._userId; //В зависимости от типа запроса с сервера приходят данные владельца в разных свойствах;

  _remove = (event) => {
    event.preventDefault();
    this._removeCardRequest(this._item._id)
      .then(() => {
        this._removeEventListeners();
        this._view.remove();
        this._updateCardsBlock({removedCard: this._item})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _handleRemove = (event) => {
    event.preventDefault();
    if (confirm('Вы действительно хотите удалить эту карточку?')) {
      this._remove(event);
    }
  };

  create = (params, userData = {}, item) => {
    this._userId = (Object.keys(userData).length != 0) ? userData._id : null;
    this._item = item;
    this._view = params.view;
    try {
      const { img, likeIcon, likeCount, removeIcon, name, likedIcon, userLink} = params.classNames
      this._view.likedIconClassName = likedIcon;
      this._view.img = this._view.querySelector(img); 
      this._view.likeIcon = this._view.querySelector(likeIcon);
      this._view.likeCount = this._view.querySelector(likeCount);
      this._view.removeIcon = this._view.querySelector(removeIcon);
      this._view.name = this._view.querySelector(name);
      this._view.userLink = this._view.querySelector(userLink);
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
    if (this._view.img) {
      this._view.img.setAttribute('style', `background-image: url(${this._item.files.preview.link})`);
    }
    if (this._view.userLink) {
      const userPageUrl = this._getUserPageUrl(this._item.owner.username);
      this._view.userLink.textContent = this._item.owner.name;
      this._view.userLink.setAttribute('href', userPageUrl)
    }
    this._view.dataset.id = this._item._id;
    this._view.dataset.width = this._item.files.content.dimension.width;
    this._view.dataset.height = this._item.files.content.dimension.height;
    this._changeLikesCount();
    this._setHandlers();
    this._setEventListeners();
    return this._view;
  };

  _open = (event) => {
    if (event.defaultPrevented || event.target !== this._view.img) return;
    this._openImagePopup(this._item.files.content.link);
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
