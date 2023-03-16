import React from "react";
import { useLocation, Route, Switch, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Header({ loggedIn, email, setLoggedIn }) {

  const location = useLocation();

  function getCurrentURL () {
    return window.location.pathname
  }
  const url = getCurrentURL()
  const [currentPath, setCurrentPath] = useState(url);

  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    setCurrentPath(url)
  }, [url, currentPath, location]);

  return (
    <Switch>
     <Route exact path={["/", "/profile", "/movies", "/saved-movies"]}>
        <header className={`header ${currentPath === '/' ? "" : "header_colored"} `}>
          <div className={`header__wrapper ${currentPath === '/' ? "" : "header__wrapper_colored" } `}>

            <Route exact path="/">

              <div className="header__logo">
              </div> 



              <div className="header__container">
                <Link className="header__signup" to="/signup">
                  Регистрация
                </Link>
                <button
                  className={`header__login ${loggedIn ? "" : "element-hidden"} `}
                >
                  Войти
                </button>
              </div>
            </Route>

            <Route exact path={["/profile", "/movies", "/saved-movies"]}>

              <div className="header__logo">
              <Link className="header__films_saved" to="/">
                 Главнаяerfere
              </Link>
              </div>


                <Link className="header__films" to="/movies">
                  Фильмы
                </Link>

                <Link className="header__films_saved" to="/saved-movies">
                  Сохранённые фильмы
                </Link>

                <div className="header__container">
                  <Link className="header__profile" to="/profile">
                    Аккаунт
                    <div className="header__frame" >
                      <div className="header__icon" ></div>
                    </div>
                  </Link>
                </div> 

                {/* <div className={`header__nav_layered ${isActive ? "" : "header__open"}`}>
                  <div className={`header__nav ${isActive ? "" : "header__nav-opened"}`}> */}

                <div className="header__nav_layered header__open">
                  <div className="header__nav header__nav-opened">

                    <div className="burger__container">

                      <div className="burger__frame">
                        <Link className="burger__main">Главная</Link>
                        <Link className="burger__films">Фильмы</Link>
                        <Link className="burger__saved">Сохранённые фильмы</Link>
                      </div>

                      <div className="burger__account">
                        <Link className="burger__profile" to="/profile">
                          Аккаунт
                        </Link>
                        <div className="burger__frame2" >
                          <div className="burger__icon" ></div>
                        </div>
                      </div> 

                    </div>

                  </div>
                </div>

                <div className={`burger ${isActive ? "" : "active"}`} onClick={handleToggle}>
                  <span></span>
                </div>

            </Route>
     

      </div>
    </header>
    </Route>
    </Switch>
  );
}

export default Header;

//////////////////////////////////////////////////
  // <Route exact path="/">
  // <div className={`header__email ${loggedIn ? "" : "element-hidden"} `}>{email}</div>
  //   <button
  //     onClick={handleSubmmit}
  //     className={`header__exit ${loggedIn ? "" : "element-hidden"} `}
  //   >
  //     Выйти
  //   </button>
  // </Route>

  // <Route exact path="/sign-in">
  //   <Link className="header__login" to="/sign-up">
  //     Регистрация
  //   </Link>
  // </Route>

  // <Route exact path="/sign-up">
  //   <Link className="header__login" to="/sign-in">
  //     Войти
  //   </Link>
  // </Route>


