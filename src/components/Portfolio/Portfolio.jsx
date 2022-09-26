import React from "react";
import arrow from "../../images/arrow.svg";

function Portfolio() {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li>
          <a
            href="https://github.com/ViDasha/how-to-learn"
              className="portfolio__item"
              target='blank'>
              <p className="portfolio__link">Статичный сайт</p>
              <img className="portfolio__image" src={arrow} alt="Стрелка-ссылка"></img>
          </a>
        </li>
        <div className='portfolio__border' />
        <li>
          <a
            href="https://github.com/ViDasha/russian-travel"
            className="portfolio__item"
            target='blank'>
            <p className="portfolio__link">Адаптивный сайт</p>
            <img className="portfolio__image" src={arrow} alt="Стрелка-ссылка"></img>
          </a>
        </li>
        <div className='portfolio__border' />
        <li>
          <a
            href="https://github.com/ViDasha/react-mesto-api-full"
            className="portfolio__item"
            target='blank'>
            <p className="portfolio__link">Одностраничное приложение</p>
            <img className="portfolio__image" src={arrow} alt="Стрелка-ссылка"></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;