const initialCards = [
  {
    name: "Disney World",
    link: "https://images.unsplash.com/photo-1597466599360-3b9775841aec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Gooseberry Falls",
    link: "https://images.unsplash.com/photo-1618502105634-ddb28c748ddb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Willis Tower",
    link: "https://images.unsplash.com/photo-1556472908-0f77e815d81b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
  },
  {
    name: "Gateway Arch",
    link: "https://images.unsplash.com/photo-1593569248805-182542f82c14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80",
  },
  {
    name: "Estes Park",
    link: "https://images.unsplash.com/photo-1520050735087-1ed65d9b0273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  },
  {
    name: "Glacier National Park",
    link: "https://images.unsplash.com/photo-1471893370050-2c1a36cf555c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1178&q=80",
  },
];

// Get template for initial card setup
const cardTemplate = document
  .querySelector("#cards__list-item")
  .content.querySelector(".cards__list-item");
// Wrappers
const cardsList = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditForm = document.forms["edit-form"];
const addCardModal = document.querySelector("#profile-add-modal");
// const addCardForm = addCardModal.querySelector(".modal__form");
const addCardForm = document.forms["add-form"];

// Find open and close buttons for edit profile button
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = profileEditModal.querySelector(".form__input_name");
const inputDescription = profileEditModal.querySelector(
  ".form__input_description"
);

// Find open/close/form fields for add profile button
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddCloseButton = addCardModal.querySelector(".modal__close");
const profileAddTitle = addCardModal.querySelector(".form__input_title");
const profileAddImage = addCardModal.querySelector(".form__input_image");

// Find open/close/cards for picture modal
const cardModal = document.querySelector("#card-modal");
const cardModalCloseButton = cardModal.querySelector(".modal__close");
const cardModalImage = cardModal.querySelector(".modal__image");
const cardModalTitle = cardModal.querySelector(".modal__title");

// Loop through cards to render on DOM
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  const cardTitle = cardElement.querySelector(".cards__title");
  const likeButton = cardElement.querySelector(".cards__favorite");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__favorite_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    openPopup(cardModal);
    cardModalImage.src = data.link;
    cardModalTitle.textContent = data.name;
    cardModalImage.alt = data.name;
  });
  return cardElement;
}

function openPopup(el) {
  el.classList.add("modal_opened");
}

function closePopup(el) {
  el.classList.remove("modal_opened");
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});

// open edit profile modal on click of edit button
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// find close buttons
const closeButtons = document.querySelectorAll(".modal__close");

// close popup for each close button
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

// save profile information on submit
profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(profileEditModal);
});

// open add profile modal on click of plus button
profileAddButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

// save new image information on submit
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCard = { name: profileAddTitle.value, link: profileAddImage.value };
  renderCard(newCard, cardsList);
  evt.target.reset();
  closePopup(addCardModal);
});
