import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/popupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import {
  config,
  profileEditForm,
  addCardForm,
  profileEditButton,
  inputName,
  inputDescription,
  profileAddButton,
  profileAvatar,
  profileAvatarEdit,
} from "../utils/constants.js";
import "./index.css";

let cardList;
let newCard;

// Functions
function handleEditProfileSubmit(data) {
  api
    .updateProfile({
      name: data.title,
      description: data.description,
    })
    .then(
      api.getUser().then((info) => {
        userInfo.setUserInfo({
          name: info.name,
          description: info.about,
          avatar: info.avatar,
        });
      })
    );
  editProfilePopup.close();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
}

export function handleImageClick(name, link) {
  cardPopup.open(name, link);
}

const createCard = (cardObject) => {
  const card = new Card(
    cardObject,
    "#cards__list-item",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  return card.getView();
};

// enable userInfo
const userInfo = new UserInfo({
  userName: ".profile__title",
  userJob: ".profile__description",
  userAvatar: ".profile__avatar",
});

// enable API calls
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a93ebd2f-fd06-499f-b2f9-74e2f8519709",
    "Content-Type": "application/json",
  },
});

// Render user info on page load
api.getUser().then((info) => {
  userInfo.setUserInfo({
    name: info.name,
    description: info.about,
  });
  profileAvatar.src = info.avatar;
  profileAvatar.alt = info.name + " avatar";
});

// Render cards on page load
api.getInitialCards().then((initialCards) => {
  cardList = new Section(
    { data: initialCards, renderer: renderCard },
    ".cards__list",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  cardList.renderItems();
});

// enabling validation by calling enableValidation()
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

// Editing Profile Interaction
// Edit Profile Information
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileSubmit
);
editProfilePopup.setEventListeners();

// On click event for editProfile button
profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.job;
  let newInfo = { name: inputName.value, description: inputDescription.value };
  userInfo.setUserInfo(newInfo);
});

// New Card Interaction
// Add new card
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  ({ title, image }) => {
    newCardPopup.setSubmitText(true);
    api
      .addCard(title, image)
      .then((card) => {
        newCard = createCard({ name: card.name, link: card.link });
        cardList.addItem(newCard);
      })
      .catch((err) => console.log(err))
      .finally(() => newCardPopup.setSubmitText(false));
  }
);
newCardPopup.setEventListeners();

// On click event for addCard button
profileAddButton.addEventListener("click", () => {
  addFormValidator.disableButton();
  newCardPopup.open();
});

// Profile Picture Interaction
// Update Profile Picture
const updateAvatarPopup = new PopupWithForm("#update-avatar-modal", (image) => {
  updateAvatarPopup.setSubmitText(true);
  api
    .updateProfilePicture(image.image)
    .then((userData) => {
      userInfo.setUserAvatar(userData.avatar);
      updateAvatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => updateAvatarPopup.setSubmitText(false));
});
updateAvatarPopup.setEventListeners();

// On click event for update profile picture
profileAvatarEdit.addEventListener("click", () => {
  addFormValidator.disableButton();
  updateAvatarPopup.open();
});

// Existing Card Interaction
// Zoom in on card image
const cardPopup = new PopupWithImage("#card-modal");
cardPopup.setEventListeners();

// Delete Card Popup
const deleteCardPopup = new PopupWithConfirm("#delete-card-modal");
deleteCardPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setSubmitText(true, "Deleting...");
    api
      .deleteCard(card._id)
      .then(() => {
        deleteCardPopup.close();
        card.handleDeleteCard();
      })
      .catch((err) => console.error(err))
      .finally(() => deleteCardPopup.setSubmitText(false));
  });
}

// Like Card Functionality
function handleLikeClick(card) {
  if (!card._isLiked) {
    api
      .likeCard(card._id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLikeCard(card._id)
      .then(() => {
        card.handleLikeIcon();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
