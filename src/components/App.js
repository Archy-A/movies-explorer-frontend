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
  const INCORRECT_DATA_EMAIL_PASSWORD = "Введены некорреткные данные в поля E-mail/Пароль";
  const WRONG_DATA_EMAIL_PASSWORD = "Неверные E-mail/Пароль, попробуйте исправить";
  const LOGIN_PROBLEM_BY_SERVER = "Извините, случилась проблема при входе, попробуйте чуть позже...";
  const PROFILE_EDIT_PROBLEM_BY_SERVER = "Извините, случилась проблема обновления профиля";
  const WRONG_DATA_NAME_EMAIL_PASSWORD = "Введены некорреткные данные в поля Имя/E-mail/Пароль";
  const USER_EXIST = "Такой пользователь уже существует!";
  const REGISTRATION_PROBLEM = "Извините, случилась проблема при регистрации";
  const PROFILE_EDITED_CORRECTLY = "Редактирование профиля выполнено успешно!";
  const ERROR_400 = "Ошибка: 400";
  const ERROR_401 = "Ошибка: 401";
  const ERROR_409 = "Ошибка: 409";

  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards") || JSON.stringify({'allCards':[], 'myCard':[]})));
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
      let myDBCards = await apiMy.getInitialCardsMy();
      myDBCards = myDBCards.map(c => createCardFromDB(c, true));
      setBackendError("")
      return myDBCards;
    }
    catch(err) {
      console.log(err);
      setBackendError(BACKERROR);
    };
  }

  // -------------------- LOGIN --------------------------------------
  function loginAction(email, pass) {
    auth
      .sigin(
        email,
        pass
      )
      .then(async (res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          history.push("/movies");
          setLoginError(false);
          localStorage.setItem("token", res.token);

          const myDBCards = await loadMyCards();
          const updatedCards = {'allCards': [], 'myCards': myDBCards};
          setCards(updatedCards);
          localStorage.setItem("cards", JSON.stringify(updatedCards));
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setLoginError(true);

        if (err === ERROR_400) {
          setLoginError(INCORRECT_DATA_EMAIL_PASSWORD);
        } else if (err === ERROR_401) {        
          setLoginError(WRONG_DATA_EMAIL_PASSWORD);
        } else {        
          setLoginError(LOGIN_PROBLEM_BY_SERVER);
        }

        history.push("/signin");
      });
  }

  function handleLogin(e) {
    e.preventDefault();    
    loginAction(emailAndPassSetterLogin.values[emailLogin], emailAndPassSetterLogin.values[passwordLogin]);
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
          setRegisterError(false);
          setRegisterError("")
          setCheckPass(false);
          setCheckName(false);
          setCheckEmail(false);
          loginAction(emailAndPassSetterReg.values[emailReg], emailAndPassSetterReg.values[passwordReg]);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setRegisterError(true);
        setEmail(emailAndPassSetterReg.values[emailReg]);
        if (err === ERROR_400) {
          setRegisterError(WRONG_DATA_NAME_EMAIL_PASSWORD);
        } else if (err === ERROR_409) {        
          setRegisterError(USER_EXIST);
        } else {        
          setRegisterError(`${REGISTRATION_PROBLEM}: ${err}`);
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
  async function firstSearchCardInMain() {

    setPreloaderState(true)
    let initialCards = await loadInitialCards();
    setPreloaderState(false);

    const updatedCards = {'allCards': initialCards, 'myCards': cards['myCards']};
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  }

  ////////////////////////////------------------------------------///////////////////////////////////
  //////////////////////////// <3  L I K E   / D I S L I K E </3  ///////////////////////////////////
  ////////////////////////////------------------------------------///////////////////////////////////
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
        setEditProfileMessage(PROFILE_EDITED_CORRECTLY)
      })
      .catch((err) => {
        console.log(err);
          if (err === ERROR_400) {
            setProfileError(WRONG_DATA_NAME_EMAIL_PASSWORD)
          } else {        
            setProfileError(`${PROFILE_EDIT_PROBLEM_BY_SERVER}: ${err}`)
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
                    onFirstSearchMovie={firstSearchCardInMain}
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

                  <ProtectedRoute
                    exact path="/signup"
                    component={Register}
                    handleRegOnChange={handleRegOnChange}
                    onRegister={handleRegister}
                    setEmail={setEmail}
                    setLoggedIn={setLoggedIn}
                    emailAndPassSetterRegValues={emailAndPassSetterReg.values}
                    registerError={registerError}
                    checkPass={checkPass}
                    checkName={checkName}
                    checkEmail={checkEmail}
                    loggedIn={loggedIn}
                  />

                  <ProtectedRoute
                    exact path="/signin"
                    component={Login}
                    handleLogin={handleLogin}
                    handleOnChange={handleLoginOnChange}
                    emailAndPassSetterLoginValues={emailAndPassSetterLogin.values}
                    loginError={loginError}
                    checkPassLog={checkPassLog}
                    checkEmailLog={checkEmailLog}
                    loggedIn={loggedIn}
                    setRegisterError={setRegisterError}
                  />

                  {/* <Route exact path="/signup">
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
                  </Route> */}

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
