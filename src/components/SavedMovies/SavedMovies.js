import React, { useState, useEffect } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {

  const [allCards, setAllCards] = useState(props.cards);
  const [filteredCards, setFilteredCards] = useState(JSON.parse(localStorage.getItem("filteredCards")) || []);
  const [searchString, setSearchString] = useState(localStorage.getItem("savedSearchString") || "");
  const [shortFilmsChecked, setShortFilmsChecked] = useState(localStorage.getItem("savedShortFilmsChecked")?.toLowerCase() === 'true' || false);
  // console.log("--- page refreshed: ",JSON.parse(localStorage.getItem("filteredCards")));
  // console.log("--- page refreshed props: ",props);
  useEffect(() => {
    setAllCards(props.cards);
  }, [props.cards]);

  useEffect(() => {
    filterCards();
  }, [allCards]);

  function onSearchStringChanged(newSearchString) {
    setSearchString(newSearchString);
    localStorage.setItem("savedSearchString", newSearchString);
  }

  function onShortFilmsChanged(value) {
    setShortFilmsChecked(value);
    localStorage.setItem("savedShortFilmsChecked", JSON.stringify(value));
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
    localStorage.setItem("filteredCards", JSON.stringify(result));
    // console.log("--after filter res: ",result);
    // console.log("--after filter: ",JSON.parse(localStorage.getItem("filteredCards")));
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
