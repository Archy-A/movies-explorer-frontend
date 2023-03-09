import React from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

function Footer({ loggedIn, email, setLoggedIn }) {
 
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <p className="footer__yandex">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__under"></div>
        <div className="footer__container">
          <p className="footer__year">&#169; 2020</p>
          <div className="footer__column">
            <p className="footer__praktikum">Яндекс.Практикум</p>
            <a className="footer__github" href="https://github.com/Archy-A/">Github</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
