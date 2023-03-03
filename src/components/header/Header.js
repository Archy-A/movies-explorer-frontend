import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

function Header({ loggedIn, email, setLoggedIn }) {
 
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo"></div>
        <div className="header__container">
          <Switch>
            <Route exact path="/">
              <Link className="header__signup" to="/sign-up">
                Регистрация
              </Link>
              <button
                className={`header__login ${loggedIn ? "" : "element-hidden"} `}
              >
                Войти
              </button>
            </Route>
          </Switch>
        </div>
      </div>
    </header>
  );
}

export default Header;
