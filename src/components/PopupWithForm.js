import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._modalInputs = this._popupForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this.subButton = this._popupForm.querySelector('.modal__button');
    this.subButtonText = this.subButton.textContent;
    
  }

  _handleSubmit = () => {
        this._handleFormSubmit(this._getInputValues())
    .then(() => {
      this.closeModal();
    })
    .finally(() => {
      this.renderLoading(false);
    });
  };

  _getInputValues() {
    const inputValues = {};

    this._modalInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  _setEventListeners() {
    super._setEventListeners();
    
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleSubmit()
     
    });
  
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  closeModal = () => {
    this._popupForm.reset();
    super.closeModal();
  };

  renderLoading(isLoading, saveButtonText = "Saving...") {
    if (isLoading) {
      this.subButton.textContent = saveButtonText;
    } else {
      this.subButton.textContent = this.subButtonText;
    }
  }
}

//