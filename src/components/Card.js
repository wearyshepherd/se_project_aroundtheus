class Card {
  constructor(
    { cardDetails },
    myId,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
    
  ) {
    this._title = cardDetails.name;
    this._link = cardDetails.link;
    this._cardOwnerId = cardDetails.owner._id;
    this._id = cardDetails._id;
    this._cardSelector = cardSelector;
    this._likes = cardDetails.likes;
    this._likesCount = this._likes.length;
    this._myId = myId;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleApiLike = handleLikeClick;
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardTitleEl.textContent = this._title;

    this._cardImageEl = this._cardElement.querySelector(".card__image-card");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._title;
    this._cardLikesEl = this._cardElement.querySelector(".card__button-count");
    this._cardLikesEl.textContent = this._getLikes();
    this._trashEl = this._cardElement.querySelector(".card__button-del");
    if (this._cardOwnerId !== this._myId) {
      this._trashEl.classList.add("card__button-del-inactive");
    }

    if (this.isLiked()) {
      this._cardElement
        .querySelector(".card__button-like")
        .classList.add("card__button-like_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement // handle a click on the like button
      .querySelector(".card__button-like")
      .addEventListener("click", () => {
        this._handleLike(); // Line 76
      });

    this._cardElement // handle a click on the trashcan
      .querySelector(".card__button-del")
      .addEventListener("click", () => {
        this._handleDeleteClick(this, this._id);
      });

    this._cardElement // handle clicking for a large image
      .querySelector(".card__image-display")
      .addEventListener("click", () =>
        this._handleImageClick(this._title, this._link)
      );
  }

  _handleLike() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");


      if (this._cardElement.querySelector(".card__button-like_active")) {
       this._handleApiLike(this._id, true).then(() => {
          this.updateLikeCount(true);
        })

      } else {
       this._handleApiLike(this._id, false).then(() => {
          this.updateLikeCount(false);
        })
      }
  }

  _getLikes() {
    return this._likes.length;

  }

  updateLikeCount(add) {
    if (add) {
      this._likesCount++;
      this._cardLikesEl.textContent = this._likesCount;
    } else {
      this._likesCount--;
      this._cardLikesEl.textContent = this._likesCount;
    }
  }


  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  handleRemoveCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getUserID() {
    return this._ownerId._id;
  }
}

export default Card;

//