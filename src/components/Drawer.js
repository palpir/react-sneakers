import React from "react";

const Drawer = () => {
  return (
    <div style={{ display: "none" }} className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
          />
        </h2>

        <div className="items">
          <div className="cartItem d-flex align-center mb-20">
            <div
              className="cartItemImg"
              style={{
                backgroundImage: "url(/img/sneakers/1.png)",
              }}
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Кроссовки</p>
              <b>1000 руб</b>
            </div>
            <img className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
          </div>

          <div className="cartTotalBlock">
            <ul>
              <li>
                <span>Итого:</span>
                <div></div>
                <b>800 руб.</b>
              </li>
              <li>
                <span>Налог 5%:</span>
                <div></div>
                <b>1000 руб.</b>
              </li>
            </ul>
            <button className="greenButton">
              Оформить заказ
              <img src="/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
