import { openModal } from './utils.js';

export default class Card {
constructor(data, cardSelector, handleDeleteClick, currentUserId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;

    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;

    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
}

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        
        return cardElement;
    }

_handleLikeIcon() {
    const likeButton = this._element.querySelector(".card__like-button");

    const method = this._isLiked ? "DELETE" : "PUT";

    fetch(`https://around-api.es.tripleten-services.com/v1/cards/${this._id}/likes`, {
        method: method,
        headers: {
            authorization: "f50e0620-c232-40a3-88cb-5c484b0b47b1"
        }
    })
    .then((res) => {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }

        return res.json();
    })
    .then((data) => {
        this._isLiked = data.isLiked;

        likeButton.classList.toggle("card__like-button_active");
    })
    .catch((err) => {
        console.error(err);
    });
}

_handleDeleteIcon() {
    this._handleDeleteClick();
}

deleteCard() {
    this._element.remove();
    this._element = null;
}

    _handleOpenCardPreview() {
        const imagePopup = document.querySelector("#image-popup");
        const popupImage = imagePopup.querySelector('.popup__image');
        const popupCaption = imagePopup.querySelector('.popup__caption');

        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupCaption.textContent = this._name;
        
        openModal(imagePopup);
    }

    _setEventListeners() {
        this._element.querySelector(".card__like-button").addEventListener("click", () => {
            this._handleLikeIcon();
        });
        
        const deleteButton = this._element.querySelector(".card__delete-button");

if (deleteButton) {
    deleteButton.addEventListener("click", () => {
        this._handleDeleteIcon();
    });
}

        this._element.querySelector(".card__image").addEventListener("click",() => {
            this._handleOpenCardPreview();
        });

    }

        generateCard() {
            this._element = this._getTemplate();
            this._setEventListeners();

            const cardImage = this._element.querySelector(".card__image");
            cardImage.src = this._link;
            cardImage.alt = this._name;
            this._element.querySelector(".card__title").textContent = this._name;
                const deleteButton = this._element.querySelector(".card__delete-button");
            if (this._ownerId !== this._currentUserId){
                deleteButton.remove();
                }

            if (this._isLiked) {
                this._element
                    .querySelector(".card__like-button")
                    .classList.add("card__like-button_active");
}

            return this._element;
        }
    }
