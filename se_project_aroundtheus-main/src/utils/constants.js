export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const editButton = document.querySelector(".profile__edit-button");
export const addImageButton = document.querySelector(".profile__add-button");
export const nameInput = document.querySelector('input[name="name"]');
export const descriptionInput = document.querySelector(
  'input[name="description"]'
);
export const profileName = document.querySelector(".profile__info-name");
export const profileDescription = document.querySelector(
  ".profile__info-description"
);

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button-inactive",
  inputErrorClass: "modal__input_type_error",
};

export const cardTitleInput = document.querySelector('input[name="title"]');
export const cardLinkInput = document.querySelector('input[name="link"]');
export const cardListSelector = ".content";
