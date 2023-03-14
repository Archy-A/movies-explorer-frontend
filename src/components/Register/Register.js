import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function Register({
  onEditProfile,
}) {

  function onSubmit() {
    console.log('ssssss')
  }

  return (
    <>
      <section className="register">
        <div className="register__wrapper">

       <div className="register_title">
           <div className="register__logo"></div>
           <h1 className="register__welcome">Добро пожаловать!</h1>
        </div>

        <form
              onSubmit={onSubmit}
              className="register_form"
              method="post"
              name="login"
            >
              <p className="register__title">Имя</p>

              <div className="register__box">
                <input
                  id="register__email"
                  type="text"
                  //value="Виталий"
                  // onChange={props.handleOnChange}
                  name="emailReg"
                  placeholder=""
                  className="register__name"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
                <div className="register__line" />
              </div>

              <p className="register__title">E-mail</p>

              <div className="register__box">
                <input
                  id="register__email"
                  type="text"
                  //value="pochta@yandex.ru"
                  // onChange={props.handleOnChange}
                  name="emailReg"
                  placeholder=""
                  className="register__email"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
                <div className="register__line" />
              </div>

              <p className="register__title">Пароль</p>

              <div className="register__box">
                <input
                  id="login__password"
                  type="password"
                  //value= "pochta@yandex.ru"
                  onChange={onSubmit}
                  name="passwordReg"
                  placeholder=""
                  className="register__password"
                  minLength="2"
                  maxLength="200"
                  required
                ></input>
                <div className="register__line" />
              </div>
              
              <button type="submit" className="register__register">
                <p className="register__label">
                  Зарегистрироваться
                </p>
              </button>

              <div className="register__framer">
                 Уже зарегистрированы? 
                <NavLink to="/sign-in" className="register__redirect">
                  Войти
                </NavLink>
              </div>
            </form>

       </div>
      </section>
    </>
  );
}

export default Register;