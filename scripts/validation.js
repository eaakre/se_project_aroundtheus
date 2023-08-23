function showInputError(
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    return showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  }
  hideInputError(formElement, inputElement, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

function disableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.add(inactiveButtonClass);
  return (submitButton.disabled = true);
}

function enableButton(submitButton, { inactiveButtonClass }) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputList, submitButton, options) {
  if (hasInvalidInput(inputList)) {
    return disableButton(submitButton, options);
  }
  enableButton(submitButton, options);
}

function setEventListeners(formElement, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputList, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const { formSelector } = options;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

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

enableValidation(config);
