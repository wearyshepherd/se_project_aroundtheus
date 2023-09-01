import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
  }

  reset() {
    if (this._form) {
      this._form.reset();
    }
  }

  close = () => {
    super.close();
    this.reset();
  };

  _getInputValues() {
    const inputList = [...this._popupElement.querySelectorAll("input")];
    const inputValues = {};
    for (const input of inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
