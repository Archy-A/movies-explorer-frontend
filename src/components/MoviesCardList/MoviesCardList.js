import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
 
  return (
    <section className="elements">

        <MoviesCard
        />

   </section>
  );
}

export default MoviesCardList;
