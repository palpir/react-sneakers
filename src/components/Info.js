import React from "react";

const Info = ({ title, desciption, image, onCartClose }) => {
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        height={120}
        src={image}
        alt="status img cart"
      />
      <h2>{title}</h2>
      <p className="opacity-6">{desciption}</p>
      <button onClick={onCartClose} className="greenButton">
        <img src="/img/arrow.svg" alt="arrow" /> Вернуться назад
      </button>
    </div>
  );
};

export default Info;
