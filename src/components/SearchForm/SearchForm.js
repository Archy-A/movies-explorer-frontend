import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {

 const inputFindRef = useRef();
 const location = useLocation();

  function handleChangeName(e) {
    props.setFind(e.target.value);
  }

  function handleChangeBox() {
    props.onShortFilmsChanged(!props.shortFilmsChecked);
  }

  useEffect(() => {
    props.setFind(inputFindRef.current.value);
  }, [location, inputFindRef]);


  const [inputMessage, setInputMessage] = useState("");

  function handleSubmitForm(e) {
    e? e.preventDefault() : console.log("");
    // validation of search field if not empty
    if (inputFindRef.current.value === "") {
      setInputMessage("Нужно ввести ключевое слово");
      return inputMessage
    }
    setInputMessage("");
    props.onSearchBtnClicked();
  }
 
  useEffect(() => {
  }, [inputMessage]);

  return (
    <section className="search">

        <form
          className="search__container"
          onSubmit={handleSubmitForm}
          method="get"
          name="search_form"
        >
          <input 
            ref={inputFindRef}
            className="search__input" 
            placeholder="Фильм"
            id="search_input"
            type="text"
            value={props.searchString}
            onChange={handleChangeName}
            // minLength="1"
            // maxLength="99"
            // required
          ></input>
          <button type="submit" className="search__button">Найти</button>
        </form>

        <span className="search__input-error">{inputMessage}</span>

        <div className="search__switcher">

          <label
            className="search__switch"
            onChange={handleChangeBox}
            >
            <input
              className="search__checkbox"
              type="checkbox"
              checked={props.shortFilmsChecked}
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
