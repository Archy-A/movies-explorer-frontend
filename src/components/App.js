import "../index.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import Header from "./header/Header";
import Landing from "./landing/Landing";
import Movies from "./movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Footer from "./footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import * as auth from "../utils/Auth";
import useForm from "../hooks/useForm";
import api from "../utils/MoviesApi";
import apiMy from "../utils/MainApi";


function App(props) {

  let history = useHistory();
  const emailLogin = "emailLogin";
  const passwordLogin = "passwordLogin";
  const emailAndPassSetterLogin = useForm({
    emailLogin: "",
    passwordLogin: "",
  });
  
  const emailReg = "emailReg";
  const passwordReg = "passwordReg";
  const emailAndPassSetterReg = useForm({ emailReg: "", passwordReg: "" });

  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  const [find, setFind] = useState([]);
  const [cardsMy, setCardsMy] = useState(JSON.parse(localStorage.getItem("cardsMy") || "[]"));
  const [findMy, setFindMy] = useState([]);

  const [like, setLike] = useState([]);
  const [seachResult, setSeachResult] = useState(''); 
  const [onShortFilms, setOnShortFilms] = useState(localStorage.getItem("onShortFilms") || "1");
  const [checked, setChecked] = useState(localStorage.getItem("checked") || "");
  const [searchResultFromLocalStorage, setSearchResultFromLocalStorage] = useState(localStorage.getItem("seachResult"));

  const [seachResultMy, setSeachResultMy] = useState(''); 
  const [onShortFilmsMy, setOnShortFilmsMy] = useState(localStorage.getItem("onShortFilms") || "1");
  const [checkedMy, setCheckedMy] = useState(localStorage.getItem("checked") || "");
  const [searchResultFromLocalStorageMy, setSearchResultFromLocalStorageMy] = useState(localStorage.getItem("seachResult"));

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState([]);
//console.log("================ init cards: \n", cards)
  useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((data) => {
          console.log('user data = ', data)
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
          // window.alert(`${alertMessage} ${err}`);
        });
  }, [loggedIn]);

  let isChecked = false;
  let isCheckedMy = false;

    // -------------------- LOGIN --------------------------------------
    function handleLogin(e) {
      e.preventDefault();
      auth
        .sigin(
          emailAndPassSetterLogin.values[emailLogin],
          emailAndPassSetterLogin.values[passwordLogin]
        )
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(emailAndPassSetterLogin.values[emailLogin]);
            history.push("/saved-movies");
            setLoginError(false);
            localStorage.setItem("token", res.token);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          setLoginError(true);
          setIsInfoTooltipOpen(true);
          history.push("/signin");
        });
    }
    // ------------------------------------------------------------------
  
    function handleLoginOnChange(e) {
      emailAndPassSetterLogin.handleChange(e);
    }

  // -------------- Yandex Server ----------------------
  function getCardsFromServer(e) {
    e.preventDefault();
    return api
      .getInitialCards()
      .then((arrayFilms) => {
          let findInput = find.toLowerCase()
          let result = arrayFilms.filter(film => film.nameRU.toLowerCase().includes(findInput));
          if (onShortFilms === "2") {
            result = result.filter(film => film.duration < 41);
          }
          // ---------- Likes -----------------------------------
          // add a new filed to yandexDB table: like
          const yandexDB = result.map(
            element => {
              element.like = false;
              return element;
            })
          console.log(' yandexDB = ', yandexDB)
          console.log(' -----------------------------------')
          console.log(' cardsMy = ', cardsMy)

          // compare myDB table with yandexDB table
          function compare(yandexDB, cardsMy) { /////Передаём 2 массива
            let resArr = []; //// создаём массив который в будущем выведем
            yandexDB.forEach((obj1)=>{ /// перебираем первый массив 
              cardsMy.forEach((obj2)=>{ ///перебираем второй массив
                    if (obj1.id == obj2.movieId) { /// сравниваем "ключи" из объектов
                        resArr.push({
                          nameRU: obj2.nameRU,
                          nameEN: obj2.nameEN,
                          description: obj2.description,
                          director: obj2.director,
                          country: obj2.country,
                          duration: obj2.duration,
                          year: obj2.year,
                          image: {
                            url: obj2.image
                          },
                          thumbnail: obj2.image,
                          trailerLink: obj2.trailerLink,
                          movieId: obj2.movieId,
                          id: obj2.movieId,
                          like: !obj2.like
                    });
                    } else {
                      resArr.push(obj1)
                    }
                })
            })
            return resArr;
          }

          let yandexDBLikeUpdated = compare(yandexDB, cardsMy)

          console.log('yandexDBLikeUpdated = ', yandexDBLikeUpdated)
          if (yandexDBLikeUpdated.length !== 0) {
            // get likes from myDB table (put it to yandexDB)
            //-----------------------------------------------------
            setCards(yandexDBLikeUpdated);
            localStorage.removeItem("cards");
            localStorage.removeItem("seachResult");
            localStorage.removeItem("shortFilms");
            localStorage.setItem("cards", JSON.stringify(yandexDBLikeUpdated));
            localStorage.setItem("seachResult", seachResult);
            localStorage.setItem("onShortFilms", onShortFilms);
          } else {
            setCards(yandexDB);
            localStorage.removeItem("cards");
            localStorage.removeItem("seachResult");
            localStorage.removeItem("shortFilms");
            localStorage.setItem("cards", JSON.stringify(yandexDB));
            localStorage.setItem("seachResult", seachResult);
            localStorage.setItem("onShortFilms", onShortFilms);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }

    // -------------- My Server ----------------------
  function getCardsFromMyServer(e) {
    e.preventDefault();
    return apiMy
      .getInitialCardsMy()
      .then((arrayFilms) => {
          let findInput = findMy.toLowerCase()
          let result = arrayFilms.filter(film => film.nameRU.toLowerCase().includes(findInput));
          if (onShortFilms === "2") {
            result = result.filter(film => film.duration < 41);
          }
          setCardsMy(result);
          console.log('sssssssssssssssssssssssssssssssssssssssssssss')
          localStorage.removeItem("cardsMy");
          localStorage.removeItem("seachResultMy");
          localStorage.removeItem("shortFilmsMy");
          localStorage.setItem("cardsMy", JSON.stringify(result));
          localStorage.setItem("seachResultMy", seachResultMy);
          localStorage.setItem("onShortFilmsMy", onShortFilmsMy);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card, e) {
    const isLiked = card.like;
    const newCard = {
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        description: card.description,
        director: card.director,
        country: card.country,
        duration: card.duration,
        year: card.year,
        image: card.image.url,
        thumbnail: card.image.url,
        trailerLink: card.trailerLink,
        movieId: card.id
        };
    api
      .likeCard(newCard, !isLiked)
      .then((newCard) => {
        const newCardLike = {
          nameRU: newCard.nameRU,
          nameEN: newCard.nameEN,
          description: newCard.description,
          director: newCard.director,
          country: newCard.country,
          duration: newCard.duration,
          year: newCard.year,
          image: {
            url: newCard.image
          },
          thumbnail: newCard.image,
          trailerLink: newCard.trailerLink,
          movieId: newCard.movieId,
          id: newCard.movieId,
          like: !isLiked
          };

          let newCards = cards.map((c) => (c.id === card.id ? newCardLike : c));
          setCards(newCards);
          localStorage.setItem("cards", JSON.stringify(newCards));

          getCardsFromMyServer(e)

      })
      .catch((err) => {
        console.log(err);;
      });
    
    e.stopPropagation();
  }

  return (
    <div className="App">
      <div className="root">
        {/* <div className="wrapper"> */}

                <Header
                />

                <Switch>
                  <Route exact path="/" component={Landing}
                  />

                  <Route exact path="/movies">
                    <Movies 
                         cards={cards}
                         getCardsFromServer={getCardsFromServer}
                         setFind={setFind}
                         setOnShortFilms={setOnShortFilms}
                         onShortFilms={onShortFilms}
                         isChecked={isChecked}
                         setSeachResult={setSeachResult}
                         seachResult={seachResult}
                         searchResultFromLocalStorage={searchResultFromLocalStorage}
                         setSearchResultFromLocalStorage={setSearchResultFromLocalStorage}
                         checked={checked}
                         setChecked={setChecked}
                         onCardLike={handleCardLike}
                    />
                  </Route>

                  <Route exact path="/saved-movies">
                    <SavedMovies 
                         cards={cardsMy}
                         getCardsFromServer={getCardsFromMyServer}
                         setFind={setFindMy}
                         setOnShortFilms={setOnShortFilmsMy}
                         onShortFilms={onShortFilmsMy}
                         isChecked={isCheckedMy}
                         setSeachResult={setSeachResultMy}
                         seachResult={seachResultMy}
                         searchResultFromLocalStorage={searchResultFromLocalStorageMy}
                         setSearchResultFromLocalStorage={setSearchResultFromLocalStorageMy}
                         checked={checkedMy}
                         setChecked={setCheckedMy}
                    />
                  </Route>

                  <Route exact path="/profile" component={Profile}
                  />

                  <Route exact path="/signup" component={Register}
                  />

                  <Route exact path="/signin">
                    <Login 
                      handleLogin={handleLogin}
                      handleOnChange={handleLoginOnChange}
                      emailAndPassSetterLoginValues={
                        emailAndPassSetterLogin.values
                      }
                    />
                  </Route>

                  <Route path='*' component={NotFound}/>

                </Switch>

                <Footer 
                />

        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
