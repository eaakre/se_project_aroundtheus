export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._authorization = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: "a93ebd2f-fd06-499f-b2f9-74e2f8519709",
      },
    }).then(this._checkResponse);
    // .catch((err) => {
    //   console.log(err);
    // });
  }

  // other methods for working with the API
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  updateProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  addCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link,
      }),
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  removeLikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
    }).then(this._checkResponse);
  }

  updateProfilePicture(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
    // .then((res) => {
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   return Promise.reject(`Error: ${res.status}`);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
}

("https://www.thefamouspeople.com/profiles/images/jacques-cousteau-3.jpg");

("https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/common/avatar.jpg");
