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

        <div className="search__wrapper">
          <SearchForm
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
          />
        </div>

        <div className="preloader__wrapper">
          <Preloader
          />  
        </div>
      
      </section>
    </main>
  );
}

export default Movies;
