import { openModal, closeModal } from '/src/components/modal.js';
import { deleteCardFromServer ,likeCardFromAPI } from '/src/components/api.js';

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  cardData,
  deleteCallback,
  likeCallback,
  viewImageCallback,
  currentUserId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;
  
  const isLiked = cardData.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      openDeletePopup(cardData._id, cardElement);
    });
  }

  likeButton.addEventListener("click", () => {
    likeCallback(cardData._id, likeButton, likeCountElement);
  });

  cardImage.addEventListener("click", () => {
    viewImageCallback(cardData);
  });

  return cardElement;
}

function openDeletePopup(cardId, cardElement) {
  const popupDelete = document.querySelector(".popup_type_delete");
  const buttonDelete = popupDelete.querySelector(".popup__button_type_delete");

  openModal(popupDelete);

  buttonDelete.onclick = () => {
    deleteCard(cardElement, cardId);
    closeModal(popupDelete);
  };
}

export function deleteCard(cardElement, cardId) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

export function likeCard(cardId, likeButton, likeCountElement) {
  likeCardFromAPI(cardId, likeButton, likeCountElement);
}


