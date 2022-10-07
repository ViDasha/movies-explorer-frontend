import React from 'react';

function FilterCheckbox(props) {
  return (
    <div className="filtercheckbox">
      <button className={`${props.checkbox ? "filtercheckbox__button" : "filtercheckbox__button_active"}`} type="button" onClick={props.toggleCheckbox}></button>
      <p className="filtercheckbox__name">Короткометражки</p>
    </div>
)}

export default FilterCheckbox;