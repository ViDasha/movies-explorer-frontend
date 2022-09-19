import React from "react";

function AboutProject() {
  return(
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__description">
        <div className="about__description-item">
          <h2 className="about__description-title">Дипломный проект включал 5 этапов</h2>
          <p className="about__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about__description-item">
          <h2 className="about__description-title">На выполнение диплома ушло 5 недель</h2>
          <p className="about__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about__duration">
        <div className="about__duration-item">
            <p className="about__duration-time about__duration-time_green">1 неделя</p>
            <p className="about__duration-tech">Back-end</p>
        </div>
        <div className="about__duration-item">
            <p className="about__duration-time about__duration-time_white">4 недели</p>
            <p className="about__duration-tech">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;