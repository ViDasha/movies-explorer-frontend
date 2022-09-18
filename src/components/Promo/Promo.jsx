import React from "react";
import image from "../../images/text__COLOR_landing-logo.svg"

function Promo() {
  return (
    <section className="promo">
      <div className="promo__section">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__img" src={image} alt="Вихрь"/>
      </div>
    </section>
  );
}

export default Promo;