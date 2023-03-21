const link = "https://api.nomoreparties.co/beatfilm-movies";

class Api {
  constructor(options) {
    this.endPoint = options.baseUrl;
    this.auth = options.headers;
    this.body = options.body;
    this.token = `Bearer ${localStorage.getItem('token')}`
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies/`, {
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('token')}`,
      // },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        // console.log('>>>>>>>>>>>>>>>> F I L M S :', res)
        return res;
      });
  }

  getUserInfo() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies/${this.endPoint[1]}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setUserInfo(name, about) {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies/${this.endPoint[1]}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setAva(avatar) {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  setCard(link, name) {
      return fetch(`https://api.nomoreparties.co/beatfilm-movies/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  deleteCard(id) {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  likeCard(cardId, likeStateToBeSet) {
    // likeStateToBeSet - is a new state to be set on server
    let method = "";
    if (likeStateToBeSet) {
      method = "PUT";
    } else {
      method = "DELETE";
    }
      return fetch(`https://api.nomoreparties.co/beatfilm-movies/cards/${cardId}/likes`, {
      method: method,
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }
}

// Api instance creation
const api = new Api({
  baseUrl: ["cards", "users/me"],
  token: `Bearer ${localStorage.getItem('token')}`,
});

export default api;
