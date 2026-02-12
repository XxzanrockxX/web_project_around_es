const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#edit-popup');

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

function handleCloseClick(evt) {
  const popup = evt.target.closest('.popup');
  closeModal(popup);  
}

function openModal(modal) {
  modal.classList.add('popup_is-opened');
  const closeBtn = modal.querySelector('.popup__close');
  closeBtn.addEventListener('click', handleCloseClick);
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  const closeBtn = modal.querySelector('.popup__close');
  closeBtn.removeEventListener('click', handleCloseClick);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editPopup);
}

editButton.addEventListener('click', handleOpenEditModal);


editForm.addEventListener('submit', handleProfileFormSubmit);

let initialCards = [
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
    popupImage.src = data.link; // Le pasamos la URL de la imagen
    popupImage.alt = data.name; // Le pasamos el texto alternativo
    popupCaption.textContent = data.name; // Ponemos el título debajo de la foto
    openModal(imagePopup);
  });


  return cardElement;
}

function renderCard(data, container) {
  const cardElement = getCardElement(data);
  container.prepend(cardElement);
}

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

const cardsContainer = document.querySelector('.cards__list'); 

initialCards.forEach((item) => {
  renderCard(item, cardsContainer);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});


addCardForm.addEventListener('submit', handleAddCardFormSubmit);

 
  