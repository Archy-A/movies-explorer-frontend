import React from "react";

function Preloader(props) {

  let messageError = "Ничего не найдено";
  if (props.backendError) {
     messageError = props.backendError;
  }

  console.log(' props.cards.length = ', props.cardsNumber)
  console.log(' props.preloaderState = ', props.preloaderState)

  return (
    <section className="preloader">
        <div className={`preloader__spinner ${props.preloaderState === false ? "preloader__spinner-hidden" : ""} } `}></div>
        <button 
           className={
            `preloader__button ${props.cardsNumber >= props.allCards.length  ? "preloader__button-hidden" : ""} } `
            //  "preloader__button preloader__button-hidden"
            }
           onClick={props.showMore}
           >
            Ещё
        </button>

        <div 
          className={`preloader_notfound ${props.preloaderState === true || props.cardsNumber > 0 ? "" : "preloader_notfound-show"} } `}
          // className="preloader_notfound preloader_notfound-show "
          >
            {messageError}
        </div>

    </section>
  );
}

export default Preloader;
