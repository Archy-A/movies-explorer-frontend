import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies(props) {
  
  const SHORT_FILM_DURATION = 41;
  const NUMBER_OF_FILMS_FOR_MOBILE = 5;
  const NUMBER_OF_FILMS_FOR_TABLET = 8;
  const NUMBER_OF_FILMS_FOR_DESKTOP = 12;
  const RESOLUTION_FOR_DESKTOP = 1201;
  const RESOLUTION_FOR_TABLET = 768;
  const RESOLUTION_FOR_TABLET_FOR_CONDITION = 769;
  const RESOLUTION_FOR_TABLET_FOR_MOBILE = 400;
  const NUMBER_OF_MORE_FILMS_FOR_MOBILE = 1;
  const NUMBER_OF_MORE_FILMS_FOR_TABLET = 2;
  const NUMBER_OF_MORE_FILMS_FOR_DESKTOP = 3;

  const [filteredCards, setFilteredCards] = useState([]);
  const [searchString, setSearchString] = useState(localStorage.getItem("searchString") || "");
  const [shortFilmsChecked, setShortFilmsChecked] = useState(localStorage.getItem("shortFilmsChecked")?.toLowerCase() === 'true' || false);
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(false)
  const [searchStringDisabled, setSearchStringDisabled] = useState(false)
  const [shortFilmsCheckDisabled, setShortFilmsCheckDisabled] = useState(false)

  let firstSearch = JSON.parse(localStorage.getItem("firstSearch") || true);

//---------------------------------------------------------------------------------------
//////////////////////////// BUTTON LOAD [MORE] FILMS ///////////////////////////////////
//---------------------------------------------------------------------------------------
  const [number, setNumber] = useState(getInitNumber());
  const [cardsForShow, setCardsForShow] = useState(filteredCards.slice(0, number));

  let resizeTimeout;
  
  useEffect(() => {
    window.addEventListener('resize', resizeLimiter);
    return () => {
      window.removeEventListener('resize', resizeLimiter)
    }
  }, []);
  
  const resizeLimiter = () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        setNumber(getInitNumber());
      }, 1000);
    }
  }

  function getInitNumber() {
    if (window.innerWidth >= RESOLUTION_FOR_DESKTOP) {
      return NUMBER_OF_FILMS_FOR_DESKTOP;
    } else if (window.innerWidth >= RESOLUTION_FOR_TABLET) {
      return NUMBER_OF_FILMS_FOR_TABLET;
    } else {
      return NUMBER_OF_FILMS_FOR_MOBILE;
    }
  }

  function showMore() {
    if (window.innerWidth < RESOLUTION_FOR_TABLET_FOR_MOBILE) {
      setNumber(number + NUMBER_OF_MORE_FILMS_FOR_MOBILE);
    }
    else if (window.innerWidth < RESOLUTION_FOR_TABLET_FOR_CONDITION) {
      setNumber(number + NUMBER_OF_MORE_FILMS_FOR_TABLET);
    } else {
      setNumber(number + NUMBER_OF_MORE_FILMS_FOR_DESKTOP);
    }
  }
//---------------------------------------------------------------------------------------

  useEffect(() => {
    filterCards(props.cards);
  }, [props.cards, shortFilmsChecked]);

  useEffect(() => {
    setCardsForShow(filteredCards.slice(0, number));
  }, [filteredCards, number]);

  useEffect(() => {
    blockFields(props.preloaderState);
  }, [props.preloaderState]);

  function blockFields(toBlock) {
    setSearchButtonDisabled(toBlock);
    setSearchStringDisabled(toBlock);
    setShortFilmsCheckDisabled(toBlock);
  }

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("searchString", newSearchString);
  }

  function onShortFilmsChanged(value) {
    setShortFilmsChecked(value);
    localStorage.setItem("shortFilmsChecked", JSON.stringify(value));
  }

  function onSearchMovieClicked() {
    if (firstSearch) {
      firstSearch = false;
      localStorage.setItem("firstSearch", JSON.stringify(firstSearch));
      props.onFirstSearchMovie();
    } else {
      filterCards(props.cards);
    }
  }

  function filterCards(cards) {
    if (searchString.length === 0) {
      return;
    }
    function compare(dbfilms, myCards) {
        let cardsMyIds = {};
        myCards.forEach(cardMyselect => {
          cardsMyIds[cardMyselect.externalId] = cardMyselect;
        });
        return dbfilms.map((obj) => {
          const matched = Object.keys(cardsMyIds).includes(String(obj.externalId));
          return matched ? cardsMyIds[obj.externalId] : obj;
      });
    }

    blockFields(true);
    let findInput = searchString.toLowerCase()
    let result = cards['allCards'].filter(film => film.nameRU.toLowerCase().includes(findInput));
    if (shortFilmsChecked) {
        result = result.filter(film => film.duration < SHORT_FILM_DURATION);
    }
    result = compare(result, cards['myCards']);
    setFilteredCards(result);
    blockFields(false);
  }

  return (
    <main>
      <section className="movies">

        <div className="search__wrapper">
          <SearchForm
            setFind={onSearchStringChanged}
            searchString={searchString}
            onShortFilmsChanged={onShortFilmsChanged}
            shortFilmsChecked={shortFilmsChecked}
            onSearchBtnClicked={onSearchMovieClicked}
            searchButtonDisabled={searchButtonDisabled}
            searchStringDisabled={searchStringDisabled}
            shortFilmsCheckDisabled={shortFilmsCheckDisabled}
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
            cards={cardsForShow}
            onCardLike={props.onCardLike}
          />
        </div>

        <div className="preloader__wrapper">
          <Preloader
            preloaderState={props.preloaderState}
            showMore={showMore}
            allCardsNumber={filteredCards.length}
            cardsNumber={cardsForShow.length}
            backendError={props.backendError}
          />  
        </div>
      
      </section>
    </main>
  );
}

export default Movies;
