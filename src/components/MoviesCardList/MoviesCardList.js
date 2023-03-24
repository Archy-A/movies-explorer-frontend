import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  cards,
  onCardLike
}) {
 
  return (
    <section className="elements">
        {cards.map((card) => (
          <MoviesCard
            key={card.id}
            link={card.link}
            name={card.name}
            card={card}
            likes={
              // card.likes.length
              card.likes?.length
              ? card.likes.length
              : 0
            }
            // onCardClick={handleCardClick}
            onCardLike={onCardLike}
            // onCardDelete={onCardDelete}
            // onDeleteConfirmation={onDeleteConfirmation}
          />
        ))}
   </section>
  );
}

export default MoviesCardList;
