import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(modalSelector, handleConfirmSubmit) {
    super(modalSelector);
    this._handleConfirmSubmit = handleConfirmSubmit;
    this._popupForm = this._modalElement.querySelector(".modal__form");
    this._modalInputs = this._popupForm.querySelectorAll(".modal__input");
  }

  openModal(card, cardId) {
    super.openModal();
    this._card = card;
    this._cardId = cardId;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleConfirmSubmit(this._card, this._cardId);
    this.closeModal();
  };

  _setEventListeners() {
    super._setEventListeners();

    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
  }

  closeModal = () => {
    this._popupForm.reset();
    super.closeModal();
  };
}

//