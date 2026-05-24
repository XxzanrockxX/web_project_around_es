import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openModal, closeModal } from './utils.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';

const config = {
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
const profileAvatar = document.querySelector('.profile__image');
const avatarEditButton = document.querySelector(
  '.profile__avatar-edit-button'
);

const avatarPopup = document.querySelector('#avatar-popup');

const avatarForm = document.querySelector('#avatar-form');

const avatarInput = document.querySelector('#avatar-link-input');

let currentUserId;

const editForm = document.querySelector('#edit-profile-form');
const addCardButton = document.querySelector('.profile__add-button');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');

const addCardPopup = document.querySelector('#new-card-popup');
const addCardForm = document.querySelector('#new-card-form');

const cardTitleInput = addCardForm.querySelector('.popup__input_type_card-title');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');

const imagePopup = document.querySelector('#image-popup');

const editSubmitButton = editForm.querySelector('.popup__button');

const addCardSubmitButton =
  addCardForm.querySelector('.popup__button');

const avatarSubmitButton =
  avatarForm.querySelector('.popup__button');

/* === INITIALIZATION === */
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/* === DELETE POPUP === */
const deleteCardPopup = new PopupWithConfirmation('#delete-card-popup');

deleteCardPopup.setEventListeners();

/* === EVENT LISTENERS === */
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  editFormValidator.resetValidation();

  openModal(editPopup);
});

addCardButton.addEventListener('click', () => {
  addCardForm.reset();

  addCardFormValidator.resetValidation();

  openModal(addCardPopup);
});

avatarEditButton.addEventListener('click', () => {

  avatarForm.reset();

  avatarFormValidator.resetValidation();

  openModal(avatarPopup);

});

/* === IMAGE POPUP CLOSE === */
imagePopup.addEventListener('mousedown', (evt) => {
  if (
    evt.target.classList.contains('popup_is-opened') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModal(imagePopup);
  }
});

/* === EDIT POPUP CLOSE === */
editPopup.addEventListener('mousedown', (evt) => {
  if (
    evt.target.classList.contains('popup_is-opened') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModal(editPopup);
  }
});

/* === ADD CARD POPUP CLOSE === */
addCardPopup.addEventListener('mousedown', (evt) => {
  if (
    evt.target.classList.contains('popup_is-opened') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModal(addCardPopup);
  }
});

/* === EDIT PROFILE === */
editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  editSubmitButton.textContent = 'Guardando...';

  fetch('https://around-api.es.tripleten-services.com/v1/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {
      console.log(data);

      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(editPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editSubmitButton.textContent = 'Guardar';
    });
});

/* === ADD CARD === */
addCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('https://around-api.es.tripleten-services.com/v1/cards', {
    method: 'POST',
    headers: {
      authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardTitleInput.value,
      link: cardLinkInput.value
    })
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }

      return res.json();
    })
    .then((cardData) => {
      console.log(cardData);

      const newCard = new Card(
        cardData,
        '#card-template',

        () => {

          deleteCardPopup.setSubmitAction(() => {

            fetch(`https://around-api.es.tripleten-services.com/v1/cards/${cardData._id}`, {
              method: 'DELETE',
              headers: {
                authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1'
              }
            })
              .then((res) => {
                if (!res.ok) {
                  return Promise.reject(`Error: ${res.status}`);
                }

                newCard.deleteCard();

                deleteCardPopup.close();
              })
              .catch((err) => {
                console.error(err);
              })
              .finally(() => {
                addCardSubmitButton.textContent = 'Crear';
              });
          });

          deleteCardPopup.open();
        },

        currentUserId
      ); 

      const cardElement = newCard.generateCard();

      cardsContainer.prepend(cardElement);

      closeModal(addCardPopup);

      addCardForm.reset();

      addCardFormValidator.resetValidation();
    })
    .catch((err) => {
      console.error(err);
    });
});

/* === UPDATE AVATAR === */
avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('https://around-api.es.tripleten-services.com/v1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarInput.value
    })
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }

      return res.json();
    })
    .then((data) => {

      console.log(data);

      profileAvatar.src = data.avatar;

      closeModal(avatarPopup);

    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarSubmitButton.textContent = 'Guardar';
    });
});

/* === INITIAL DATA === */
Promise.all([
  fetch('https://around-api.es.tripleten-services.com/v1/users/me', {
    headers: {
      authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
    },
  }),

  fetch('https://around-api.es.tripleten-services.com/v1/cards', {
    headers: {
      authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
    },
  })
])

.then(([userRes, cardsRes]) => {

  if (!userRes.ok || !cardsRes.ok) {
    return Promise.reject('Error loading data');
  }

  return Promise.all([
    userRes.json(),
    cardsRes.json()
  ]);
})

.then(([userData, cards]) => {

  console.log(userData);
  console.log(cards);

  currentUserId = userData._id;

  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;

  cards.forEach((cardData) => {

    const card = new Card(
      cardData,
      '#card-template',

      () => {

        deleteCardPopup.setSubmitAction(() => {

          fetch(`https://around-api.es.tripleten-services.com/v1/cards/${cardData._id}`, {
            method: 'DELETE',
            headers: {
              authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1'
            }
          })
            .then((res) => {
              if (!res.ok) {
                return Promise.reject(`Error: ${res.status}`);
              }

              card.deleteCard();

              deleteCardPopup.close();
            })
            .catch((err) => {
              console.error(err);
            });

        });

        deleteCardPopup.open();
      },

      currentUserId
    );

    const cardElement = card.generateCard();

    cardsContainer.appendChild(cardElement);
  });

})

.catch((err) => {
  console.error(err);
});

avatarPopup.addEventListener('mousedown', (evt) => {
  if (
    evt.target.classList.contains('popup_is-opened') ||
    evt.target.classList.contains('popup__close')
  ) {
    closeModal(avatarPopup);
  }
});