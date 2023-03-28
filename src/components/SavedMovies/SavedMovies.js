import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  const [allCards, setAllCards] = useState(props.cards);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchString, setSearchString] = useState(localStorage.getItem("savedSearchString") || "");
  const [onShortFilmsMy, setOnShortFilmsMy] = useState(localStorage.getItem("savedOnShortFilms") || "1");

  useEffect(() => {
    onSearchBtnClicked();
  }, []);

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("savedSearchString", newSearchString);
    props.setFind(newSearchString);//REMOVE IT
  }

  function onShortFilmsChanged(value) {
    setOnShortFilmsMy(value);
    localStorage.setItem("savedOnShortFilms", value);
    props.setOnShortFilms(value);//REMOVE IT
  }

  function onSearchBtnClicked() {
    //props.getCardsFromServer();

    let findInput = searchString.toLowerCase()
    let result = allCards.filter(film => film.nameRU.toLowerCase().includes(findInput));

    if (onShortFilmsMy === "2") {
      result = result.filter(film => film.duration < 41);
    }
    setFilteredCards(result);
  }

  return (
    <main>
      <section className="movies">

        <div className="search__wrapper">
          <SearchForm
            getCardsFromServer={onSearchBtnClicked}
            setFind={onSearchStringChanged}
            setOnShortFilms={onShortFilmsChanged}
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
