import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function Login({
  onEditProfile,
}) {

  function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }

  return (
    <>
      <section className="login">
        <div className="login__wrapper">

       <div className="login_title">
           <div className="login__logo"></div>
           <h1 className="login__welcome">Рады видеть!</h1>
        </div>

        <form
              onSubmit={mySubmitFunction}
              className="login_form"
              method="post"
              name="login"
            >

              <p className="login__title">E-mail</p>

              <div className="login__box">
                <input
                  id="login__email"
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
                <div className="login__line" />
              </div>

              <p className="login__title">Пароль</p>

              <div className="login__box">
                <input
                  id="login__password"
                  type="password"
                  //value= "pochta@yandex.ru"
                  // onChange={onSubmit}
                  name="passwordReg"
                  placeholder=""
                  className="register__password"
                  minLength="2"
                  maxLength="200"
                  required
                ></input>
                <div className="login__line" />
              </div>
              
              <button type="submit" className="login__register">
                <p className="login__label">
                  Войти
                </p>
              </button>

              <div className="login__framer">
                 Еще не зарегистрированы? 
                <NavLink to="/signup" className="login__redirect">
                  Регистрация
                </NavLink>
              </div>
            </form>

       </div>
      </section>
    </>
  );
}

export default Login;