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

