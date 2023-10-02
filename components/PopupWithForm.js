import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._inputList = this._popupElement.querySelectorAll(".form__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    console.log(this._inputList);
    return data;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
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
