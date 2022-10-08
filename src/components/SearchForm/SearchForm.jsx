import React from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  onChangeInput,
  onSubmit,
  inputValue,
  toggleCheckbox,
  checkbox,
}) {
  //const [inputSearch, setInputSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit();
  }

/*
  useEffect(() => {
    setInputSearch(props.inputValue);
  }, [props.inputValue]);
*/
  return (
    <section className="searchform">
      <form className="searchform__form" onSubmit={handleSubmit}>
        <input
          name="movie"
          id="movie"
          type="text"
          placeholder="Фильм"
          className="searchform__input"
          required
          onChange={onChangeInput}
          value={inputValue || ''}
        >
        </input>
        <button className="searchform__button" type="submit">Найти</button>
      </form>
      <FilterCheckbox toggleCheckbox={toggleCheckbox} checkbox={checkbox}/>
    </section>
)}

export default SearchForm;