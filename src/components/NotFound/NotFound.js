import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function NotFound({
  onEditProfile,
}) {

  function onSubmit() {
    console.log('ssssss')
  }

  return (
    <>
      <section className="notfound">
        <div className="notfound__wrapper">

              <p className="notfound__404">404</p>
              <p className="notfound__title">Страница не найдена</p>
            
              <div className="notfound__framer">
                <NavLink to="/" className="notfound__redirect">
                  Назад
                </NavLink>
              </div>

       </div>
      </section>
    </>
  );
}

export default NotFound;