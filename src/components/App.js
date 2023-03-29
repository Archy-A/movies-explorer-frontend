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

  // const [myDBfilms, setMyDBfilms] = useState([]);
  // const [externalDBfilms, setExternalDBfilms] = useState("[]");


  const [firstIter, setFirstIter] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(12);
  const [currentLimit, setCurrentLimit] = useState(15);

  const [cardsForShow, setCardsForShow] = useState([]);
  //const [externalDBfilms, setExternalDBfilms] = useState(JSON.parse(localStorage.getItem("externalDBfilms") || "[]"));
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  // const [cards, setCards] = useState([]);
  const [find, setFind] = useState(localStorage.getItem("find") || "");
  const [myCards, setMyCards] = useState(JSON.parse(localStorage.getItem("myCards") || "[]"));
  const [findMy, setFindMy] = useState([]);
  const [preloaderState, setPreloaderState] = useState(false);
// 
  // console.log('myCards from localStorage = ', myCards)

  const [like, setLike] = useState([]);
 // const [searchResult, setSeachResult] = useState(localStorage.getItem("searchResult") || "");
  const [onShortFilms, setOnShortFilms] = useState(localStorage.getItem("onShortFilms") || "1");
  //const [checked, setChecked] = useState(localStorage.getItem("checked") || "");
  //const [searchResultFromLocalStorage, setSearchResultFromLocalStorage] = useState(localStorage.getItem("searchResult"));

  const [seachResultMy, setSeachResultMy] = useState(''); 
  const [onShortFilmsMy, setOnShortFilmsMy] = useState(localStorage.getItem("onShortFilmsMy") || "1");
 // const [checkedMy, setCheckedMy] = useState(localStorage.getItem("checked") || "");
 // const [searchResultFromLocalStorageMy, setSearchResultFromLocalStorageMy] = useState(localStorage.getItem("searchResult"));

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [currentUser, setCurrentUser] = useState([]);
  const [inited, setInited] = useState(false);

  const [firstLoadMovies, setFirstLoadMovies] = useState(true);

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

    // loggedIn &&
    //     apiMy
    //         .getInitialCardsMy()
    //         .then((myCards) => {
    //           myCards = myCards.map(c => createCardFromDB(c, true));
    //           console.log('!!!!!!!!!!!!!!!!!!! ЭТО НУЖНО ИСПРАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!!! происходит загрузка карточек из моей базы каждый раз при обновлении страницы из-за useEffect[loggedIn] в App.js')
    //           localStorage.setItem("myCards", JSON.stringify(myCards));
    //           setMyCards(myCards);
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
  }, [loggedIn]);

  // let isChecked = false;
  // let isCheckedMy = false;

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
      // console.log('externalDB = ', externalDB) 
      //setExternalDBfilms(externalDB)

      //localStorage.setItem("externalDBfilms", JSON.stringify(externalDB));
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
      //localStorage.setItem("myCards", JSON.stringify(myCards));
      return myCards;
    }
    catch(err) {
      console.log(err);
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
          localStorage.removeItem("cards");
         // localStorage.removeItem("searchResult");
          localStorage.removeItem("shortFilms");

          setLoggedIn(true);
          setEmail(emailAndPassSetterLogin.values[emailLogin]);
          history.push("/movies");
          setLoginError(false);

          setSeachResultMy("")
          setOnShortFilms("1")
          setCards([]);
          setMyCards([]);
          // getCardsFromServer(e);

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
          setLoginError(`Извините, случилась проблема при входе: ${err}`)
        }

        setIsInfoTooltipOpen(true);
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
          localStorage.removeItem("token");
          setIsInfoTooltipOpen(true);
          setRegisterError(false);
          setRegisterError("")
          setSeachResultMy("")
          setOnShortFilms("1")
          setCards([]);
          setMyCards([]);
          setCheckPass(false);
          setCheckName(false);
          setCheckEmail(false);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setIsInfoTooltipOpen(true);
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
  async function findCardInMain(e) {

    setPreloaderState(true)
    setCards([])
    const initialCards = await loadInitialCards();
    const myCards = await loadMyCards();
    setPreloaderState(false);
    
    function compare(dbfilms, myCards) { /////Передаём 2 массива
        let cardsMyIds = {};
        myCards.forEach(cardMyselect => {
          cardsMyIds[cardMyselect.externalId] = cardMyselect;
        });
        return dbfilms.map((obj) => {
          const matched = Object.keys(cardsMyIds).includes(String(obj.externalId));
          return matched ? cardsMyIds[obj.externalId] : obj;
      });
    }

    let findInput = find.toLowerCase()
    let result = initialCards.filter(film => film.nameRU.toLowerCase().includes(findInput));
    if (onShortFilms === "2") {
        result = result.filter(film => film.duration < 41);
    }
    result = compare(result, myCards);
    setCards(result); 
    setMyCards(myCards);

    localStorage.setItem("find", find);
    localStorage.setItem("onShortFilms", onShortFilms);
    // my new changes:
    localStorage.setItem("cards", JSON.stringify(result));
    localStorage.setItem("myCards", JSON.stringify(myCards));
    //localStorage.setItem("searchResult", searchResult);
    //localStorage.setItem("searchResultFromLocalStorage", searchResultFromLocalStorage);   
  }

  
  //////////////////////-------------------------------------------////////////////////////////
  //////////////////////<<<  S E A R C H   F R O M   M Y   D B  >>>////////////////////////////
  //////////////////////-------------------------------------------////////////////////////////
//   function findCardInSaved(e) {
//     e.preventDefault();
//     let findInput = findMy.toLowerCase()
//     let result = myCards.filter(film => film.nameRU.toLowerCase().includes(findInput));
// ////////
//     console.log('SEARCH >> onShortFilmsMy = ', onShortFilmsMy)
// ////////
//     if (onShortFilmsMy === "2") {
//       result = result.filter(film => film.duration < 41);
//     }
//     //setMyCards(result);
//     //localStorage.setItem("myCards", JSON.stringify(result));
//     localStorage.setItem("seachResultMy", seachResultMy);
//     localStorage.setItem("onShortFilmsMy", onShortFilmsMy);
//   }



  ////////////////////////////-------------------------------///////////////////////////////////
  ////////////////////////////   L I K E   / D I S L I K E   ///////////////////////////////////
  ////////////////////////////-------------------------------///////////////////////////////////
  function handleCardLike(card, e) {
    const newLike = !card.like;
    if (!newLike && !card._id) {
      debugger;
    }
    api
      .likeCard(card, newLike)
      .then((newCard) => {
        let oldId = newCard._id;
        newCard = createCardFromDB(newCard, newLike);
        //cards.filter(card => card.externalId !== newCard.externalId);
        let newCards = cards.map((c) => (c.externalId === card.externalId ? newCard : c));
        setCards(newCards);
        if (newLike) {
          setMyCards((oldCards) => ([...oldCards, newCard]));
        } else {
          let filteredCardsMy = myCards.filter(card => card._id !== oldId)
          setMyCards(filteredCardsMy);
        }
        localStorage.setItem("cards", JSON.stringify(newCards));
      })
      .catch((err) => {
        console.log(err);;
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
    apiMy
      .setUserInfo(info.name, info.email)
      .then((data) => {
        setCurrentUser(data);
        setProfileError("")
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
                    onSearchMovieClicked={findCardInMain}
                    setFind={setFind}
                    setOnShortFilms={setOnShortFilms}
                    onShortFilms={onShortFilms}
                   // isChecked={isChecked}
                  //  setSeachResult={setSeachResult}
                   // searchResult={searchResult}
                   // searchResultFromLocalStorage={searchResultFromLocalStorage}
                   // setSearchResultFromLocalStorage={setSearchResultFromLocalStorage}
                    //checked={checked}
                   // setChecked={setChecked}
                    onCardLike={handleCardLike}
                    preloaderState={preloaderState}
                    firstIter={firstIter}
                    setFirstIter={setFirstIter}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    currentLimit={currentLimit}
                    setCurrentLimit={setCurrentLimit}
                    cardsForShow={cardsForShow}
                    setCardsForShow={setCardsForShow}
                    firstLoadMovies={firstLoadMovies}
                    setFirstLoadMovies={setFirstLoadMovies}
                  />

                  <ProtectedRoute
                    exact path="/saved-movies"
                    loggedIn={loggedIn}
                    component={SavedMovies}
                    cards={myCards}
                    //getCardsFromServer={findCardInSaved}
                    setFind={setFindMy}
                    setOnShortFilms={setOnShortFilmsMy}
                    onShortFilms={onShortFilmsMy}
                   // isChecked={isCheckedMy}
                  //  setSeachResult={setSeachResultMy}
                   // searchResult={seachResultMy}
                   // searchResultFromLocalStorage={searchResultFromLocalStorageMy}
                   // setSearchResultFromLocalStorage={setSearchResultFromLocalStorageMy}
                   // checked={checkedMy}
                   // setChecked={setCheckedMy}
                    onCardLike={handleCardLike}
                  />

                  <ProtectedRoute
                    exact path="/profile"
                    loggedIn={loggedIn}
                    component={Profile}
                    onUpdateUser={handleUpdateUser}
                    setLoggedIn={setLoggedIn}
                    profileError={profileError}
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

            </CardContext.Provider>
          </CurrentUserContext.Provider>
      </div>
    </div> : <div/>
  );
}

export default App;
