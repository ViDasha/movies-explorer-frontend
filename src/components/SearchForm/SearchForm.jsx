import React, { useState } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {errorMessages} from "../../utils/constants";

function SearchForm({
  onChangeInput,
  onSubmit,
  inputValue,
  toggleCheckbox,
  checkbox,
  setInfoTooltipOpen,
  setIsSuccess,
  setMessage,
}) {
  const [formSubmission, setFormSubmission] = useState(false);

  function handleSubmit(e) {
    setFormSubmission(true);
    e.preventDefault();
    if (!inputValue) {
      setInfoTooltipOpen(true);
      setIsSuccess(false);
      setMessage(errorMessages.enterKeyword);
      setFormSubmission(false);
      return;
    } 
    onSubmit();
    setFormSubmission(false);
  }

  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit} noValidate>
        <input
          name="movie"
          id="movie"
          placeholder="Фильм"
          className="searchform__input"
          required
          onChange={onChangeInput}
          value={inputValue || ''}
          disabled={formSubmission}
        >
        </input>
        <button className="searchform__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox toggleCheckbox={toggleCheckbox} checkbox={checkbox}/>
    </section>
)}

export default SearchForm;