// const link = "https://api.dipp.nomoredomains.work/";
const link = "http://localhost:3000/";

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
    // return fetch(`https://api.dipp.nomoredomains.work/${this.endPoint[1]}`, {
      // return fetch(`http://localhost:3000/${this.endPoint[1]}`, {
        console.log('getUserInfo localStorage.getItem(token) = ', localStorage.getItem('token'))
      return fetch("http://localhost:3000/users/me", {
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


  deleteCard(id) {
    // return fetch(`https://api.dipp.nomoredomains.work/movies/${id}`, {
      return fetch(`http://localhost:3000/movies/${id}`, {
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

  likeCard(card, likeStateToBeSet) {
    // likeStateToBeSet - is a new state to be set on server
    let method = "";
    if (likeStateToBeSet) {
      const newCard = {
        ...card,
        like: likeStateToBeSet
      };
      //  console.log('cardNew = ', newCard)
      method = "POST";
      // return fetch(`https://api.dipp.nomoredomains.work/movies/`, {
   return fetch(`http://localhost:3000/movies/`, {
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
      // console.log('DELETE cardNew = ', card)
      method = "DELETE";
      // return fetch(`https://api.dipp.nomoredomains.work/movies/${card._id}`, {
   return fetch(`http://localhost:3000/movies/${card._id}`, {
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

// Api instance creation
const api = new Api({
  baseUrl: ["cards", "users/me"],
  token: `Bearer ${localStorage.getItem('token')}`,
});

export default api;
