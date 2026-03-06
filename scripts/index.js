const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');
const cardsContainer = document.querySelector('.cards__list'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const editForm = document.querySelector('#edit-profile-form');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('#new-card-popup'); 
const addCardForm = document.querySelector('#new-card-form');
const cardTitleInput = addCardForm.querySelector('.popup__input_type_card-title');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImagePopupButton = imagePopup.querySelector('.popup__close');

const  initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },

  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },

  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },

  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/**
 * Maneja el clic en el botón de cierre del modal y cierra el modal correspondiente.
 * @function handleCloseClick
 * @param {Event} evt - El evento de clic
 */
function handleCloseClick(evt) {
  const popup = evt.target.closest('.popup');
  closeModal(popup);  
}

/**
 * Abre un modal agregando la clase de apertura y el event listener al botón de cierre.
 * @function openModal
 * @param {HTMLElement} modal - El elemento modal a abrir
 */
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  const closeBtn = modal.querySelector('.popup__close');
  closeBtn.addEventListener('click', handleCloseClick);
}

/**
 * Cierra un modal eliminando la clase de apertura y el event listener del botón de cierre.
 * @function closeModal
 * @param {HTMLElement} modal - El elemento modal a cerrar
 */
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  const closeBtn = modal.querySelector('.popup__close');
  closeBtn.removeEventListener('click', handleCloseClick);
}

/**
 * Rellena el formulario de edición de perfil con los datos actuales del perfil.
 * @function fillProfileForm
 */
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

/**
 * Maneja la apertura del modal de edición de perfil, rellenando el formulario con los datos actuales.
 * @function handleOpenEditModal
 */
function handleOpenEditModal() {
  fillProfileForm();

  const inputList = Array.from(editForm.querySelectorAll('.popup__input'));
  const buttonElement = editForm.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    hideInputError(editForm, inputElement);
  });

  toggleButtonState(inputList, buttonElement);

  openModal(editPopup);
}

/**
 * Maneja el envío del formulario de edición de perfil.
 * @function handleProfileFormSubmit
 * @param {Event} evt - El evento de envío del formulario
 */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  }
};

const setEventListenersForValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);  
    });
  });
};


/**
 * Crea un nuevo elemento de tarjeta a partir de los datos proporcionados.
 * @function getCardElement
 * @param {Object} data - Los datos de la tarjeta
 * @param {string} data.name - El nombre/título de la tarjeta
 * @param {string} data.link - La URL de la imagen de la tarjeta
 * @returns {HTMLElement} El elemento de tarjeta creado
 */
function getCardElement(data) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardTitle.textContent = data.name || "sin título";
  cardImage.src = data.link || "./images/placeholder.jpg";
  cardImage.alt = data.name || "Imagen sin título";

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

    cardImage.addEventListener('click', () => {
    popupImage.src = data.link; 
    popupImage.alt = data.name; 
    popupCaption.textContent = data.name;
    openModal(imagePopup);
  });


  return cardElement;
}

/**
 * Renderiza una tarjeta agregándola al contenedor especificado.
 * @function renderCard
 * @param {Object} data - Los datos de la tarjeta
 * @param {HTMLElement} container - El elemento contenedor donde se agregará la tarjeta
 */
function renderCard(data, container) {
  const cardElement = getCardElement(data);
  container.prepend(cardElement);
}

/**
 * Maneja el envío del formulario para agregar una nueva tarjeta.
 * @function handleAddCardFormSubmit
 * @param {Event} evt - El evento de envío del formulario
 */
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };
  renderCard(newCardData, cardsContainer);

  closeModal(addCardPopup);
  
  addCardForm.reset();

}

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});


addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
editButton.addEventListener('click', handleOpenEditModal);
editForm.addEventListener('submit', handleProfileFormSubmit);

setEventListenersForValidation(editForm);
setEventListenersForValidation(addCardForm);




 
  