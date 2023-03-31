// export const BASE_URL = "https://api.dipp.nomoredomains.work";
export const BASE_URL = "http://localhost:3000";

export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (name, email, password) => {
  // return fetch(`https://api.dipp.nomoredomains.work/signup`, {
  return fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponseData(res));
};

export const sigin = (email, password) => {
  // return fetch(`https://api.dipp.nomoredomains.work/signin`, {
    return fetch(`http://localhost:3000/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const getContent = (token) => {
    // console.log('getContent token = ', token)
  // return fetch(`https://api.dipp.nomoredomains.work/users/me`, {
    return fetch(`http://localhost:3000/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => getResponseData(res))
    .then((data) => data);
};
