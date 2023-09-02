export default class Card {
  constructor(cardData, cardSelector, popupWithImage, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._popupWithImage = popupWithImage;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    //define elements
    this._likeButton = this._cardElement.querySelector(
      ".content__card-like-button"
    );
    this._deleteButton = this._cardElement.querySelector(
      ".content__card-delete-button"
    );
    this._imageContainer = this._cardElement.querySelector(
      ".content__card-image"
    );

    //event listeners
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIcon();
    });
  }

  //Handle Methods

  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("content__card-like-button_clicked");
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".content__card")
      .cloneNode(true);

    this._cardTitle = this._cardElement.querySelector(".content__card-text");
    this._cardImage = this._cardElement.querySelector(".content__card-image");

    //call previously defined methods
    this._renderCard();
    this._setEventListeners();

    return this._cardElement;
  }

  //render card
  _renderCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }
}
