export const initialCards = [
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

export const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

// Wrappers
export const profileEditModal = document.querySelector("#profile-edit-modal");

// Forms
export const profileEditForm = document.forms["edit-form"];
export const addCardForm = document.forms["add-form"];

// Find open and close buttons for edit profile button
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const inputName = profileEditModal.querySelector(".form__input_name");
export const inputDescription = profileEditModal.querySelector(
  ".form__input_description"
);

// Find open/close/form fields for add profile button
export const profileAddButton = document.querySelector(".profile__add-button");
