export class CardsBlock {
  render = (params) => {
    const { authUser = {}, cardsOwner = {}, cardsArr = [] } = params;
    this._cardsArr = cardsArr;
    this._authUser = (Object.keys(authUser).length !== 0) ? authUser : null;
    this._cardsOwner = (Object.keys(cardsOwner).length !== 0) ? cardsOwner : null;
    this._isCardsOwner = Boolean((this._authUser && this._cardsOwner)
      && (this._authUser._id === this._cardsOwner._id));
    this._clearContainer();
    if (this._cardsArr.length > 0) {
      this._create();
    }
    this._setTitle();
    this._setEventListeners();
    this.show();
  };

  _create() {
    this._sort();
  }

  _setTitle() {
    this._title = this._wrapper.querySelector('.root__title');
  }

  _renderCards = () => { // Режем массив карточек на подмассивы и рендерим
    // каждый при обращении к методу;
    const splittedArray = [];
    const arraySize = this._config.settings.itemsOnPage;
    for (let i = 0; i < Math.ceil(this._cardsArr.length / arraySize); i++) {
      splittedArray[i] = this._cardsArr.slice((i * arraySize), (i * arraySize) + arraySize);
    }
    this._totalPages = splittedArray.length;
    // При первом запуске функции начнем загружать с первой "страницы" (0 элемент в массиве)
    this._currentPage = this._currentPage || 1;
    this._renderCardList(splittedArray[this._currentPage - 1]);
    (this._totalPages > this._currentPage) ? this._currentPage++ : this._currentPage;
    this._pagesRendered = this._currentPage;
  }

  toggleVisibility = () => {
    this._cardsCollection = this._container.childNodes;
    (this._cardsCollection && this._cardsCollection.length > 0) ? this.show() : this.hide();
  }

  _sort() {
    const sortByLikes = (a, b) => b.likes.length - a.likes.length;
    const sortByDate = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (this._config.settings.sortBy === 'likes') {
      this._cardsArr = this._cardsArr.sort(sortByLikes);
    } else if (this._config.settings.sortBy === 'date') {
      this._cardsArr = this._cardsArr.sort(sortByDate);
    }
  }

  _clearContainer = () => {
    this._container.textContent = '';
  }

  _setEventListeners = () => {
    if (this._config.settings.loadBy === 'scroll') {
      window.addEventListener('scroll', this._loadMoreByScroll);
    }
  };

  _loadMoreByScroll = () => {
    const containerRelativeBottom = this._container.getBoundingClientRect().bottom;
    const windowHeight = document.documentElement.clientHeight;
    if (containerRelativeBottom < windowHeight + 100) {
      if (this._totalPages > this._pagesRendered) {
        this._renderCards();
      }
    }
  }

  show = () => {
    this._wrapper.classList.remove('hidden');
  };

  hide = () => {
    this._wrapper.classList.add('hidden');
  };
}
