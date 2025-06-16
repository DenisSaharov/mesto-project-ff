// Функция работы ESC
function handleEscButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened')
    closeModal(openedPopup); 
  }
};

// Функция открытия модального окна
export function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscButton);
}

// Функция закрытия модального окна
export function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscButton);
}

export function openDeletePopup(cardId, cardElement) {
  const popupDelete = document.querySelector(".popup_type_delete");
  const buttonDelete = popupDelete.querySelector(".popup__button_type_delete");

  openModal(popupDelete);

  buttonDelete.onclick = null;

  buttonDelete.onclick = () => {
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        closeModal(popupDelete);
      })
  };
}