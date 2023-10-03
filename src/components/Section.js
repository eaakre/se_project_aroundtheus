export default class Section {
  constructor({ data, renderer }, selector, handleImageClick) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._items.forEach(this._renderer);
  }
}
