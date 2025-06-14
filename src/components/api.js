const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-40",
  headers: {
    authorization: "d330959b-0b17-4b8d-a6f7-68ca223bd9fd",
    "Content-Type": "application/json",
  },
};

const handleResponseError = async (response) => {
  if (!response.ok) {
    const err = await response.json();
    throw new Error(`Ошибка: ${response.status}, сообщение: ${err.message}`);
  }
  return await response.json();
};

export const getUserInfo = async () => {
  const response = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  return handleResponseError(response);
};

export const getCards = async () => {
  const response = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return handleResponseError(response);
};

export const updateUserInfo = async (name, about) => {
  const response = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  });
  return handleResponseError(response);
};

export const addNewCard = async (name, link) => {
  const response = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  });
  return handleResponseError(response);
};

export const deleteCardFromServer = async (cardId) => {
  const response = await fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return handleResponseError(response);
};

export const likeCardFromAPI = async (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";

  const response = await fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method,
    headers: config.headers,
  });

  return await handleResponseError(response);
};

export const updateAvatar = async (avatarUrl) => {
  const response = await fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  });
  return handleResponseError(response);
};
