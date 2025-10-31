import React, { useState } from "react";
import axios from "axios";

import Info from "../Info";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({
  onCartClose,
  onRemove,
  items = [],
  setCartItems,
  opened,
}) => {
  const [isOrderComplete, setOrderIsComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const totalPrice = items.reduce((sum, obj) => obj.price + sum, 0);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://68f3cdb9fd14a9fcc429e864.mockapi.io/orders",
        { items: items }
      );

      setOrderId(data.id);
      setOrderIsComplete(true);
      setCartItems([]);

      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        await axios.delete(
          "https://68efc43fb06cc802829eaaa4.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Не удалось создать заказ");
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onCartClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="remove"
            height={50}
            width={50}
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj, index) => {
                return (
                  <div
                    key={index}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      className="cartItemImg"
                      style={{
                        backgroundImage: `url(${obj.src})`,
                      }}
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.name}</p>
                      <b>{obj.price}</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{Math.round(totalPrice - (totalPrice / 100) * 5)} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
            desciption={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте товары в корзину"
            }
            image={isOrderComplete ? "/img/cartOk.svg" : "/img/cart.svg"}
            onCartClose={onCartClose}
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
