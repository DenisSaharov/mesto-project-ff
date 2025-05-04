const cardTemplate = document.querySelector('#card-template').content;

  function newCard(card, cardDel) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__delete-button").addEventListener("click", cardDel);
    return cardElement;
  }

  const list = document.querySelector(".places__list");

  function deleteCard(evt) {
    evt.target.closest(".card").remove();
  }

  initialCards.forEach((element) => {
    list.append(newCard(element, deleteCard));
  });

  // Спасибо за проверку