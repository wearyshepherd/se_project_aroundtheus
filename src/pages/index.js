//import all the classes
import "./index.css";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  editButton,
  addImageButton,
  settings,
  initialCards,
  cardListSelector,
  nameInput,
  descriptionInput,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const formValidators = {};

//function
const enableValidation = (settings) => {
  const formList = [...document.querySelectorAll(settings.formSelector)];
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function handleImageFormSubmit(name, link) {
  renderCard({ name: name, link: link });
  addImagePopup.close();
}

function handleProfileFormSubmit(name, description) {
  userInfo.setUserInfo({
    name: name,
    job: description,
  });

  editProfilePopup.close();
}

const setEditPopupValues = () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
};

const renderCard = (cardData) => {
  const newCard = new Card(
    cardData,
    "#card-template",
    imagePopup,
    (title, link) => imagePopup.open(title, link)
  );
  cardSection.addItem(newCard.getView());
};

// Instnatiate elements

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-description",
});

const imagePopup = new PopupWithImage({ popupSelector: "#image-popup" });

const editProfilePopup = new PopupWithForm(
  "#edit_profile_modal",
  ({ name, description }) => handleProfileFormSubmit(name, description)
);
const addImagePopup = new PopupWithForm(
  "#add_image_modal",
  ({ title, link }) => {
    handleImageFormSubmit(title, link);
  }
);
editProfilePopup.setEventListeners();
addImagePopup.setEventListeners();
imagePopup.setEventListeners();

// render the cards
const cardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListSelector
);

enableValidation(settings);
cardSection.renderItems();

//specific event listeners

editButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  setEditPopupValues();
  editProfilePopup.open();
});

addImageButton.addEventListener("click", () => {
  formValidators["add-image-form"].resetValidation();
  addImagePopup.open();
});
