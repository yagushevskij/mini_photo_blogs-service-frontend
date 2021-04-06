export class CardsBlock {
  create = (params) => {
    const { authUser = {}, cardsOwner = {}, cardsArr = [] } = params;
    this._cardsArr = cardsArr;
    this._authUser = (Object.keys(authUser).length !== 0) ? authUser : null;
    this._cardsOwner = (Object.keys(cardsOwner).length !== 0) ? cardsOwner : null;
    this._isCardsOwner = Boolean((this._authUser && this._cardsOwner)
      && (this._authUser._id === this._cardsOwner._id));
    this._view = document.createElement('div');
    this._view.insertAdjacentHTML('afterbegin', this._markup);
    this._view = this._view.firstChild;
    this._loadMoreBtn = this._view.querySelector('.cards-wrapper__button');
    this._sort();
    this._setPagination();
    this._setTitle();
    this._setEventListeners();
    this._render();
  }

  _setTitle() {
    this._title = this._view.querySelector('.root__title');
  }

  _renderCards() {
    this._cardsContainer = this._view.querySelector('.cards-list');
    if (this._splittedArray.length > 0) {
      this._renderCardList({
        cards: this._splittedArray[this._currentPage - 1],
        container: this._cardsContainer,
      });
    }
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

  _setPagination = () => {
    this._splittedArray = [];
    const arraySize = this._config.settings.itemsOnPage;
    for (let i = 0; i < Math.ceil(this._cardsArr.length / arraySize); i++) {
      this._splittedArray[i] = this._cardsArr.slice((i * arraySize), (i * arraySize) + arraySize);
    }
    this._totalPages = this._splittedArray.length;
    this._currentPage = 1;
    if (this._totalPages > this._currentPage) {
      if (this._config.settings.loadBy === 'scroll') {
        window.addEventListener('scroll', this._loadMoreByScroll);
      }
      if (this._config.settings.loadBy === 'button') {
        this._loadMoreBtn.classList.remove('hidden');
      }
    }
  }

  _loadMoreByScroll = () => {
    const containerRelativeBottom = this._container.getBoundingClientRect().bottom;
    const windowHeight = document.documentElement.clientHeight;
    if (containerRelativeBottom < windowHeight + 100) {
      this._currentPage++;
      if (this._totalPages >= this._currentPage) {
        this._renderCards();
      }
    }
  }

  _loadMoreByBtn = () => {
    this._currentPage++;
    if (this._totalPages === this._currentPage) {
      this._renderCards();
      this._loadMoreBtn.classList.add('hidden');
    }
    if (this._totalPages > this._currentPage) {
      this._renderCards();
    }
  }

  _clearCardsContainer = () => {
    this._cardsContainer.textContent = '';
  }

  _setEventListeners = () => {
    this._loadMoreBtn.addEventListener('click', this._loadMoreByBtn);
  }
}
