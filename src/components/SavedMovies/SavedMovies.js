import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  const [allCards, setAllCards] = useState(props.cards);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchString, setSearchString] = useState(localStorage.getItem("savedSearchString") || "");
  const [shortFilmsChecked, setShortFilmsChecked] = useState(localStorage.getItem("savedShortFilmsChecked")?.toLowerCase() === 'true' || false);

  useEffect(() => {
    filterCards();
  }, []);

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("savedSearchString", newSearchString);
    props.setFind(newSearchString);//REMOVE IT
  }

  function onShortFilmsChanged(value) {
    setShortFilmsChecked(value);
    localStorage.setItem("savedShortFilmsChecked", JSON.stringify(value));
    props.setOnShortFilms(value);//REMOVE IT
  }

  function filterCards() {
    if (searchString.length === 0) {
      return;
    }
    let findInput = searchString.toLowerCase()
    let result = allCards.filter(film => film.nameRU.toLowerCase().includes(findInput));

    if (shortFilmsChecked) {
      result = result.filter(film => film.duration < 41);
    }
    setFilteredCards(result);
  }

  return (
    <main>
      <section className="movies">

        <div className="search__wrapper">
          <SearchForm
            onSearchBtnClicked={filterCards}
            setFind={onSearchStringChanged}
            onShortFilmsChanged={onShortFilmsChanged}
            searchString={searchString}
            shortFilmsChecked={shortFilmsChecked}

          //  isChecked={props.isChecked}
          //  setSeachResult={props.setSeachResult}
           // searchResult={props.searchResult}
           // searchResultFromLocalStorage={props.searchResultFromLocalStorage}
           // setSearchResultFromLocalStorage={props.setSearchResultFromLocalStorage}
           // setChecked={props.setChecked}
           // checked={props.checked}
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
            cards={filteredCards}
            onCardLike={props.onCardLike}
          />
        </div>

        <div className="movies__saved"></div>

      </section>
    </main>
  );
}

export default SavedMovies;
