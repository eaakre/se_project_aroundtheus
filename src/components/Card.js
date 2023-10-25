export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    // this._likeButton.addEventListener("click", this._handleLikeIcon);
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
      // this._deleteButton.addEventListener("click", this._handleDeleteCard);
    });
  }

  handleDeleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  handleLikeIcon = () => {
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
    if (this._isLiked) {
      this._likeButton.classList.add("cards__favorite_active");
    }
    return this._cardElement;
  }
}
