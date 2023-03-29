import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies(props) {

  //const [allCards, setAllCards] = useState(props.cards);
  const [cards, setCards] = useState(props.cards);
  const [searchString, setSearchString] = useState(localStorage.getItem("searchString") || "");
  const [shortFilmsChecked, setShortFilmsChecked] = useState(localStorage.getItem("shortFilmsChecked")?.toLowerCase() === 'true' || false);
//  const [preloaderState, setPreloaderState] = useState(false);



//---------------------------------------------------------------------------------------
//////////////////////////// BUTTON LOAD [MORE] FILMS ///////////////////////////////////
//---------------------------------------------------------------------------------------
  // let [firstLoadMovies, setFirstLoadMovies] = useState(true);
  // console.log('props.firstLoadMovies = ', props.firstLoadMovies)

  let filteredCardsForShow = [...props.cards];
  let [number, setNumber] = useState(getInitNumber());

  // const [cardsForShow, setCardsForShow] = useState(JSON.parse(localStorage.getItem("cardsForShow") || filteredCardsForShow.slice(0, number)));
  const [cardsForShow, setCardsForShow] = useState(filteredCardsForShow.slice(0, number));
  //console.log('JSONcardsForShow = ', JSON.parse(localStorage.getItem("cardsForShow")))

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
    if (window.innerWidth <769) {
      setNumber((number += 2));
    } else {
      setNumber((number += 3));
    }
    cardsForShow = filteredCardsForShow.slice(0, number);
    props.setFirstLoadMovies(false);
    localStorage.setItem("cardsForShow", JSON.stringify(cardsForShow));
  }
//---------------------------------------------------------------------------------------

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("searchString", newSearchString);
    
    props.setFind(newSearchString);//REMOVE IT
  }

  function onShortFilmsChanged(value) {
    setShortFilmsChecked(value);
    localStorage.setItem("shortFilmsChecked", JSON.stringify(value));
    props.setOnShortFilms(value);//REMOVE IT
  }

  // async function filterCards() {

  //   const initialCards = await loadInitialCards();
  //   const myCards = await loadMyCards();
    
  //   function compare(dbfilms, myCards) { /////Передаём 2 массива
  //       let cardsMyIds = {};
  //       myCards.forEach(cardMyselect => {
  //         cardsMyIds[cardMyselect.externalId] = cardMyselect;
  //       });
  //       return dbfilms.map((obj) => {
  //         const matched = Object.keys(cardsMyIds).includes(String(obj.externalId));
  //         return matched ? cardsMyIds[obj.externalId] : obj;
  //     });
  //   }

  //   let findInput = searchString.toLowerCase()
  //   let result = initialCards.filter(film => film.nameRU.toLowerCase().includes(findInput));
  //   if (shortFilmsChecked) {
  //       result = result.filter(film => film.duration < 41);
  //   }
  //   result = compare(result, myCards);

  //   //tmp preloader emulator >>>>>>>>>>-----------------------------
  //         setPreloaderState(true)
  //         console.log('preloaderState before= ', preloaderState)
  //         setCards([])
  //         function sleep(ms) {
  //           return new Promise(resolve => setTimeout(resolve, ms));
  //         }
  //         sleep(500).then(() => { 
  //           setPreloaderState(false);

  //         /////// Button [LOAD MORE] ///////
          
  //         //////////////////////////////////

  //           setCards(result); 
  //           setMyCards(myCards);
  //         });
  // }

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

            //onShortFilms={props.onShortFilms}
            // isChecked={props.isChecked}
            // setSeachResult={props.setSeachResult}
            // searchResult={props.searchResult}
            // searchResultFromLocalStorage={props.searchResultFromLocalStorage}
            // setSearchResultFromLocalStorage={props.setSearchResultFromLocalStorage}
             //setChecked={props.setChecked}
             //checked={props.checked}
             getInitNumber={getInitNumber}
             setFirstLoadMovies={props.setFirstLoadMovies}
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
            cards={props.cards}
            //  cards={cardsForShow}
            onCardLike={props.onCardLike}
          />
        </div>

        <div className="preloader__wrapper">
          <Preloader
            preloaderState={props.preloaderState}
            showMore={showMore}
            allCards={filteredCardsForShow}
            cards={props.cards}
            backendError={props.backendError}
          />  
        </div>
      
      </section>
    </main>
  );
}

export default Movies;
