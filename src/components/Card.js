export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getCardElement() {
    return (this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__list-item")
      .cloneNode(true));
  }
  _setEventsListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ title: this._name, url: this._link });
    });

    this._likeButton.addEventListener("click", this._handleLikeIcon);

    this._deleteButton.addEventListener("click", this._handleDeleteCard);
  }

  _handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _handleLikeIcon = () => {
    this._likeButton.classList.toggle("cards__favorite_active");
  };

  getView() {
    this._cardElement = this._getCardElement();

    this._cardTitle = this._cardElement.querySelector(".cards__title");

    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._likeButton = this._cardElement.querySelector(".cards__favorite");
    this._deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventsListeners();

    return this._cardElement;
  }
}
