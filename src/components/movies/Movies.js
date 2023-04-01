import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies(props) {

  const [filteredCards, setFilteredCards] = useState([]);
  const [searchString, setSearchString] = useState(localStorage.getItem("searchString") || "");
  const [shortFilmsChecked, setShortFilmsChecked] = useState(localStorage.getItem("shortFilmsChecked")?.toLowerCase() === 'true' || false);

//---------------------------------------------------------------------------------------
//////////////////////////// BUTTON LOAD [MORE] FILMS ///////////////////////////////////
//---------------------------------------------------------------------------------------
  const [number, setNumber] = useState(getInitNumber());
  const [cardsForShow, setCardsForShow] = useState(filteredCards.slice(0, number));

  let resizeTimeout;

  useEffect(() => {
    window.addEventListener('resize', resizeLimiter);
  });
  

  const resizeLimiter = () => {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        setNumber(getInitNumber());
      }, 1000);
    }
  }

  function getInitNumber() {
    if (window.innerWidth >= 1201) {
      return 12;
    } else if (window.innerWidth >= 768) {
      return 8;
    } else {
      return 5;
    }
  }

  function showMore() {
    if (window.innerWidth <400) {
      setNumber(number + 1);
    }
    else if (window.innerWidth <769) {
      setNumber(number + 2);
    } else {
      setNumber(number + 3);
    }
  }
//---------------------------------------------------------------------------------------

  useEffect(() => {
    filterCards(props.cards);
  }, [props.cards, shortFilmsChecked]);

  useEffect(() => {
    setCardsForShow(filteredCards.slice(0, number));
  }, [filteredCards, number]);

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("searchString", newSearchString);
  }

  function onShortFilmsChanged(value) {
    setShortFilmsChecked(value);
    localStorage.setItem("shortFilmsChecked", JSON.stringify(value));
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

    let findInput = searchString.toLowerCase()
    let result = cards['allCards'].filter(film => film.nameRU.toLowerCase().includes(findInput));
    if (shortFilmsChecked) {
        result = result.filter(film => film.duration < 41);
    }
    result = compare(result, cards['myCards']);
    setFilteredCards(result);
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
            onSearchBtnClicked={props.onSearchMovieClicked}
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
