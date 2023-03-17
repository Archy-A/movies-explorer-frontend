import React, { useContext } from "react";
import { NavLink, useHistory  } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function NotFound({
  onEditProfile,
}) {

  function onSubmit() {
    console.log('ssssss')
  }

  let history = useHistory()


  return (
    <>
      <section className="notfound">
        <div className="notfound__wrapper">
              <p className="notfound__404">404</p>
              <p className="notfound__title">Страница не найдена</p>
              <div className="notfound__framer">
                <button
                    className="notfound__redirect" onClick={() => history.goBack()}
                  >
                    Назад
                </button>
              </div> 
       </div>
      </section>
    </>
  );
}

export default NotFound;