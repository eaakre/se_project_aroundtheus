let initialCards = [
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

// Find modal form for editing profile in DOM
let modalForm = document.querySelector(".modal__form");

// Find open and close buttons for edit profile button
let editButton = document.querySelector(".profile__edit-button");
let profileEditModal = document.querySelector("#profile-edit-modal");
let modalCloseButton = document.querySelector(".modal__close");

// find the profile elements in DOM
let profileName = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");

// find the form fields in DOM
let inputName = profileEditModal.querySelector(".form__input_name");
let inputDescription = profileEditModal.querySelector(
  ".form__input_description"
);

// open edit profile modal on click of edit button
editButton.addEventListener("click", function () {
  profileEditModal.classList.add("modal_opened");
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// close edit profile modal on click of close button
modalCloseButton.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_opened");
});

// handle the form submission to save name and description
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = inputName.value;
  const newDescription = inputDescription.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
}

// Add functionality to Save button
modalForm.addEventListener("click", handleProfileFormSubmit);

// Get template for initial card setup
let cardTemplate = document.querySelector("#cards__list-item").content;
let cardsList = document.querySelector(".cards__list");
let cardElement = cardTemplate
  .querySelector(".cards__list-item")
  .cloneNode(true);

// Loop through cards to render on DOM
initialCards.forEach((cardData) => {
  let cardElement = cardTemplate
    .querySelector(".cards__list-item")
    .cloneNode(true);
  cardElement.querySelector(".cards__image").src = cardData.link;
  cardElement.querySelector(".cards__title").textContent = cardData.name;
  cardsList.append(cardElement);
});
