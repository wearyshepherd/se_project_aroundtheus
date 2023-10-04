import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._popup.querySelector('.modal__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  open() {
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setButtonText(submit, buttonText = "Saving...") {
    if (submit) {
      console.log(this._submitButton)
      this._submitButton.textContent = buttonText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setSubmitAction(callback) {
    this._handleFormSubmit = callback;
  }

  setEventListeners() {
    this._form.addEventListener("submit", () => {
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}