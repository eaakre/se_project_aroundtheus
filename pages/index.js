import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
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

function handleEditProfileSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
}

function handleNewCardSubmit(data) {
  const { title, image } = data;
  const newCard = new Card(
    { name: title, link: image },
    "#cards__list-item",
    handleImageClick
  );
  cardList.setItem(newCard.getView());
  addFormValidator.disableButton();
}

export function handleImageClick(name, link) {
  cardPopup.open(name, link);
}

// Render Section on page load
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

// enable userInfo
const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
});

// enablePopupWithForm on editProfile
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
editProfilePopup.setEventListeners();

// enablePopupWithForm on newCard
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleNewCardSubmit
);
newCardPopup.setEventListeners();

// enable PopupWithImage on cards
const cardPopup = new PopupWithImage("#card-modal");
cardPopup.setEventListeners();

// On click event for editProfile button
profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.job;
});

// On click event for addCard button
profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

// save Edit Profile on submit
// profileEditForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   profileName.textContent = inputName.value;
//   profileDescription.textContent = inputDescription.value;
//   closePopup(profileEditModal);
// });
