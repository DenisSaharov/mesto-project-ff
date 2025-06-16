import "/src/pages/index.css";
import { createCard , deleteCard, cardLikeCheck, toggleLikeButton, updateLikeCount} from '/src/components/card.js';
import {
  openModal,
  closeModal
} from '/src/components/modal.js';
import { enableValidation, clearValidation } from '/src/components/validation.js';
import {
  getUserInfo,
  getCards,
  updateUserInfo,
  addNewCard,
  updateAvatar,
  likeCardFromAPI,
} from "/src/components/api.js";

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupInputTypeName = popupTypeEdit.querySelector('.popup__input_type_name');
const popupInputTypeDescription = popupTypeEdit.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupFormEditProfile = document.querySelector('.popup__form[name="edit-profile"]');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupinputTypeCardName = document.querySelector('.popup__input_type_card-name');
const picturesList = document.querySelector('.pictures__list');
const popupFormNameNewCard = document.querySelector('.popup__form[name="new-card"]');
const placeLinkInput = popupFormNameNewCard.elements["link"];
const profileImageWrapper = document.querySelector(".profile__image-wrapper");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = popupTypeAvatar.querySelector(".popup__form_avatar");
const avatarInput = popupAvatarForm.querySelector('input[name="avatar"]');
const profileImage = document.querySelector(".profile__image");
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Обработка модальных окон
function openModalListen() {

  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');

  profileEditButton.addEventListener("click", () => {
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeDescription.value = profileDescription.textContent;
    clearValidation(popupFormEditProfile, validationConfig);
    openModal(popupTypeEdit);
  });

  profileAddButton.addEventListener("click", () => {
    popupFormNameNewCard.reset();
    clearValidation(popupFormNameNewCard, validationConfig);
    openModal(popupTypeNewCard);
  });
}

function closeModalListen() {
  const popupClose = document.querySelectorAll(".popup__close");
  popupClose.forEach((button) => {
    const popup = button.closest(".popup");
    button.addEventListener("click", () => closeModal(popup));
  });
}


function handleLikeButtonClick(cardId, likeButton, likeCountElement) {
    const isLiked = cardLikeCheck(likeButton); // Используем функцию для проверки статуса лайка

    likeCardFromAPI(cardId, isLiked)
        .then((data) => {
            toggleLikeButton(likeButton); // Используем функцию для переключения состояния кнопки
            updateLikeCount(likeCountElement, data.likes); // Обновляем счетчик лайков
        })
        .catch((error) => {
            console.error("Ошибка при обновлении лайка:", error);
        });
}

// Сохранение данных профиля
function saveProfile(evt) {
  evt.preventDefault();
  const name = popupInputTypeName.value;
  const about = popupInputTypeDescription.value;
  const saveButton = evt.submitter;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateUserInfo(name, about)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

// Добавление новой карточки
function createNewCard (evt) {
  evt.preventDefault();
  const name = popupinputTypeCardName.value;
  const link = placeLinkInput.value;

  const saveButton = evt.submitter;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  addNewCard(name, link)
    .then((data) => {
      const newCardElement = createCard(
        data,
        deleteCard,
        handleLikeButtonClick,
        handleViewImage,
        data.owner._id
      );
      picturesList.prepend(newCardElement);
      closeModal(popupTypeNewCard);
      popupFormNameNewCard.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

// Подключение обработчиков
function attachEventListeners() {
  popupFormEditProfile.addEventListener("submit", saveProfile);
  popupFormNameNewCard.addEventListener("submit", createNewCard);
  openModalListen();
  closeModalListen();
}

function handleViewImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    const currentUserId = userData._id;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      const cardElement = createCard(
        cardData,
        deleteCard,
        handleLikeButtonClick,
        handleViewImage,
        currentUserId
      );
      picturesList.appendChild(cardElement);
    });
  })
  .catch((error) => {
    console.error(
      "Ошибка при получении данных пользователя или карточек:",
      error
    );  
  });

attachEventListeners();
enableValidation(validationConfig);

profileImageWrapper.addEventListener("click", () => {
  openModal(popupTypeAvatar);
});

popupAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const avatarUrl = avatarInput.value;

  const saveButton = evt.submitter;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateAvatar(avatarUrl)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupTypeAvatar);
      popupAvatarForm.reset();
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
});


























