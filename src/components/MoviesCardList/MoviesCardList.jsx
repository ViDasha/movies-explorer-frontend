import React from 'react';
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  return (
    <section className="moviescardlist">
      <div className="moviescardlist__grid">
        {[...Array(10)].map((x, i) =>
          <MoviesCard key={i} />
        )}
      </div>
      <Route path="/movies">
        <button className="moviescardlist__button" type="button">Ещё</button>
      </Route>
    </section>
)}

export default MoviesCardList;