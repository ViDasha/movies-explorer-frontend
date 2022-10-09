import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="searchform">
      <form className="searchform__form">
        <input
          name="movie"
          id="movie"
          type="text"
          placeholder="Фильм"
          className="searchform__input"
          required>
        </input>
        <button className="searchform__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
)}

export default SearchForm;