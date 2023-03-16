import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function Profile({
  onEditProfile,
}) {

  function onSubmit() {
    console.log('ssssss')
  }

  return (
    <>
      <section className="profile">
        <div className="profile__wrapper">

       <div className="profile_title">
           <h1 className="profile__welcome">Привет, Виталий!</h1>
        </div>

        <form
              onSubmit={onSubmit}
              className="profile_form"
              method="post"
              name="login"
            >

             <div className="profile__box">

               <div className="profile__container">
                 <p className="profile__title">Имя</p>
                  <input
                    id="profile__name"
                    type="text"
                    value="Виталий"
                    // onChange={props.handleOnChange}
                    name="nameReg"
                    placeholder=""
                    className="profile__name"
                    minLength="2"
                    maxLength="40"
                    required
                  ></input>
                </div>

                <div className="profile__line" />

              <div className="profile__container">
                <p className="profile__title">E-mail</p>
                <input
                  id="profile__email"
                  type="text"
                  value="pochta@yandex.ru"
                  // onChange={props.handleOnChange}
                  name="emailReg"
                  placeholder=""
                  className="profile__email"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
              </div>

            </div>
        

              <div className="profile__framer">
                <NavLink to="/" className="profile__redirect">
                  Редактировать
                </NavLink>

                <NavLink to="/" className="profile__out">
                  Выйти из аккаунта
                </NavLink>
              </div>
            </form>

       </div>
      </section>
    </>
  );
}

export default Profile;