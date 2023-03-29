import React, {useState, useEffect} from "react";

function Preloader(props) {

  const [inited, setInited] = useState(false);

  useEffect(() => {
    if (props.preloaderState) {
      setInited(true);
    }
  }, [props.preloaderState]);

  let messageError = "";
  if (props.backendError) {
    messageError = props.backendError;
  } else if (props.cardsNumber === 0) {
    messageError = "Ничего не найдено";
  }

  return (
    <section className="preloader">
        <div className={`preloader__spinner ${props.preloaderState === false ? "preloader__spinner-hidden" : ""} } `}></div>
        <button 
           className={
            // "preloader__button"
            `preloader__button ${props.cardsNumber >= props.allCardsNumber  ? "preloader__button-hidden" : ""} } `
            }
           onClick={props.showMore}
           >
            Ещё
        </button>

        <div 
          className={`preloader_notfound ${props.preloaderState === true || props.cardsNumber > 0 ? "" : "preloader_notfound-show"} } `}
          >
            {inited ? messageError : ""}
        </div>

    </section>
  );
}

export default Preloader;
