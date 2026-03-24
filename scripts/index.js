import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal } from './utils.js';

const config ={
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

/* === DOM ELEMENTS === */
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const cardsContainer = document.querySelector('.cards__list'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('#edit-profile-form');
const addCardButton = document.querySelector('.profile__add-button');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const addCardPopup = document.querySelector('#new-card-popup'); 
const addCardForm = document.querySelector('#new-card-form');
const cardTitleInput = addCardForm.querySelector('.popup__input_type_card-title');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

/* === INITIALIZATION === */
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* === RENDER INITIAL CARDS === */
const initialCards = [
  { name: 'Yosemite Valley', link: 'https://code.s3.yandex.net/web-code/yosemite.jpg' },
  { name: 'Lake Louise', link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg' },
  { name: 'Bald Mountains', link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg' },
  { name: 'Latemar', link: 'https://code.s3.yandex.net/web-code/latemar.jpg' },
  { name: 'Vanoise National Park', link: 'https://code.s3.yandex.net/web-code/vanoise.jpg' },
  { name: 'Lago di Braies', link: 'https://code.s3.yandex.net/web-code/lago.jpg' }
];

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.appendChild(cardElement);
});

/* === EVENT LISTENERS === */
editButton.addEventListener("click",() => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    editFormValidator.resetValidation();

    openModal(editPopup);
});

addCardButton.addEventListener("click",() => {
  addCardForm.reset();
  openModal(addCardPopup);
});

/** === FORM SUBMISSION HANDLERS === */
editForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editPopup);
});

addCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCardData = {
        name: cardTitleInput.value,
        link: cardLinkInput.value
    };
    const newCard = new Card(newCardData, '#card-template');
    const cardElement = newCard.generateCard();
    cardsContainer.prepend(cardElement);
    closeModal(addCardPopup);

    addCardForm.reset();

    addCardFormValidator.resetValidation();
});

/** === close popup by clicking on overlay or close button === */
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_is-opened") || evt.target.classList.contains("popup__close")) {
            closeModal(popup);
        }
    });
});   