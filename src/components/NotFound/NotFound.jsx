import React from 'react';
import { useHistory } from 'react-router-dom';

function NotFound() {

  const history = useHistory();

  return (
    <div className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__description">Страница не найдена</p>
      <button onClick={history.goBack} className="notfound__back" type="button">Назад</button>
    </div>
  );
}

export default NotFound;