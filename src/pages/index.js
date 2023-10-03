import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  profileEditForm,
  addCardForm,
  profileEditButton,
  inputName,
  inputDescription,
  profileAddButton,
} from "../utils/constants.js";
import "./index.css";

// Functions
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
