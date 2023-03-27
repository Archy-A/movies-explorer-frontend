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

  const [externalDBfilms, setExternalDBfilms] = useState(JSON.parse(localStorage.getItem("externalDBfilms") || "[]"));
  // const [myDBfilms, setMyDBfilms] = useState(JSON.parse(localStorage.getItem("cardsMy") || "[]"));
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  const [find, setFind] = useState([]);
  const [cardsMy, setCardsMy] = useState(JSON.parse(localStorage.getItem("cardsMy") || "[]"));
  const [findMy, setFindMy] = useState([]);
// 
  // console.log('externalDBfilms = ', externalDBfilms)

  const [like, setLike] = useState([]);
  const [seachResult, setSeachResult] = useState(localStorage.getItem("seachResult") || "");
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
  const [profileError, setProfileError] = useState("");

  const [currentUser, setCurrentUser] = useState([]);
  const [inited, setInited] = useState(false);

  tokenCheck();

  // console.log('localStorage.getItem("token") = ',localStorage.getItem("token"))
  // console.log('currentUser = ', currentUser)

  useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((data) => {
          // console.log('user data = ', data)
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });

    loggedIn &&
        apiMy
            .getInitialCardsMy()
            .then((myCards) => {
              myCards = myCards.map(c => createCardFromDB(c, true));
              localStorage.setItem("cardsMy", JSON.stringify(myCards));
              setCardsMy(myCards);
            })
            .catch((err) => {
              // console.log('ERROR getInitialCardsMy = ',myDBfilms) 
              console.log(err);
            });
  }, [loggedIn]);

  let isChecked = false;
  let isCheckedMy = false;

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
          localStorage.removeItem("seachResult");
          localStorage.removeItem("shortFilms");

          ///////////  GET INITIAL CARDS ////////////
            api
            .getInitialCards()
            .then((arrayFilms) => {
              let externalDB = arrayFilms.map((card) => createCardFromExternal(card)
                
              //   return {
              //     nameRU: card.nameRU,
              //     nameEN: card.nameEN,
              //     description: card.description,
              //     director: card.director,
              //     country: card.country,
              //     duration: card.duration,
              //     year: card.year,
              //     image: {
              //       url: card.image.url
              //     },
              //     thumbnail: card.image.url,
              //     trailerLink: card.trailerLink,
              //     externalId: card.id,
              //     _id: "",
              //     like: false,
              //   };
            );
            console.log('externalDB = ',externalDB) 
            setExternalDBfilms(externalDB)

            localStorage.setItem("externalDBfilms", JSON.stringify(externalDB));
            // localStorage.setItem("cards", JSON.stringify(yandexDBLikeUpdated));
            })
            .catch((err) => {
              console.log(err);
            });

            setLoggedIn(true);
            setEmail(emailAndPassSetterLogin.values[emailLogin]);
            history.push("/movies");
            setLoginError(false);

            setSeachResultMy("")
            setOnShortFilms("1")
            setCards([]);
            setCardsMy([]);
            // getCardsFromServer(e);

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
          setCardsMy([]);
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
  function handleSetCheckPassLogin(inPass) {
    let checker = false;
    emailAndPassSetterLogin.values.passwordLogin.toString().length < 2 ? checker = false : checker = true;
    setCheckPass(checker);
  }

  function handleSetCheckEmailLogin(inPass) {
    let checker = false;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = emailAndPassSetterLogin.values.emailLogin.toString();
        if(email.match(mailformat))
          {
            // console.log('email.match(mailformat) = ', email.match(mailformat))
            checker = true 
            setCheckEmail(checker);
          }
          else
          {
            checker = false 
            setCheckEmail(checker);
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

  //////////////////////<<<  S E A R C H   M A I N  >>>////////////////////////////
  function findCardInMain(e) {
    e.preventDefault();
    if (!find) {return}
      // compare myDB table with yandexDB table
   
      // console.log('externalDBfilms search 3= ', externalDBfilms["1"])
      // console.log('cardsMy search = 3', cardsMy)
      // console.log('=======================++++++++++++++++++++++++++++++++++++++++++++++++++')

      function compare(dbfilms, cardsMy) { /////Передаём 2 массива
          let cardsMyIds = {};
          cardsMy.forEach(cardMyselect => {
            cardsMyIds[cardMyselect.externalId] = cardMyselect;
          });
          return dbfilms.map((obj) => {
            const matched = Object.keys(cardsMyIds).includes(String(obj.externalId));
            // obj.like = matched;
            // if (matched) {
            //   obj['_id'] = cardsMyIds[obj.externalId]._id;
            // }
            return matched ? cardsMyIds[obj.externalId] : obj;
        });
      }

      //console.log('FILMS after compare = ', compare(externalDBfilms, cardsMy))

      let findInput = find.toLowerCase()
      console.log("== externalDBfilms = ", externalDBfilms);
      let result = externalDBfilms.filter(film => film.nameRU.toLowerCase().includes(findInput));
      if (onShortFilms === "2") {
          result = result.filter(film => film.duration < 41);
      }
      console.log("== result before = ", result);
      console.log("== cardsMy = ", cardsMy);
      result = compare(result, cardsMy);
      console.log("== result = ", result);
      setCards(result);
      // localStorage.setItem("seachResult", seachResult);
      localStorage.setItem("onShortFilms", onShortFilms);
  }


  // -------------- Yandex Server ----------------------
  // function getCardsFromServer(e) {
  //   e.preventDefault();
  //   return api
  //     .getInitialCards()
  //     .then((arrayFilms) => {
  //       if (!find) {return}
  //         let findInput = find.toLowerCase()
  //         let result = arrayFilms.filter(film => film.nameRU.toLowerCase().includes(findInput));
  //         if (onShortFilms === "2") {
  //           result = result.filter(film => film.duration < 41);
  //         }
  //         // ---------- Likes -----------------------------------
  //         // add a new filed to yandexDB table: like
  //         const yandexDB = result.map(
  //           element => {
  //             element.like = false;
  //             return element;
  //           })

  //         // compare myDB table with yandexDB table
  //         function compare(yandexDB, cardsMy) { /////Передаём 2 массива
  //           let cardsMyIds = {};
  //           cardsMy.forEach(card => {
  //             cardsMyIds[card.movieId] = card;
  //           });
  //           return yandexDB.map((obj) => {
  //             const matched = Object.keys(cardsMyIds).includes(String(obj.id));
  //             const card = matched ? cardsMyIds[obj.id] : obj;
  //             console.log( ' matched ? = ', matched)
  //             console.log( ' card.myId = ', card.myId)
  //             return {
  //                 nameRU: card.nameRU,
  //                 nameEN: card.nameEN,
  //                 description: card.description,
  //                 director: card.director,
  //                 country: card.country,
  //                 duration: card.duration,
  //                 year: card.year,
  //                 image: {
  //                   url:  matched ? card.image : card.image.url
  //                 },
  //                 thumbnail: card.image,
  //                 trailerLink: card.trailerLink,
  //                 movieId: matched ? card.movieId : card.id,
  //                 id: matched ? card.movieId : card.id,
  //                 like: matched,
  //                 myId: matched ? card.myId : ""
  //             };
  //         });
  //         }

  //         let yandexDBLikeUpdated = compare(yandexDB, cardsMy)

  //         console.log('yandexDBLikeUpdated = ', yandexDBLikeUpdated)
  //         if (yandexDBLikeUpdated.length !== 0) {
  //           // get likes from myDB table (put it to yandexDB)
  //           //-----------------------------------------------------
  //           setCards(yandexDBLikeUpdated);
  //           localStorage.removeItem("cards");
  //           localStorage.removeItem("seachResult");
  //           localStorage.removeItem("shortFilms");
  //           localStorage.setItem("cards", JSON.stringify(yandexDBLikeUpdated));
  //           localStorage.setItem("seachResult", seachResult);
  //           localStorage.setItem("onShortFilms", onShortFilms);
  //         } else {
  //           setCards(yandexDB);
  //           localStorage.removeItem("cards");
  //           localStorage.removeItem("seachResult");
  //           localStorage.removeItem("shortFilms");
  //           localStorage.setItem("cards", JSON.stringify(yandexDB));
  //           localStorage.setItem("seachResult", seachResult);
  //           localStorage.setItem("onShortFilms", onShortFilms);
  //         }
  //         // getCardsFromMyServer(e)
  //         // console.log(' RUN ------------------ getCardsFromMyServer')
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //}

 //////////////////////////////////////////////////////////////////////////////////////////////
 
  //////////////////////<<<  S E A R C H   F R O M   M Y   D B  >>>////////////////////////////
  function findCardInSaved(e) {
    e.preventDefault();
    
    let findInput = findMy.toLowerCase()
    let result = cardsMy.filter(film => film.nameRU.toLowerCase().includes(findInput));
    if (onShortFilms === "2") {
      result = result.filter(film => film.duration < 41);
    }
    setCardsMy(result);
    localStorage.setItem("cardsMy", JSON.stringify(result));
    localStorage.setItem("seachResultMy", seachResultMy);
    localStorage.setItem("onShortFilmsMy", onShortFilmsMy);
  }

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
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> newCard = ', newCard)

        //cards.filter(card => card.externalId !== newCard.externalId);

        let newCards = cards.map((c) => (c.externalId === card.externalId ? newCard : c));
        setCards(newCards);

        //console.log('>>>>>>>>>>>>>>>>>>>>>>>> newCards = ', newCards)

        if (newLike) {
          setCardsMy((oldCards) => ([...oldCards, newCard]));
        } else {
          let filteredCardsMy = cardsMy.filter(card => card._id !== oldId)
          setCardsMy(filteredCardsMy);
        }

        localStorage.setItem("cards", JSON.stringify(newCards));

        //getCardsFromMyServer(e)
        //console.log(' RUN ------------------ getCardsFromMyServer')

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
    // console.log('handleUpdateUser info= ', info.name , info.email)
    apiMy
      .setUserInfo(info.name, info.email)
      .then((data) => {
        setCurrentUser(data);
        setProfileError("")
         // history.push("/profile");
      })
      .catch((err) => {
        console.log(err);
          if (err === 'Ошибка: 400') {
            setProfileError(`Введены некорреткные данные в поля Имя/E-mail`)
          } else {        
            setProfileError(`Извините, случилась проблема обновления профиля: ${err}`)
        // window.alert(`${alertMessage} ${err}`);
          }
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
                    getCardsFromServer={findCardInMain}
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
                    getCardsFromServer={findCardInSaved}
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
                      checkPass={checkPass}
                      checkEmail={checkEmail}
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
