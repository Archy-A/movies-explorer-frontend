export const BASE_URL = "https://api.testdeploy.nomoredomainsclub.ru";

export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (email, password) => {
  return fetch(`https://api.testdeploy.nomoredomainsclub.ru/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const sigin = (email, password) => {
  console.log(' --------------------------------- ')
  console.log(' email = ', email)
  console.log(' password = ', password)
  console.log(' --------------------------------- ')
  return fetch(`http://localhost:3000/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const getContent = (token) => {
  return fetch(`https://api.testdeploy.nomoredomainsclub.ru/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => getResponseData(res))
    .then((data) => data);
};
