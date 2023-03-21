import React, { useState, useRef } from "react";

function SearchForm(props) {

 const inputFindRef = useRef();

//  console.log('inputFindRef >>>>>>>>>', inputFindRef.current.value)

  // useEffect(() => {
  //   props.setFind(inputFindRef.current.value);
  // }, [inputFindRef.current.value]);

  const [userSearch, setUserSearch] = useState("");

  function handleChangeName(e) {
    setUserSearch(e.target.value);
    props.setFind(e.target.value)
  }
 

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
            value={userSearch || ""}
            onChange={handleChangeName}
            minLength="1"
            maxLength="99"
            required
          ></input>
          <button type="submit" className="search__button">Найти</button>
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
