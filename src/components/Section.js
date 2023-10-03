import Card from "./Card.js";

export default class Section {
  constructor({ data, renderer }, selector, handleImageClick) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._handleImageClick = handleImageClick;
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
