import React, { useContext } from "react";

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

          <div className="proj__column">

            <p className="proj__about">О проекте</p>
            <div className="proj__under"></div>

            <div className="proj__plan">
              <div className="proj__column">
                <p className="proj__diplom">Дипломный проект включал 5 этапов</p>
                <p className="proj__details">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
              </div>
              <div className="proj__column">
                <p className="proj__diplom">На выполнение диплома ушло 5 недель</p>
                <p className="proj__details">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
              </div>
            </div>

            <div className="proj__ribbon">
                <p className="proj__1nedelja">1 неделя</p>
                <p className="proj__4nedeli">4 недели</p>
                <p className="proj__back">Back-end</p>
                <p className="proj__front">Front-end</p>  
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}

export default Main;
