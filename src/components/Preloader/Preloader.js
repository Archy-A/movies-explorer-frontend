import React from "react";

function Preloader(props) {

  // console.log(' props.allCards.length = ',props.allCards.length)
  // console.log(' props.cards.length = ', props.cards.length)

  return (
    <section className="preloader">
        <div className={`preloader__spinner ${props.preloaderState === false ? "preloader__spinner-hidden" : ""} } `}></div>
        <button 
           className={
            `preloader__button ${props.cards.length >= props.allCards.length  ? "preloader__button-hidden" : ""} } `
            //  "preloader__button preloader__button-hidden"
            }
           onClick={props.showMore}
           >
            Ещё
        </button>
    </section>
  );
}

export default Preloader;
