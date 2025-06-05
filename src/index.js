// Import
import "/src/pages/index.css";
import { initialCards } from '/src/components/cards.js';
import { createCard, handleLikeButton , deleteCard } from '/src/components/card.js';
import { openModal, closeModal} from '/src/components/modal.js';

// 1) Редактирование профиля

// Переменные для редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupFormEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const profileEditButton = document.querySelector('.profile__edit-button');



// Открытие модального окна редактирования профиля
function openProfileModal() {
    popupInputTypeName.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
}

profileEditButton.addEventListener('click', openProfileModal);

//Отправка формы редактирования профиля
function saveProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputTypeName.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupTypeEdit);
}

popupFormEditProfile.addEventListener('submit', saveProfile); 

// 2) Работа карточек

//переменные для карточек
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupinputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputLinkTypeUrl = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const picturesList = document.querySelector('.pictures__list');

// Функция создания новой карточки с выбором метода вставки
function createNewCard(pictures, card, isNewCard = false) { 
    const newCardElement = createCard(card, handleLikeButton , deleteCard, viewCard); 
    if (newCardElement) { 
        if (isNewCard) {
            pictures.prepend(newCardElement);
        } else {
            pictures.append(newCardElement);
        }
    }
}

// Загрузка существующих карточек
function cardsLoad(pictures) { 
    initialCards.forEach(cardData => { 
       createNewCard(pictures, cardData);
    });
} 

// Отправка формы добавления новой карточки
function saveCard (evt) {
    evt.preventDefault();
    const newCard = {
        name: popupinputTypeCardName.value,
        link: popupInputLinkTypeUrl.value
    };
    createNewCard(picturesList, newCard, true);
    evt.target.reset();
    closeModal(popupTypeNewCard);
}

const profileAddButton = document.querySelector('.profile__add-button');
const popupFormNameNewCard = document.querySelector('.popup__form[name="new-card"]');
popupFormNameNewCard.addEventListener('submit', saveCard);
profileAddButton.addEventListener('click', () => {openModal(popupTypeNewCard);});

// Функция для открытия попапа просмотра карточки
function viewCard(card) {
    popupImage.src = card.link;
    popupImage.alt = card.name;
    popupCaption.textContent = card.name;
    openModal(popupTypeImage);
}

// Работа клика по крестику и пустому месту
const popup = document.querySelectorAll('.popup');
popup.forEach((event) => {
  event.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
  }
  })
})

cardsLoad(picturesList);