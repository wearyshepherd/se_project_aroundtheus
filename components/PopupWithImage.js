import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImageTitle = this._modalElement.querySelector(
      ".modal__image-title"
    );
    this._modalImageLink = this._modalElement.querySelector(
      ".modal__image-display"
    );
  }

  openModal(title, link) {
    this._modalImageLink.src = link;
    this._modalImageTitle.textContent = title;
    this._modalImageTitle.alt = title;
    super.openModal();
  }

  closeModal = () => {
    super.closeModal();
  };
}

//