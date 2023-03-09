import React, { useContext } from "react";
import { useHistory, Route, Switch, Link } from "react-router-dom";

function Main({
  onEditProfile,
}) {

  return (
    <main className="landing">

      <div className="top">
        <div className="top__wrapper">
          <div className="top__container">
            <div className="top__colum1">
              <h1 className="top__title">Учебный проект студента факультета                  Веб-разработки.</h1>
              <p className="top__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            </div>
            <div className="top__pic"></div>
          </div>
            <button className="top__learn">
                  Узнать больше
            </button>
        </div>
      </div>

      <div className="proj">
        <div className="proj__wrapper">
          <div className="proj__colum">
            <p className="proj__about">О проекте</p>
            <div className="proj__under"></div>
            <div className="proj__plan">
              <div className="proj__column">
                <p className="proj__diplom">Дипломный проект включал 5 этапов</p>
                <p className="proj__detailed">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </div>
              <div className="proj__column">
                <p className="proj__consume">На выполнение диплома ушло 5 недель</p>
                <p className="proj__details">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
            </div>
            <table className="proj__ribbon">
                <tr className="proj__1nedelja">1 неделя</tr>
                <tr className="proj__4nedeli">4 недели</tr>
                <tr className="proj__back">Back-end</tr>
                <tr className="proj__front">Front-end</tr>  
            </table>
          </div>
        </div>
      </div>

    <div className="tech">
      <div className="tech__wrapper">
        <div className="tech__column">
          <p className="tech__about">Технологии</p>
          <div className="tech__under"></div>
        </div>
        <div className="tech__description">
          <div className="tech__7techs">7 технологий</div>
          <div className="tech__details">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</div>
          <table className="tech__icons">
            <tr className="tech__elements">HTML</tr> 
            <tr className="tech__elements">CSS</tr>
            <tr className="tech__elements">JS </tr>
            <tr className="tech__elements">React </tr>
            <tr className="tech__elements">Git</tr> 
            <tr className="tech__elements">Express.js</tr> 
            <tr className="tech__elements">mongoDB</tr>
          </table>
        </div>
      </div>
    </div>

    <div className="portfolio">
      <div className="portfolio__wrapper">

        <div className="portfolio__student">Студент</div>
        <div className="under"></div>

        <div className="portfolio__container">
          <div className="portfolio__column1">
            <div className="portfolio__group">
              <div className="portfolio__name">Артур</div>
              <div className="portfolio__speciality">Full-stack разработчик, 36 лет</div>
              <div className="portfolio__description">Я родился в Тюмени, закончил факультет информационных технологий ТюмГНГУ. 
                Я люблю слушать музыку, а ещё увлекаюсь горными лыжами и командными видами спорта (футбол). Начал кодить с университета, но была пауза 
                из-за работы в сфере геофизики. Работаю в компании «Geomage» - разработка ПО для обработки сейсмических данных.</div>
            </div>  
            <a className="portfolio__github" href="https://github.com/Archy-A/">Github</a>
          </div>
          <div className="portfolio__column2">
            <div className="portfolio__pic"></div>
          </div>
        </div>

        <div className="portfolio__portfolio">Портфолио</div>

        <div className="portfolio__container2">
            <a className="portfolio__sites" href="https://github.com/Archy-A/">Статичный сайт</a>
            <div className="portfolio__arrow"></div> 
        </div>
        <div className="under_white"></div> 

        <div className="portfolio__container2">
            <a className="portfolio__sites" href="https://github.com/Archy-A/">Адаптивный сайт</a>
            <div className="portfolio__arrow"></div> 
        </div>
        <div className="under_white"></div> 

        <div className="portfolio__container2">
            <a className="portfolio__sites" href="https://github.com/Archy-A/">Одностраничное приложение</a>
            <div className="portfolio__arrow"></div> 
        </div>

      </div>
    </div>

    </main>
  );
}

export default Main;
