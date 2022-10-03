import React from "react";
import success from '../../images/success_icon.svg';
import unsuccess from '../../images/unsuccess_icon.svg';


function InfoTooltip(props) {
  return(
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
        <div className="popup__overlay"></div>
        <div className="popup__container popup__container_type_info">
        <button onClick={props.onClose} type="button" aria-label="Закрыть" name="close" className="popup__close"></button>
        <img className="popup__icon" src={props.isSuccess ? success : unsuccess} alt="Успех или не успех"/>
        <h2 className="popup__title">{props.message}</h2>
        </div>
    </div>
  );
}

export default InfoTooltip;