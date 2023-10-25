import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".form__input");
    this._handleFormSubmit = handleFormSubmit;
    this._popupSubmit = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._popupSubmit.textContent = submitText;
    } else {
      this._popupSubmit.textContent = "Save";
    }
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
