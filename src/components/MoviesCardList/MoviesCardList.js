import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  cards,
}) {
 
  return (
    <section className="elements">
        {/* <MoviesCard
        /> */}
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            link={card.link}
            name={card.name}
            card={card}
          />
        ))}
   </section>
  );
}

export default MoviesCardList;
