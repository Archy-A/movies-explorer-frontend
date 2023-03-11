import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

function SearchForm({ loggedIn, email, setLoggedIn }) {
 
  return (
    <div className="search">
      <div className="search__wrapper">
        <div className="search__container">
          <input className="search__input" placeholder="Фильм"></input>
          <button className="search__button">Найти</button>
        </div>
        <div className="search__switcher">

          <label class="search__switch">
            <input class="search__checkbox" type="checkbox" checked></input>
            <span class="search__slider"></span>
          </label>

          <p className="search__short">Короткометражки</p>
        </div>
        <div className="search__under"></div>
      </div>
    </div>
  );
}

export default SearchForm;