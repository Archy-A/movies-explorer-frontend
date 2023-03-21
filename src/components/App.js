import "../index.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from "./header/Header";
import Landing from "./landing/Landing";
import Movies from "./movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Footer from "./footer/Footer";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";

import api from "../utils/MoviesApi";


function App() {

  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards") || "[]"));
  const [find, setFind] = useState([]);
  const [seachResult, setSeachResult] = useState(''); 
  const [onShortFilms, setOnShortFilms] = useState('1');
  const [searchResultFromLocalStorage, setSearchResultFromLocalStorage] = useState(localStorage.getItem("seachResult"));
  
  let isChecked = false;

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
          setCards(result);
          localStorage.removeItem("cards");
          localStorage.removeItem("seachResult");
          localStorage.setItem("cards", JSON.stringify(result));
          localStorage.setItem("seachResult", seachResult);
      })
      .catch((err) => {
        console.log(err);
      });
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
                    />
                  </Route>

                  <Route exact path="/saved-movies" component={SavedMovies}
                  />

                  <Route exact path="/profile" component={Profile}
                  />

                  <Route exact path="/signup" component={Register}
                  />

                  <Route exact path="/signin" component={Login}
                  />

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
