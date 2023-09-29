import Card from "./Card.js";

export default class Section {
  constructor({ data, renderer }, classSelector, handleImageClick) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
    this._handleImageClick = handleImageClick;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach((item) => {
      const card = new Card(item, "#cards__list-item", this._handleImageClick);
      const cardElement = card.getView();

      this.setItem(cardElement);
    });
  }
}
