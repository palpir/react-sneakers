import { Link } from "react-router-dom";
import React from "react";

const Header = ({ onCart, cartItems }) => {
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);
  return (
    <div>
      <header className="d-flex justify-between align-center">
        <Link to="/">
          <div className="d-flex align-center">
            <img width={40} height={40} src="img/logo.png" alt="Логотип" />
            <div>
              <h3 className="text-uppercase">REACT SNEAKERS</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="d-flex">
          <li className="mr-30 cu-p" onClick={onCart}>
            <img width={18} height={18} src="img/cart.png" alt="Корзина" />
            <span>{totalPrice} руб</span>
          </li>
          <li className="mr-20 cu-p">
            <Link to="/favorites">
              <img width={18} height={18} src="img/heart.svg" alt="Закладки" />
              <span>Закладки </span>
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="img/user.png" alt="Заказы" />
              <span>Заказы </span>
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
