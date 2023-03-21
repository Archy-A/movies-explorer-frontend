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

  return (
   <article key={props.card.id} className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
   >
      <img className="element__picture" src={`https://api.nomoreparties.co/${props.card.image.url}`} alt={props.card.nameRU}></img>      <div className="element__place">
        <h2 className="element__name">{props.card.nameRU}</h2>
        <div className="element__container">
          <button  type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">{props.card.duration}</p>
    </article>
    )
}

export default MoviesCard; 