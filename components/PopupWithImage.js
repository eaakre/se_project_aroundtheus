import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ name, link }, popupElement) {
    super(popupElement);
    this._cardImage = link;
    this._cardTitle = name;
  }

  open() {
    cardImage.src = this._cardImage;
    cardTitle.textContent = this._cardTitle;
    cardImage.alt = this._cardTitle;
    super.open();
  }
}
