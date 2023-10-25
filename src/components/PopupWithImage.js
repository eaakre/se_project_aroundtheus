import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImage = document.querySelector(".modal__image");
    this._cardTitle = document.querySelector(".modal__title");
    this._popupSubmit = this._popupElement.querySelector(".modal__button");
  }

  open(data) {
    this._cardImage.src = data.url;
    this._cardTitle.textContent = data.title;
    this._cardImage.alt = data.title;
    super.open();
  }
}
