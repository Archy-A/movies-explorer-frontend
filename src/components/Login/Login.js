import React, { useRef, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";

function Login(props) {

  const inputEmailRef = useRef();
  const inputPassRef = useRef();
  let history = useHistory()

  function handleGoMain() {
    history.push("/");
  }

  props.setRegisterError("")

  // useEffect(() => {
  //   console.log(' useEffect props.checkPassLog = ', props.checkPassLog)
  // }, [props.checkPassLog]);

  let buttonDisable1 = true;

  function setbuttonDisable1() {
    if (props.checkPassLog === true && props.checkEmailLog === true ) {
      return buttonDisable1 = false;
    } else {
      return buttonDisable1 = true;
    }
  }

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

              <p className="profile__error">{props.loginError}</p>
              
              <button
                type="submit"
                className="login__register"
                disabled={setbuttonDisable1()}
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