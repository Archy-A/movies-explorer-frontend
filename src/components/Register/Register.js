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
    <main>
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

              <input
                id="register__email"
                type="text"
                value="Виталий"
                // onChange={props.handleOnChange}
                name="emailReg"
                placeholder="Name"
                className="register__name"
                minLength="2"
                maxLength="40"
                required
              ></input>

              <div className="register__line" />

              <p className="register__title">E-mail</p>

              <input
                id="register__email"
                type="text"
                value="11111"
                // onChange={props.handleOnChange}
                name="emailReg"
                placeholder="Email"
                className="register__email"
                minLength="2"
                maxLength="40"
                required
              ></input>

              <p className="register__title">Пароль</p>

              <input
                id="login__password"
                type="password"
                value= "pochta@yandex.ru"
                onChange={onSubmit}
                name="passwordReg"
                placeholder="Password"
                className="register__password"
                minLength="2"
                maxLength="200"
                required
              ></input>

              <div className="register__line" />

              
              <button type="submit" className="register__register">
                Зарегистрироваться
              </button>

              <div className="register__framer">
                <NavLink to="/sign-in" className="register__redirect">
                  Уже зарегистрированы? Войти
                </NavLink>
              </div>
            </form>

       </div>
      </section>
    </main>
  );
}

export default Register;