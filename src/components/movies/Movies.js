import React, { useState } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies(props) {

  //const [allCards, setAllCards] = useState(props.cards);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchString, setSearchString] = useState(localStorage.getItem("searchString") || "");
  const [onShortFilms, setOnShortFilms] = useState(localStorage.getItem("onShortFilms") || "1");

  let getFirstCards = [...props.cards];
  getFirstCards.splice(12);
  // props.setCardsForShow(getFirstCards);

  // if (props.firstIter) {
  //   console.log('First state ')
  //   props.setFirstIter(false);
  //   setCardsForShow(getFirstCards);
  // }

  console.log('getFirstCards = ', getFirstCards)

  function showMore() {
      if (props.currentLimit > props.cards.length) {
        console.log('FINISH ======================================== ')
        return
      }
      for (; props.currentIndex < props.currentLimit; props.setCurrentIndex(props.currentIndex + 1)) {
        // setCardsForShow((oldCards) => ([...oldCards, props.cards[props.currentIndex]]));
        console.log('currentIndex  = = = = = = = = == ', props.currentIndex)
      };
      props.setCurrentLimit(props.currentLimit + 3)  
     }


  return (
    <main>
      <section className="movies">

        <div className="search__wrapper">
          <SearchForm
             getCardsFromServer={props.getCardsFromServer}
             setFind={props.setFind}
             setOnShortFilms={props.setOnShortFilms}
             onShortFilms={props.onShortFilms}
             isChecked={props.isChecked}
             setSeachResult={props.setSeachResult}
             searchResult={props.searchResult}
             searchResultFromLocalStorage={props.searchResultFromLocalStorage}
             setSearchResultFromLocalStorage={props.setSearchResultFromLocalStorage}
             setChecked={props.setChecked}
             checked={props.checked}
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
             cards={props.cards}
            //  cards={props.cardsForShow}
             onCardLike={props.onCardLike}
          />
        </div>

        <div className="preloader__wrapper">
          <Preloader
            preloaderState={props.preloaderState}
            showMore={showMore}
          />  
        </div>
      
      </section>
    </main>
  );
}

export default Movies;
