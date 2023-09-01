export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this.closeModalByEscape);
    document.addEventListener("click", this.closeModalOnRemoteClick);
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.closeModalByEscape);
    document.removeEventListener("click", this.closeModalOnRemoteClick);
  }

  closeModalByEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  closeModalOnRemoteClick = (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      this.close();
    }
  };

  setEventListeners() {
    this._closeButton = this._popupElement.querySelector(".modal__exit-button");
    this._closeButton.addEventListener("click", () => this.close());
  }
}
