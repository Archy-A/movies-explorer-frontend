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
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('token')}`,
      // },
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
  }

  getUserInfo() {
    return fetch(`http://localhost:3000/${this.endPoint[1]}`, {
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
    return fetch(`http://localhost:3000/${this.endPoint[1]}`, {
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

  // setCard(link, name) {
  //     return fetch(`http://localhost:3000/movies`, {
  //     method: "POST",
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: name,
  //       link: link,
  //     }),
  //   })
  //     .then((res) => {
  //       return this._checkResponse(res);
  //     })
  //     .then((res) => {
  //       return res;
  //     });
  // }

  deleteCard(id) {
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

  likeCard(cardNew, likeStateToBeSet) {
    // likeStateToBeSet - is a new state to be set on server
    let method = "";
    if (likeStateToBeSet) {
      method = "POST";
      return fetch(`http://localhost:3000/movies/`, {
        method: method,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardNew),
      })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      });
    } else {

      method = "DELETE";
      return fetch(`http://localhost:3000/movies/${cardNew.movieId}`, {
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


//   likeCard(cardNew, likeStateToBeSet) {
//     // likeStateToBeSet - is a new state to be set on server
//     let method = "";
//     console.log(' likeStateToBeSet = ', likeStateToBeSet)
//     if (likeStateToBeSet) {
//       method = "POST";
//     } else {
//       method = "DELETE";
//     }
//       return fetch(`http://localhost:3000/movies/`, {
//       method: method,
//       headers: {
//         authorization: `Bearer ${localStorage.getItem('token')}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cardNew),
//     }
//     )
//       .then((res) => {
//         return this._checkResponse(res);
//       })
//       .then((res) => {
//         return res;
//       });
//   }
// }

// Api instance creation
const api = new Api({
  baseUrl: ["cards", "users/me"],
  token: `Bearer ${localStorage.getItem('token')}`,
});

export default api;
