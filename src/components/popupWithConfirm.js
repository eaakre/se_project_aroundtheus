import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupConfirm = this._popupElement.querySelector(".modal__form");
    this._popupSubmit = this._popupElement.querySelector(".modal__button");
  }

  setEventListeners() {
    this._popupConfirm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._popupSubmit.textContent = submitText;
    } else {
      this._popupSubmit.textContent = "Yes";
    }
  }

  setSubmitAction(action) {
    this._handleSubmit = action;
  }
}
