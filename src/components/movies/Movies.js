import React, { useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies({
  onEditProfile,
}) {

  return (
    <main>
      <section className="movies">

        <SearchForm
        />   

        <div className="under_grey"></div>

        <div className="element__wrapper">
          <MoviesCardList
          />
        </div>

        <Preloader
        />  

      </section>
    </main>
  );
}

export default Movies;
