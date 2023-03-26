import "../index.css";

import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch, Redirect } from "react-router-dom";

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
import ProtectedRoute from "./protected_route/ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";


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
  const [inited, setInited] = useState(false);

  tokenCheck();

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

          // compare myDB table with yandexDB table
          function compare(yandexDB, cardsMy) { /////Передаём 2 массива
            let cardsMyIds = {};
            cardsMy.forEach(card => {
              cardsMyIds[card.movieId] = card;
            });
            return yandexDB.map((obj) => {
              const matched = Object.keys(cardsMyIds).includes(String(obj.id));
              const card = matched ? cardsMyIds[obj.id] : obj;
              return {
                  nameRU: card.nameRU,
                  nameEN: card.nameEN,
                  description: card.description,
                  director: card.director,
                  country: card.country,
                  duration: card.duration,
                  year: card.year,
                  image: {
                    url:  matched ? card.image : card.image.url
                  },
                  thumbnail: card.image,
                  trailerLink: card.trailerLink,
                  movieId: matched ? card.movieId : card.id,
                  id: matched ? card.movieId : card.id,
                  like: matched
              };
          });
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

    // -------------- My Server ------------------
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

          if (newCardLike.like === true) {
            cardsMy.push(newCard)
            setCardsMy(cardsMy);
          } else {
            let filteredCardsMy = cardsMy.filter(e => e.id !== newCardLike.movieId)
            setCardsMy(filteredCardsMy);
          }

          localStorage.setItem("cards", JSON.stringify(newCards));

          getCardsFromMyServer(e)

      })
      .catch((err) => {
        console.log(err);;
      });
    
    e.stopPropagation();
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setLoggedIn(true);
            setInited(true);
          }
        })
        .catch((err) => {
          console.log(err);
          if (!inited) {
            setInited(true);
          }
        //  window.alert(`${alertMessage} ${err}`);
        });
    } else {
      if (!inited) {
        setInited(true);
      }
    }
  }

  function handleUpdateUser(info) {
    console.log('handleUpdateUser info= ', info.name , info.email)
    apiMy
      .setUserInfo(info.name, info.email)
      .then((data) => {
        setCurrentUser(data);
        
        // history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
        // window.alert(`${alertMessage} ${err}`);
      });
  }

  // console.log('App.js currentUser = ', currentUser)

  return (
    inited ? <div className="App">
      <div className="root">
         <CurrentUserContext.Provider value={currentUser}>
            <CardContext.Provider value={cards}>

                <Header
                  loggedIn={loggedIn}
                />

                <Switch>
                  <Route exact path="/" component={Landing}
                  />

                <ProtectedRoute
                    exact path="/movies"
                    loggedIn={loggedIn}
                    component={Movies}
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

                  <ProtectedRoute
                    exact path="/saved-movies"
                    loggedIn={loggedIn}
                    component={SavedMovies}
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

                  <ProtectedRoute
                    exact path="/profile"
                    loggedIn={loggedIn}
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    setLoggedIn={setLoggedIn}
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

            </CardContext.Provider>
          </CurrentUserContext.Provider>
      </div>
    </div> : <div/>
  );
}

export default App;
