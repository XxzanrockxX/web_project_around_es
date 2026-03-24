import { openModal } from './utils.js';

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        
        return cardElement;
    }

    _handleLikeIcon() {
        this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
    }

    _handleDeleteIcon() {
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
        this._element.querySelector(".card__delete-button").addEventListener("click",() => {
            this._handleDeleteIcon();
        });
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

            return this._element;
        }
    }
