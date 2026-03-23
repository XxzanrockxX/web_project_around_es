export function openModal(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closeByEscape);
}

export function closeModal(popup){
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closeByEscape);
} 

function closeByEscape(evt){
    if (evt.key === "Escape"){
        const openedPopup = document.querySelector(".popup_opened");
        closeModal(openedPopup);
    }
}