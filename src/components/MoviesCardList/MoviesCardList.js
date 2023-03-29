import React, { useEffect } from "react";

import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({
  cards,
  onCardLike
}) {

  
useEffect(() => {
  // console.log('cardsForShow = ', cards)
}, [cards]);

 
  return (
    <section className="elements">
        {cards.map((card) => (
          <MoviesCard
            key={card.externalId}
            link={card.link}
            name={card.name}
            card={card}
            likes={
              // card.likes.length
              card.likes?.length
              ? card.likes.length
              : 0
            }
            onCardLike={onCardLike}
          />
        ))}
   </section>
  );
}

export default MoviesCardList;
