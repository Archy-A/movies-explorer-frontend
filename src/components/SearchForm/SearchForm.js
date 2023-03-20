import React from "react";

function SearchForm({ loggedIn, email, setLoggedIn }) {
 
  return (
    <section className="search">

        <form className="search__container">
          <input 
            className="search__input" 
            placeholder="Фильм"
            minLength="1"
            maxLength="99"
            required
          ></input>
          <button className="search__button">Найти</button>
        </form>
        <div className="search__switcher">

          <label class="search__switch">
            <input class="search__checkbox" type="checkbox"></input>
            <span class="search__slider"></span>
          </label>

          <p className="search__short">Короткометражки</p>
        </div>
        <div className="search__under"></div>

    </section>
  );
}

export default SearchForm;
