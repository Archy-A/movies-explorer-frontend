import React, { useContext } from 'react';
import { useEffect, useState } from "react";

import picGermany from '../../images/cardPic.jpg';
import picTri from '../../images/33.jpg';
import picStoLet from '../../images/100let.jpg';
import picBenksi from '../../images/benksi.jpg';
import picBaskia from '../../images/baskia.jpg';
import picBeg from  '../../images/beg.jpg';
import picKnigotvor from  '../../images/knigotvor.jpg';
import picGimme from '../../images/gimme.jpg';
import picDjenis from '../../images/djenis.jpg';
import picProgok from '../../images/progok.jpg';
import picPi from '../../images/pi.jpg';
import picPovolnam from '../../images/povolnam.jpg';

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

  console.log('=====================',)


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