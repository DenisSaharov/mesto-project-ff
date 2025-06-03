// Функция работы ESC
function escButton(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup); 
  }
};

// Работа клика по крестику и пустому месту
const popup = document.querySelectorAll('.popup');
popup.forEach((event) => {
  event.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
  }
  })
})

// Функция открытия модального окна
function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-animated');
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', escButton);
}

// Функция закрытия модального окна
function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', escButton);
}

export { openModal, closeModal};