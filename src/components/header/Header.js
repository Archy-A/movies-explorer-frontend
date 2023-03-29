import React from "react";
import { useLocation, Route, Switch, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

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

  let history = useHistory()

  function handleLogoGoMain() {
    history.push("/");
  }

  function handleBurgerGoSaved() {
    history.push("/saved-movies");
    handleToggle();
  }

  function handleBurgerGoFilms() {
    history.push("/movies");
    handleToggle();
  }

  function handleBurgerGoProfile() {
    history.push("/profile");
    handleToggle();
  }

  function handleBurgerGoMain() {
    history.push("/");
    handleToggle();
  }

  function handleHeaderGoLogin() {
    history.push("/signin");
  }

  useEffect(() => {
    setCurrentPath(url);
    document.body.style.overflow = !isActive? "hidden" : "scroll";
  }, [url, currentPath, location, isActive]);

  return (
    <Switch>
     <Route exact path={["/", "/profile", "/movies", "/saved-movies"]}>
        <header className={`header ${currentPath === '/' ? "" : "header_colored"} `}>
          <div className={`header__wrapper ${currentPath === '/' ? "" : "header__wrapper_colored" } `}>

            <Route exact path="/">

              <div className="header__logo" onClick={handleLogoGoMain}>
              </div> 

              <Link className={`header__films ${loggedIn ? "" : "header__login-hidden"} `} to="/movies">
                  Фильмы
              </Link>

              <Link className={`header__films_saved ${loggedIn ? "" : "header__login-hidden"} `} to="/saved-movies">
                  Сохранённые фильмы
              </Link>

              <div className={`header__container ${loggedIn ? "" : "header__login-hidden"} `}>
                <Link className="header__profile" to="/profile">
                  Аккаунт
                  <div className="header__frame" >
                    <div className="header__icon" ></div>
                  </div>
                </Link>
              </div> 

              <div className={`header__container ${loggedIn ? "header__login-hidden" : ""} `}>
                <Link className="header__signup" to="/signup">
                  Регистрация
                </Link>
                <button
                  className={`header__login ${loggedIn ? "header__login-hidden" : ""} `}
                  onClick={handleHeaderGoLogin}
                >
                  Войти
                </button>
              </div>

              <section className={`header__nav_layered ${isActive ? "" : "header__open"}`}>
                <div className={`header__nav ${isActive ? "" : "header__nav-opened"}`}>

                    <div className="burger__container">

                      <div className="burger__frame">
                        <button className={`burger__main ${currentPath === '/' ? "burger__main_active" : ""} `} onClick={handleBurgerGoMain}>Главная</button>
                        <button className={`burger__films ${currentPath === '/movies' ? "burger__films_active" : ""} `} onClick={handleBurgerGoFilms}>Фильмы</button>
                        <button className={`burger__saved ${currentPath === '/saved-movies' ? "burger__saved_active" : ""} `} onClick={handleBurgerGoSaved}>Сохранённые фильмы</button>
                      </div>

                      <div className="burger__account">
                        <button className={`burger__profile ${currentPath === '/profile' ? "burger__profile_active" : ""} `} onClick={handleBurgerGoProfile}>Аккаунт</button>
                        <div className="burger__frame2" >
                          <div className="burger__icon" onClick={handleBurgerGoProfile}></div>
                        </div>
                      </div> 

                    </div>

                  </div>
                </section>

                <div
                  className={`burger ${isActive ? "" : "active"} ${loggedIn ? "" : "burger-hidden"}`}
                  onClick={handleToggle}
                  >
                   <span>
                   </span>
                </div>

            </Route>

{/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}

            <Route exact path={["/profile", "/movies", "/saved-movies"]}>

              <div className="header__logo" onClick={handleLogoGoMain}>
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

              <section className={`header__nav_layered ${isActive ? "" : "header__open"}`}>
                <div className={`header__nav ${isActive ? "" : "header__nav-opened"}`}>

                {/* <div className="header__nav_layered header__open"> */}
                  {/* <div className="header__nav header__nav-opened"> */}

                    <div className="burger__container">

                      <div className="burger__frame">
                        <button className={`burger__main ${currentPath === '/' ? "burger__main_active" : ""} `} onClick={handleBurgerGoMain}>Главная</button>
                        <button className={`burger__films ${currentPath === '/movies' ? "burger__films_active" : ""} `} onClick={handleBurgerGoFilms}>Фильмы</button>
                        <button className={`burger__saved ${currentPath === '/saved-movies' ? "burger__saved_active" : ""} `} onClick={handleBurgerGoSaved}>Сохранённые фильмы</button>
                      </div>

                      <div className="burger__account">
                        <button className={`burger__profile ${currentPath === '/profile' ? "burger__profile_active" : ""} `} onClick={handleBurgerGoProfile}>Аккаунт</button>
                        <div className="burger__frame2" >
                          <div className="burger__icon" onClick={handleBurgerGoProfile}></div>
                        </div>
                      </div> 

                    </div>

                  </div>
                </section>

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
