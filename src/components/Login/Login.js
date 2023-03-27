import React, { useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";

function Login(props) {

  const inputEmailRef = useRef();
  const inputPassRef = useRef();

  let history = useHistory()

  // function mySubmitFunction(e) {
  //   e.preventDefault();
  //   return false;
  // }

  function handleGoMain() {
    history.push("/");
  }

  // console.log('props.checkPass = ', props.checkPass)
  // console.log('props.checkEmail = ', props.checkEmail)

  let buttonDisable = true;
  function setbuttonDisable() {
    if (props.checkPass === true && props.checkEmail === true ) {
      return buttonDisable = false;
    } else {
      return buttonDisable = true;
    }
  }

  console.log('buttonDisable = ', buttonDisable)

  return (
    <>
      <section className="login">
        <div className="login__wrapper">

       <div className="login_title">
           <div className="login__logo" onClick={handleGoMain}></div>
           <h1 className="login__welcome">Рады видеть!</h1>
        </div>

        <form
              onSubmit={props.handleLogin}
              className="login_form"
              method="post"
              name="login"
            >

              <p className="login__title">E-mail</p>

              <div className="login__box">
                <input
                  ref={inputEmailRef}
                  id="login__email"
                  type="text"
                  value={
                    inputEmailRef.current
                      ? props.emailAndPassSetterLoginValues[inputEmailRef.current.name] ||
                        ""
                      : ""
                  }
                  onChange={props.handleOnChange}
                  name="emailLogin"
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
                  ref={inputPassRef}
                  id="login__password"
                  type="password"
                  value={
                    inputPassRef.current
                      ? props.emailAndPassSetterLoginValues[inputPassRef.current.name] ||
                        ""
                      : ""
                  }
                  onChange={props.handleOnChange}
                  name="passwordLogin"
                  placeholder=""
                  className="register__password"
                  minLength="2"
                  maxLength="200"
                  required
                ></input>
                <div className="login__line" />
              </div>

              <p className="profile__error">{props.registerError}</p>
              
              <button
                type="submit"
                className="login__register"
                // disabled={setbuttonDisable()}
                >
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