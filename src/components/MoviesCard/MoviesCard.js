import React, { useContext } from 'react';
import { useEffect, useState } from "react";

function MoviesCard(props) {

  function getCurrentURL () {
    return window.location.pathname
  }
  const url = getCurrentURL()
  const [currentPath, setCurrentPath] = useState(url);

  useEffect(() => {
    setCurrentPath(url)
  }, [url]);

  const [show, setShow] = useState("none");

  const showRemove = (e) => {
    setShow("block");
  };

  const hideRemove = (e) => {
    setShow("none");
  };
//console.log("<<<<<<<<<<< props.card:\n", props.card);
  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours === 0) {
      let durationString = ` ${minutes} м`
      return durationString;
    } else {
      let durationString = `${hours} ч ${minutes} м`
      return durationString;
    }
  }

  function handleLikeClick(e) {
    props.onCardLike(props.card, e);
  }

  const imageLink = `${
    // currentPath === '/saved-movies' ? `https://api.nomoreparties.co/${props.card.image}` : `https://api.nomoreparties.co/${props.card.image.url}`
    `https://api.nomoreparties.co/${props.card.image}`
  }`;

  const isLiked = props.card.like;

  const cardLikeButtonClassName = `${
    isLiked ? "element__like_pressed" : ""
  }`;

  function handleYouTubeTrailer() {
    window.open(props.card.trailerLink, '_blank');
  }

  return (
   <article key={props.card.externalId} className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
   >
      <img className="element__picture"
           src={`${imageLink}`} 
           onClick={handleYouTubeTrailer}
           alt={props.card.nameRU}>
      </img>
      
      <div className="element__place">
        <h2 className="element__name">{props.card.nameRU}</h2>
        <div className="element__container">

          <button  
            type="button" 
            className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : cardLikeButtonClassName} } `} 
            aria-label="Сердечко, поставить лайк"
            onClick={handleLikeClick}
            >
          </button>

        </div>
      </div>
      <p className="element__time">{toHoursAndMinutes(props.card.duration)}</p>
    </article>
    )
}

export default MoviesCard; 