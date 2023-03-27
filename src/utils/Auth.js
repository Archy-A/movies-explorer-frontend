export const BASE_URL = "http://localhost:3000";

export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const register = (name, email, password) => {
  console.log(' --------------------------------- ')
  console.log(' name = ', name)
  console.log(' email = ', email)
  console.log(' password = ', password)
  console.log(' --------------------------------- ')
  return fetch(`http://localhost:3000/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((res) => getResponseData(res));
};

export const sigin = (email, password) => {
  return fetch(`http://localhost:3000/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => getResponseData(res));
};

export const getContent = (token) => {
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
