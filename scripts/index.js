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

// Find open and close buttons for edit profile button
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// find the form fields in
// Find modal form for editing profile in DOM
const profileEditForm = profileEditModal.querySelector(".modal__form");
const inputName = profileEditModal.querySelector(".form__input_name");
const inputDescription = profileEditModal.querySelector(
  ".form__input_description"
);

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

// open edit profile modal on click of edit button
profileEditButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// close edit profile modal on click of close button
profileEditCloseButton.addEventListener("click", () => {
  closePopup();
});

// save profile information on submit
profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup();
});

// Get template for initial card setup
const cardTemplate = document.querySelector("#cards__list-item").content;
const cardsList = document.querySelector(".cards__list");
const cardElement = cardTemplate
  .querySelector(".cards__list-item")
  .cloneNode(true);

// Loop through cards to render on DOM
initialCards.forEach((cardData) => {
  const cardElement = cardTemplate
    .querySelector(".cards__list-item")
    .cloneNode(true);
  cardElement.querySelector(".cards__image").src = cardData.link;
  cardElement.querySelector(".cards__image").alt = cardData.name;
  cardElement.querySelector(".cards__title").textContent = cardData.name;
  cardsList.append(cardElement);
});
