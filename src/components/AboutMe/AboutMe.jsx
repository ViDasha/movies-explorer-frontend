import React from "react";
import avatar from "../../images/student_avatar.JPG";

function AboutMe() {
  return(
    <section className="aboutme">
      <h2 className="aboutme__title">Студент</h2>
      <div className="aboutme__info">
        <div className="aboutme__description">
          <h3 className="aboutme__name">Дарья</h3>
          <h4 className="aboutme__job">Фронтенд-разработчик, 27 лет</h4>
          <p className="aboutme__text">Я родилаcь в Ярославле и в 2013 году переехала в Москву. Закончила МГУ, факультет Вычислительной математики и информатики.
           Изначально работала C# разработчиком, но сейчас руковожу командой разработки приложения в банке. Веб-программирование изучаю для себя, и возможно переквалифицируюсь на смежную работу или полностью веб.</p>
          <a href="https://github.com/ViDasha" className="aboutme__link" target="blank">GitHub</a>
        </div>
        <img className="aboutme__avatar" src={avatar} alt="Фото автора"/>
      </div>
    </section>
  );
}

export default AboutMe;