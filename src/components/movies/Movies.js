import React, { useContext } from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader.js";

function Movies(props) {



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
          />   
          <div className="under_grey"></div>
        </div>

        <div className="movies__wrapper">
          <MoviesCardList
             cards={props.cards}
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
