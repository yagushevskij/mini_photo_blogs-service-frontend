export class TopUpBtn {
  constructor(domElement) {
    this._domElenment = domElement;
  }

  _show = () => {
    this._domElenment.classList.remove('hidden');
  }

  _hide = () => {
    this._domElenment.classList.add('hidden');
  }

  _scrollHandler = () => {
    const documentRelativeTop = document.documentElement.getBoundingClientRect().top;
    const windowHeight = document.documentElement.clientHeight;
    (Math.abs(documentRelativeTop) >= windowHeight) ? this._show() : this._hide();
  }

  _goUp = () => {
    window.scrollTo(0, 0);
  }

  setEventListener = () => {
    document.addEventListener('scroll', this._scrollHandler);
    this._domElenment.addEventListener('click', this._goUp);
  }
}
