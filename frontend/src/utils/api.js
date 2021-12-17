class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
  //request user info from the server
  getUsersInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  //get user info and cards from the server
  getAppInfo() {
    return Promise.all([this.getUsersInfo(), this.getInitialCards()])
  }

  addCard({ name, link }, token) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  editProfile({ name, about }, token) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  removeCard(cardId, token) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  //add and remove likes
  changeLikeCardStatus(cardId, like, token) {
    if (like) {
      return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          like
        })
      })
        .then(this._checkResponse)
    } else {
      return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      })
        .then(this._checkResponse)
    }
  }

  updateAvatar(avatar, token) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._checkResponse)
  }
}

// const api = new Api({
//   baseUrl: "https://around.nomoreparties.co/v1/group-7",
//   headers: {
//     authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
//     "Content-Type": "application/json"
//   }
// });

const api = new Api({
  baseUrl: "https://api.aroundtheglobe.students.nomoreparties.site",
  // headers: {
  //   authorization: "0c109f26-b662-41c6-bcff-35a6cf5888c5",
  //   "Content-Type": "application/json"
  // }
});


export default api;