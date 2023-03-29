import "../index.css";

import React, { useEffect, useState } from "react";
import { useHistory, Route, Switch } from "react-router-dom";

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


function App(props) {

  let history = useHistory();
  const emailLogin = "emailLogin";
  const passwordLogin = "passwordLogin";
  const emailAndPassSetterLogin = useForm({
    emailLogin: "",
    passwordLogin: "",
  },fieldsUpdatedLoginCallback);

  function fieldsUpdatedLoginCallback() {
    handleSetCheckEmailLogin();
    handleSetCheckPassLogin();
  }

  function fieldsUpdatedCallback() {
    handleSetCheckEmail();
    handleSetCheckPass();
    handleSetCheckName();
  }
  
  const emailReg = "emailReg";
  const passwordReg = "passwordReg";
  const nameReg = "nameReg";
  const emailAndPassSetterReg = useForm({ 
    nameReg: "", 
    emailReg: "", 
    passwordReg: ""
  }, fieldsUpdatedCallback);
  const BACKERROR = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";

  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards")) || {'allCards':[], 'myCards':[]});
  const [preloaderState, setPreloaderState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [inited, setInited] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [editProfileMessage, setEditProfileMessage] = useState("");
  const [messageReg, setMessageReg] = useState("");

  tokenCheck();

  useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);

  function createCardFromExternal(externalCard) {
    return {
      nameRU: externalCard.nameRU,
      nameEN: externalCard.nameEN,
      description: externalCard.description,
      director: externalCard.director,
      country: externalCard.country,
      duration: externalCard.duration,
      year: externalCard.year,
      image: externalCard.image.url,
      thumbnail: externalCard.image.url,
      trailerLink: externalCard.trailerLink,
      externalId: externalCard.id,
      like: false,
    };
  }

  function createCardFromDB(dbCard, liked) {
    let newCard = {
      nameRU: dbCard.nameRU,
      nameEN: dbCard.nameEN,
      description: dbCard.description,
      director: dbCard.director,
      country: dbCard.country,
      duration: dbCard.duration,
      year: dbCard.year,
      image: dbCard.image,
      thumbnail: dbCard.image,
      trailerLink: dbCard.trailerLink,
      externalId: dbCard.externalId,
      like: liked
    };
    if (liked) {
      newCard['_id'] = dbCard._id;
    }
    return newCard;
  }

  async function loadInitialCards() {
    try {
      const arrayFilms = await api.getInitialCards();
      const externalDB = arrayFilms.map((card) => createCardFromExternal(card));
      return externalDB;
    } 
    catch(err) {
      console.log(err);
    };
  }

  async function loadMyCards() {
    try {
      let myCards = await apiMy.getInitialCardsMy();
      myCards = myCards.map(c => createCardFromDB(c, true));
      setBackendError("")
      return myCards;
    }
    catch(err) {
      console.log(err);
      setBackendError(BACKERROR);
    };
  }

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
          history.push("/movies");
          setLoginError(false);
          localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setLoginError(true);

        if (err === 'Ошибка: 400') {
          setLoginError(`Введены некорреткные данные в поля E-mail/Пароль`)
        } else if (err === 'Ошибка: 401') {        
          setLoginError(`Неверные E-mail/Пароль, попробуйте исправить`)
        } else {        
          setLoginError(`Извините, случилась проблема при входе, попробуйте чуть позже...`)
        }

        history.push("/signin");
      });
  }
  
  // ------------------------------------------------------------------


  //----------------- REGISTER ---------------------------------------
  function handleRegister(e) {
    e.preventDefault();
    auth
      .register(
        emailAndPassSetterReg.values[nameReg],
        emailAndPassSetterReg.values[emailReg],
        emailAndPassSetterReg.values[passwordReg]
      )
      .then((res) => {
        if (res) {
          setLoggedIn(false);
         // localStorage.removeItem("token");
          setRegisterError(false);
          setRegisterError("")
          setCheckPass(false);
          setCheckName(false);
          setCheckEmail(false);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setRegisterError(true);
        setEmail(emailAndPassSetterReg.values[emailReg]);
        if (err === 'Ошибка: 400') {
          setRegisterError(`Введены некорреткные данные в поля Имя/E-mail/Пароль`)
        } else if (err === 'Ошибка: 409') {        
          setRegisterError(`Такой пользователь уже существует!`)
        } else {        
          setRegisterError(`Извините, случилась проблема при регистрации: ${err}`)
        }
      });
  }
  //------------------------------------------------------------------

  // >>>>>>>>>>>>>> CHECK REGISTER <<<<<<<<<<<<<<<<<<<
  const [checkPass, setCheckPass] = useState(false);
  function handleSetCheckPass(inPass) {
    let checker = false;
    emailAndPassSetterReg.values.passwordReg.toString().length < 2 ? checker = false : checker = true;
    setCheckPass(checker);
  }

  const [checkName, setCheckName] = useState(false);
  function handleSetCheckName(inPass) {
    let checker = false;
    emailAndPassSetterReg.values.nameReg.toString().length < 2 ? checker = false : checker = true;
    setCheckName(checker);
  }

  const [checkEmail, setCheckEmail] = useState(false);
  function handleSetCheckEmail(inPass) {
    let checker = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = emailAndPassSetterReg.values.emailReg.toString();
        if(email.match(mailformat))
          {
            checker = true 
            setCheckEmail(checker);
          }
          else
          {
            checker = false 
            setCheckEmail(checker);
          }
  }

  //>>>>>>>>>>>> CHECK SIGNIN <<<<<<<<<<<<<<<<
  const [checkPassLog, setCheckPassLog] = useState(false);
  function handleSetCheckPassLogin(inPass) {
    let checker1 = false;
    emailAndPassSetterLogin.values.passwordLogin.toString().length < 2 ? checker1 = false : checker1 = true;

    setCheckPassLog(checker1);
  }

  const [checkEmailLog, setCheckEmailLog] = useState(false);
  function handleSetCheckEmailLogin(inPass) {
    let checker2 = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = emailAndPassSetterLogin.values.emailLogin.toString();
        if(email.match(mailformat))
          {
            checker2 = true 
            setCheckEmailLog(checker2);
          }
          else
          {
            checker2 = false 
            setCheckEmailLog(checker2);
          }
  }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


  function handleRegOnChange(e) {
    emailAndPassSetterReg.handleChange(e);
    }
  //--------------------------------------------------------------
  
  function handleLoginOnChange(e) {
    emailAndPassSetterLogin.handleChange(e);
  }


  //////////////////////-------------------------------////////////////////////////
  //////////////////////<<<  S E A R C H   M A I N  >>>////////////////////////////
  //////////////////////-------------------------------////////////////////////////
  async function findCardInMain() {

    setPreloaderState(true)
    setCards({'allCards':[], 'myCards':[]})
    const initialCards = await loadInitialCards();
    const myCards = await loadMyCards();
    setPreloaderState(false);

    const updatedCards = {'allCards': initialCards, 'myCards': myCards};
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  }

  ////////////////////////////-------------------------------///////////////////////////////////
  ////////////////////////////   L I K E   / D I S L I K E   ///////////////////////////////////
  ////////////////////////////-------------------------------///////////////////////////////////
  function handleCardLike(card, e) {
    const newLike = !card.like;
    api
      .likeCard(card, newLike)
      .then((newCard) => {
        const oldId = newCard._id;
        newCard = createCardFromDB(newCard, newLike);
        const newCards = cards['allCards'].map((c) => (c.externalId === card.externalId ? newCard : c));
        const myCards = newLike 
          ? [...cards['myCards'],  newCard]
          : cards['myCards'].filter(card => card._id !== oldId);
        
        const updatedCards = {'allCards': newCards, 'myCards': myCards};
        setCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
      })
      .catch((err) => {
        console.log(err);
      });    
    e.stopPropagation();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////



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
        });
    } else {
      if (!inited) {
        setInited(true);
      }
    }
  }

  function handleUpdateUser(info) {
    setEditProfileMessage("")
    apiMy
      .setUserInfo(info.name, info.email)
      .then((data) => {
        setCurrentUser(data);
        setProfileError("")
        setEditProfileMessage("Редактирование профиля выполнено успешно!")
      })
      .catch((err) => {
        console.log(err);
          if (err === 'Ошибка: 400') {
            setProfileError(`Введены некорреткные данные в поля Имя/E-mail`)
          } else {        
            setProfileError(`Извините, случилась проблема обновления профиля: ${err}`)
          }
      });
  }

  return (
    inited ? <div className="App">
      <div className="root">
         <CurrentUserContext.Provider value={currentUser}>

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
                    onSearchMovieClicked={findCardInMain}
                    onCardLike={handleCardLike}
                    preloaderState={preloaderState}
                    backendError={backendError}
                  />

                  <ProtectedRoute
                    exact path="/saved-movies"
                    loggedIn={loggedIn}
                    component={SavedMovies}
                    cards={cards['myCards']}
                    onCardLike={handleCardLike}
                  />

                  <ProtectedRoute
                    exact path="/profile"
                    loggedIn={loggedIn}
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    setLoggedIn={setLoggedIn}
                    profileError={profileError}
                    editProfileMessage={editProfileMessage}
                    messageReg={messageReg}
                    setMessageReg={setMessageReg}
                  />

                  <Route exact path="/signup">
                    <Register
                      handleRegOnChange={handleRegOnChange}
                      onRegister={handleRegister}
                      setEmail={setEmail}
                      setLoggedIn={setLoggedIn}
                      emailAndPassSetterRegValues={emailAndPassSetterReg.values}
                      registerError={registerError}
                      checkPass={checkPass}
                      checkName={checkName}
                      checkEmail={checkEmail}
                    />
                    </Route> 

                  <Route exact path="/signin">
                    <Login 
                      handleLogin={handleLogin}
                      handleOnChange={handleLoginOnChange}
                      emailAndPassSetterLoginValues={emailAndPassSetterLogin.values}
                      loginError={loginError}
                      checkPassLog={checkPassLog}
                      checkEmailLog={checkEmailLog}
                      setRegisterError={setRegisterError}
                    />
                  </Route>

                  <Route path='*' component={NotFound}/>

                </Switch>

                <Footer 
                />

            
          </CurrentUserContext.Provider>
      </div>
    </div> : <div/>
  );
}

export default App;
