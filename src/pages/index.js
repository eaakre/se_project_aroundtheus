import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
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
  profileAvatarEdit,
  avatarForm,
} from "../utils/constants.js";
import "./index.css";

let cardList;
let newCard;

// Functions
function renderCard(data) {
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
}

export function handleImageClick(name, link) {
  cardPopup.open(name, link);
}

// Like Card Functionality
function handleLikeClick(card) {
  if (!card.isLiked()) {
    api
      .likeCard(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .removeLikeCard(card._id)
      .then((res) => {
        card.setIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
  userAbout: ".profile__description",
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

// Render user info and cards on page load
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({ name: data.name, about: data.about });
    userInfo.setUserAvatar(data.avatar, data.name);
    cardList = new Section(
      { data: cards, renderer: renderCard },
      ".cards__list"
    );
    cardList.renderItems();
  })
  .catch((err) => console.log(err));

// enabling validation by calling enableValidation()
const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation();

// Editing Profile Interaction
// Edit Profile Information
const editProfilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  editProfilePopup.setSubmitText(true);
  api
    .updateProfile(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editProfilePopup.setSubmitText(false));
});
editProfilePopup.setEventListeners();

// On click event for editProfile button
profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.about;
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
        newCard = createCard({
          name: card.name,
          link: card.link,
          _id: card._id,
          isLiked: false,
        });
        cardList.addItem(newCard);
        newCardPopup.close();
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
      userInfo.setUserAvatar(userData.avatar, userData.name);
      updateAvatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => updateAvatarPopup.setSubmitText(false));
});
updateAvatarPopup.setEventListeners();

// On click event for update profile picture
profileAvatarEdit.addEventListener("click", () => {
  avatarFormValidator.disableButton();
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
