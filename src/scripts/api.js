class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _handleServerResponse(res) {
  return res.ok
    ? res.json()
    : Promise.reject(`Error: ${res.status}`);
}
getCardList() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: this._headers,
  }).then(this._handleServerResponse);
}
getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: this._headers,
  }).then(this._handleServerResponse);
}
setUserInfo({ name, about }) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(this._handleServerResponse);
}
addCard({ name, link }) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(this._handleServerResponse);
}
removeCard(cardID) {
  return fetch(`${this._baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: this._headers,
  }).then(this._handleServerResponse);
}
setUserAvatar({ avatar }) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(this._handleServerResponse);
}
}
const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'f50e0620-c232-40a3-88cb-5c484b0b47b1',
    'Content-Type': 'application/json',
  },
});

export default api;