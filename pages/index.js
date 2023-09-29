import Card from "../components/Card.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, config } from "../src/utils/constants.js";

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

// function openPopup(el) {
//   el.classList.add("modal_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// function closePopup(el) {
//   el.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }

// function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".modal_opened");
//     closePopup(openedPopup);
//   }
// }

// function renderCard(data, wrapper) {
//   const card = new Card(data, "#cards__list-item", handleImageClick);
//   wrapper.prepend(card.getView());
// }

// Render initial cards on page load
// initialCards.forEach((data) => {
//   renderCard(data, cardsList, handleImageClick);
// });

const cardList = new Section(
  { data: initialCards },
  ".cards__list",
  handleImageClick
);
cardList.renderItems();

// enabling validation by calling enableValidation()
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

// Add event listeners to close on close buttons or overlay
// modals.forEach((modal) => {
//   modal.addEventListener("mousedown", (evt) => {
//     if (
//       evt.target.classList.contains("modal_opened") ||
//       evt.target.classList.contains("modal__close")
//     ) {
//       closePopup(modal);
//     }
//   });
// });

// open edit profile modal on click of edit button
// profileEditButton.addEventListener("click", () => {
//   openPopup(profileEditModal);
//   inputName.value = profileName.textContent;
//   inputDescription.value = profileDescription.textContent;
// });

const editProfilePopup = new PopupWithForm("#profile-edit-modal", (e) => {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// save Edit Profile on submit
// profileEditForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileDescription.textContent = inputDescription.value;
//   closePopup(profileEditModal);
// });

// open add profile modal on click of plus button
// profileAddButton.addEventListener("click", () => {
//   openPopup(addCardModal);
// });

const cardPopup = new PopupWithImage("#card-modal");
cardPopup.setEventListeners();

export function handleImageClick(name, link) {
  cardPopup.open(name, link);
}

function handleNewCardSubmit(data) {
  const { title, image } = data;
  const newData = { name: title, link: image };
  // initialCards.push(newData);
  const newCard = new Card(
    { name: title, link: image },
    "#cards__list-item",
    handleImageClick
  );
  // newCard.getView();
  cardList.setItem(newCard.getView());
  addFormValidator.disableButton();
}

const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleNewCardSubmit
);

newCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

// save new image information on submit
// addCardForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const newCard = { name: profileAddTitle.value, link: profileAddImage.value };
//   const submitButton = evt.submitter;
//   renderCard(newCard, cardsList);
//   evt.target.reset();
//   addFormValidator.disableButton();
//   closePopup(addCardModal);
// });
