import React from "react";

function Preloader(props) {

  return (
    <section className="preloader">
        <div className={`preloader__spinner ${props.preloaderState === false ? "preloader__spinner-hidden" : ""} } `}></div>
        <button 
           className="preloader__button"
           onClick={props.showMore}
           >
            Ещё
        </button>
    </section>
  );
}

export default Preloader;
