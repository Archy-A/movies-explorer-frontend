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
    // e.target.style.background = 'red';
    // console.log(' e = ', e.nativeEvent.target.className)
  };

  const hideRemove = (e) => {
    setShow("none");
    // e.target.style.background = 'green';
  };

  return (
    <>

   <article key="1" className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
   >
      <img className="element__picture" src={picTri} alt="33 слова о дизайне"></img>      <div className="element__place">
        <h2 className="element__name">33 слова о дизайне</h2>
        <div className="element__container">
          <button  type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 47м</p>
    </article>

    <article key="2" className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
    >
      <img className="element__picture" src={picStoLet} alt="Киноальманах «100 лет дизайна»"></img>      <div className="element__place">
        <h2 className="element__name">Киноальманах «100 лет дизайна»</h2>
        <div className="element__container">
        <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 47м</p>
    </article>

    {/* <article key="3" className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
    >
      <img className="element__picture" src={picBenksi} alt="В погоне за Бенкси"></img>      <div className="element__place">
        <h2 className="element__name">В погоне за Бенкси</h2>
        <div className="element__container">
          <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 42м</p>
    </article> */}

    {/* <article key="4" className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
    >
      <img className="element__picture" src={picBaskia} alt="Баския: Взрыв реальности"></img>      <div className="element__place">
        <h2 className="element__name">Баския: Взрыв реальности</h2>
        <div className="element__container">
          <button style={{ display: "none" }} type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 21м</p>
    </article>

    <article key="5" className={`${currentPath === '/saved-movies' ? "element_saved" : "element" } `}
    >
      <img className="element__picture" src={picBeg} alt="Бег это свобода"></img>      <div className="element__place">
        <h2 className="element__name">Бег это свобода</h2>
        <div className="element__container">
          <button style={{ display: "none" }} type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 44м</p>
    </article> */}

    {/* <article key="1" className="element">
      <img className="element__picture" src={picKnigotvor} alt="Книготорговцы"></img>      <div className="element__place">
        <h2 className="element__name">Книготорговцы</h2>
        <div className="element__container">
           <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 37м</p>
    </article>

    <article key="1" className="element">
      <img className="element__picture" src={picGermany} alt="Когда я думаю о Германии ночью"></img>      <div className="element__place">
        <h2 className="element__name">Когда я думаю о Германии ночью</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 56м</p>
    </article>

    <article key="1" className="element">
      <img className="element__picture" src={picGimme} alt="Gimme Danger: История Игги и The Stooge..."></img>      <div className="element__place">
        <h2 className="element__name">Gimme Danger: История Игги и The Stooge...</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 59м</p>
    </article> */}

    {/* <article key="1" className="element">
      <img className="element__picture" src={picDjenis} alt="Дженис: Маленькая девочка грустит"></img>      <div className="element__place">
        <h2 className="element__name">Дженис: Маленькая девочка грустит</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 42м</p>
    </article>

    <article key="1" className="element">
      <img className="element__picture" src={picProgok} alt="Соберись перед прыжком"></img>      <div className="element__place">
        <h2 className="element__name">Соберись перед прыжком</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 10м</p>
    </article> */}

    {/* <article key="1" className="element">
      <img className="element__picture" src={picPi} alt="Пи Джей Харви: A dog called money"></img>      <div className="element__place">
        <h2 className="element__name">Пи Джей Харви: A dog called money</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 4м</p>
    </article>

    <article key="1" className="element">
      <img className="element__picture" src={picPovolnam} alt="По волнам: Искусство звука в кино"></img>      <div className="element__place">
        <h2 className="element__name">По волнам: Искусство звука в кино</h2>
        <div className="element__container">
         <button type="button" className={`element__like ${currentPath === '/saved-movies' ? "element__remove" : "" } `} aria-label="Сердечко, поставить лайк"></button>
        </div>
      </div>
      <p className="element__time">1ч 7м</p>
    </article> */}

    </>
    )
}

export default MoviesCard; 