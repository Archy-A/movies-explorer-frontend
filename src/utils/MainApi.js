const BASE_URL = "https://api.dipp.nomoredomains.work";
// const BASE_URL = "http://localhost:3000";

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

  getInitialCardsMy() {
      return fetch(`${BASE_URL}/${this.endPoint[0]}`, {
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

  setUserInfo(name, email, next) {
      return fetch(`${BASE_URL}/${this.endPoint[1]}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .then((res) => {
        return res;
      })
  }
}

// Api instance creation
const apiMy = new Api({
  baseUrl: ["movies", "users/me"],
  token: `Bearer ${localStorage.getItem('token')}`,
});

export default apiMy;
