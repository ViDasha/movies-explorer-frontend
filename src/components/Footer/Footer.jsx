import React from "react";

function Footer() {
  return(
    <section className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__info">
        <p className="footer__year">© 2022</p>
        <ul className="footer__list">
          <li className="footer__item">
            <a
              href="https://practicum.yandex.ru/"
              className="footer__link"
              target="blank">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://github.com/"
              className="footer__link"
              target="blank">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;