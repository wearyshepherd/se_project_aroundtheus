// IMPORT CLASS/MODULE
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import Api from "../utils/Api.js";
import {
  myId,
  _myId,
  addCardForm,
  editCardForm,
  profileNameSelector,
  profileProfessionSelector,
  openEditButton,
  professionInput,
  nameInput,
  avatarInput,
  destinations,
  openAddButton,
  avatarForm,
  openAvatarButton,
  profileImageSelector,
  
} from "../utils/Constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "../pages/index.css";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

// Creates and instance of API to access methods from
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: myId,
    "Content-Type": "application/json",
  },
});

// Creates an instance to create an individual card
const renderCard = (cardDetails) => {
  const card = new Card(
    // { cardDetails }
    { cardDetails },
    // myId
    _myId,
    // cardSelector
    "#card-template",
    // handle functions
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  const cardElement = card.getCardElement();

  return cardElement;
};

const handleImageClick = (title, link) => {
  cardImageModal.openModal(title, link);
};

const handleDeleteClick = (card, cardId) => {
  deleteCardConfirm.openModal(card, cardId);
};

const handleLikeClick = (cardId, isLiked) => {
  return api.updateCardLikes(cardId, isLiked).catch((err) => {
    console.error(err);
  });
};

const defaultDestinationSection = new Section(
  {
    renderer: renderCard,
  },
  destinations
);

// API promise to load cards and profile information
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ userData });
    userInfo.setAvatar(userData.avatar);

    defaultDestinationSection.renderItems(cards);
  })
  .catch(console.error);

// Creates a singular location for the various classes involved in validation
const formValidationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-name_error",
  errorClass: "modal__error_visible",
};

// Creates and instance of UserInfo and pulls the respective user data
const userInfo = new UserInfo(
  profileNameSelector,
  profileProfessionSelector,
  profileImageSelector
);

// Creates and instance of popupform to access methods for forms
const editProfileForm = new PopupWithForm("#editProfile-modal", (values) => {
  return api.updateUserInfo(values).then((res) => {
    const result = {
      userData: { name: values.name, about: values.profession },
    };
    userInfo.setUserInfo(result);
  });
});

// Creates an instance for accessing methods for updating the avatar image
const editAvatarForm = new PopupWithForm("#editAvatar-modal", (values) => {
  api.updateUserAvatar(values).then((res) => {
    const result = {
      avatar: values.avatar,
          };

    userInfo.setAvatar(values.avatar);
  });
});
// Opens the form for Avatar
openAvatarButton.addEventListener("click", () => {
  editAvatarValidator.toggleButtonState();
  const avatarData = userInfo.getAvatar();
  avatarInput.value = avatarData.src;

  editAvatarForm.openModal();
});

// Opens the form for name and profession
openEditButton.addEventListener("click", () => {
  editFormValidator.toggleButtonState();
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  professionInput.value = profileData.profession;

  editProfileForm.openModal();
});

// For gaining access to methods within popup form
const newDestinationCardForm = new PopupWithForm(
  "#newCard-modal",
  (newCardInputs) => {
    
    return api.addDestinationCard(newCardInputs).then((res) => {
     const card = renderCard(res);
      defaultDestinationSection.addItem(card);
      
      
    });
  }
);

// Opens the modal that adds destination cards
openAddButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  newDestinationCardForm.openModal();
});

// Creates an instance of a delete confirmation
const deleteCardConfirm = new PopupWithConfirm(
  //modalSelector
  "#deleteCard-modal",
  // handleConfirmSubmit

  // deleteCard()
  (card, cardId) => {
    return api.delDestinationCard(cardId).then(() => {
      card.handleRemoveCard();
    });
  }
);

const cardImageModal = new PopupWithImage("#viewImage-modal");

const addFormValidator = new FormValidator(formValidationConfig, addCardForm);
const editFormValidator = new FormValidator(formValidationConfig, editCardForm);
const editAvatarValidator = new FormValidator(formValidationConfig, avatarForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
editAvatarValidator.enableValidation();


//