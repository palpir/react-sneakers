import React from "react";

const Card = () => {
  return (
    <>
      <div className="card">
        <div className="favorite">
          <img src="/img/unliked.svg" alt="unliked" />
        </div>
        <img
          width={133}
          height={122}
          src="/img/sneakers/1.png"
          alt="Sneakers"
        />
        <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена</span>
            <b>12 000 руб</b>
          </div>

          <button className="button">
            <img src="/img/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
