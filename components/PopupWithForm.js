import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".form__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // collect data from all the input fields
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    // return data as an object
    return data;
  }

  setEventListeners() {
    // add the submit event handler to the form
    // add the click event listener to the close icon
    this._popupForm.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
