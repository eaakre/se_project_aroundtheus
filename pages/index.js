import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

// Wrappers
const cardsList = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modals = document.querySelectorAll(".modal");
const addCardModal = document.querySelector("#profile-add-modal");
const cardModal = document.querySelector("#card-modal");

// Forms
const profileEditForm = document.forms["edit-form"];
const addCardForm = document.forms["add-form"];

// Find open and close buttons for edit profile button
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const inputName = profileEditModal.querySelector(".form__input_name");
const inputDescription = profileEditModal.querySelector(
  ".form__input_description"
);

// Find open/close/form fields for add profile button
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddTitle = addCardModal.querySelector(".form__input_title");
const profileAddImage = addCardModal.querySelector(".form__input_image");

// Find open/close/cards for picture modal
const cardModalImage = cardModal.querySelector(".modal__image");
const cardModalTitle = cardModal.querySelector(".modal__title");

// Functions
export function handleImageClick(el) {
  openPopup(cardModal);
  cardModalImage.src = el._link;
  cardModalTitle.textContent = el._name;
  cardModalImage.alt = el._name;
}

function openPopup(el) {
  el.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(el) {
  el.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

function renderCard(data, wrapper) {
  const card = new Card(data, "#cards__list-item", handleImageClick);
  wrapper.prepend(card.getView());
}

//Render initial cards on page load
initialCards.forEach((data) => {
  renderCard(data, cardsList, handleImageClick);
});

// enabling validation by calling enableValidation()
// pass all the settings on call
const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

// Add event listeners to close on close buttons or overlay
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(modal);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(modal);
    }
  });
});

// open edit profile modal on click of edit button
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// save Edit Profile on submit
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
  const submitButton = evt.submitter;
  renderCard(newCard, cardsList);
  evt.target.reset();
  submitButton.disabled = true;
  submitButton.classList.add("modal__button_disabled");
  closePopup(addCardModal);
});
