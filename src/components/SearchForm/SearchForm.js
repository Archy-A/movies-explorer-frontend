import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {

 const inputFindRef = useRef();
 const location = useLocation();

  const [userSearch, setUserSearch] = useState("");

  function handleChangeName(e) {
    setUserSearch(e.target.value);
    props.setFind(e.target.value);
    props.setSeachResult(e.target.value);
    props.setSearchResultFromLocalStorage('');

  }

  function handleChangeBox() {
    if (props.onShortFilms === '1') {
      console.log('handleChangeBox setOnShortFilms= ', "2")
      props.setOnShortFilms('2')
      props.setChecked('checked')

    } else if (props.onShortFilms === '2') {
      console.log('handleChangeBox setOnShortFilms= ', "1")
      props.setOnShortFilms('1')
      props.setChecked('')
    }
  }

  useEffect(() => {
    // console.log('setFind useEffect')
    props.setSeachResult(inputFindRef.current.value);
    props.setFind(inputFindRef.current.value);
  }, [location, inputFindRef]);
 

  return (
    <section className="search">

        <form
          className="search__container"
          onSubmit={props.getCardsFromServer}
          method="get"
          name="search_form"
        >
          <input 
            ref={inputFindRef}
            className="search__input" 
            placeholder="Фильм"
            id="search_input"
            type="text"
            value={props.searchResultFromLocalStorage ? props.searchResultFromLocalStorage : userSearch || ""}
            onChange={handleChangeName}
            minLength="1"
            maxLength="99"
            required
          ></input>
          <button type="submit" className="search__button">Найти</button>
        </form>
        <div className="search__switcher">

          <label
            className="search__switch"
            onChange={handleChangeBox}
            >
            <input
              className="search__checkbox"
              type="checkbox"
              checked={props.onShortFilms == 2 ? true : false}
              readOnly
              >
            </input>
            <span className="search__slider"></span>
          </label>

          <p className="search__short">Короткометражки</p>
        </div>
        <div className="search__under"></div>

    </section>
  );
}

export default SearchForm;
