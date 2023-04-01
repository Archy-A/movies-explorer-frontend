import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Register(props) {
  
  let history = useHistory()

  function mySubmitFunction(e) {
    e.preventDefault();
    return false;
  }

  function handleGoMain() {
    history.push("/");
  }

  const inputNameRegRef = useRef();
  const inputEmailRegRef = useRef();
  const inputPassRegRef = useRef();

  let buttonDisable = true;
  function setbuttonDisable() {

    if (props.checkPass === true && props.checkName === true && props.checkEmail === true ) {
      return buttonDisable = false;
    } else {
      return buttonDisable = true;
    }
  }

  return (
    <>
      <section className="register">
        <div className="register__wrapper">

       <div className="register_title">
           <div className="register__logo" onClick={handleGoMain}></div>
           <h1 className="register__welcome">Добро пожаловать!</h1>
        </div>

        <form
              onSubmit={props.onRegister}
              className="register_form"
              method="post"
              name="login"
            >
              <p className="register__title">Имя</p>

              <div className="register__box">
                <input
                  ref={inputNameRegRef}
                  id="register__name"
                  type="text"
                  value={
                    inputNameRegRef.current
                      ? props.emailAndPassSetterRegValues[
                        inputNameRegRef.current.name
                        ] || ""
                      : ""
                  }
                  onChange={props.handleRegOnChange}
                  name="nameReg"
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
                  ref={inputEmailRegRef}
                  id="register__email"
                  value={
                    inputEmailRegRef.current
                      ? props.emailAndPassSetterRegValues[
                          inputEmailRegRef.current.name
                        ] || ""
                      : ""
                  }
                  onChange={props.handleRegOnChange}
                  name="emailReg"
                  placeholder=""
                  className="register__email"
                  type="text"
                  pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
                <div className="register__line" />
              </div>

              <p className="register__title">Пароль</p>

              <div className="register__box">
                <input
                  ref={inputPassRegRef}
                  id="login__password"
                  type="password"
                  value={
                    inputPassRegRef.current
                      ? props.emailAndPassSetterRegValues[inputPassRegRef.current.name] ||
                        ""
                      : ""
                  }
                  onChange={props.handleRegOnChange}
                  name="passwordReg"
                  placeholder=""
                  className="register__password"
                  minLength="2"
                  maxLength="200"
                  required
                ></input>
                <div className="register__line" />
              </div>

              <p className="profile__error">{props.registerError}</p>
              
              <button 
                   type="submit"
                   className="register__register"
                   disabled={setbuttonDisable()}
                   >
                      <p className="register__label">
                        Зарегистрироваться
                      </p>
              </button>

              <div className="register__framer">
                 Уже зарегистрированы? 
                <NavLink to="/signin" className="register__redirect">
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