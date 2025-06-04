const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
function createCard(card, cardLike, cardDel, openCardPopup) {
    // if (!card) return;    
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const imgCard = cardElement.querySelector('.card__image');
    const likeCard = cardElement.querySelector('.card__like-button');
    imgCard.src = card.link;
    imgCard.alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => { cardDel(cardElement); });
    likeCard.addEventListener('click', () => { cardLike(likeCard); })
    imgCard.addEventListener('click', () => { openCardPopup(card); })
    return cardElement;
}

// Удаление карточки
function deleteCard(evt) {
    evt.remove();
}

// Лайк
function handleLikeButton  (evt) {
    evt.classList.toggle('card__like-button_is-active');
}

export { createCard, handleLikeButton , deleteCard };