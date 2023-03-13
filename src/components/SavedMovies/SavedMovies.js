import React, { useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({
  onEditProfile,
}) {

  return (
    <main>
      <section className="movies">

        <div className="search__wrapper">
          <SearchForm
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
          />
        </div>

        <div className="movies__saved"></div>

      </section>
    </main>
  );
}

export default SavedMovies;
