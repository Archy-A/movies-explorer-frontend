// const BASE_URL = "https://api.dipp.nomoredomains.work";
const BASE_URL = "http://localhost:3000";

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
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  getUserInfo() {
    return fetch(`${BASE_URL}/${this.endPoint[1]}`, {
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

  likeCard(card, likeStateToBeSet) {
    // likeStateToBeSet - is a new state to be set on server
    let method = "";
    if (likeStateToBeSet) {
      const newCard = {
        ...card,
        like: likeStateToBeSet
      };
      method = "POST";
      return fetch(`${BASE_URL}/movies/`, {
        method: method,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });


    } else {
      method = "DELETE";
      return fetch(`${BASE_URL}/movies/${card._id}`, {
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
    }
  }

const api = new Api({
  baseUrl: ["cards", "users/me"],
  token: `Bearer ${localStorage.getItem('token')}`,
});

export default api;