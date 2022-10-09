import { React, useState } from 'react';

function FilterCheckbox() {
  const [checkbox, setActiveCheckbox] = useState(false);

  function toggleCheckbox(e) {
    setActiveCheckbox(!checkbox);
  }

  return (
    <div className="filtercheckbox">
      <button className={`${checkbox ? "filtercheckbox__button" : "filtercheckbox__button_active"}`} type="button" onClick={toggleCheckbox}></button>
      <p className="filtercheckbox__name">Короткометражки</p>
    </div>
)}

export default FilterCheckbox;