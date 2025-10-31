import React, { useEffect, useState } from "react";
import Card from "../Card";
import axios from "axios";

const Orders = ({ onAddToCart, onAddToFavorite }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      (async () => {
        const { data } = await axios.get(
          "https://68f3cdb9fd14a9fcc429e864.mockapi.io/orders"
        );
        setOrders(data.map((obj) => obj.items).flat());
        setIsLoading(false);
      })();
    } catch (error) {
      alert("Ошибка получения заказов " + error);
      console.log(error);
    }
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="items d-flex">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <div key={index}>
            <Card
              key={item?.id || index}
              //onPluss={(obj) => onAddToCart(obj)}
              //onFavorite={(obj) => onAddToFavorite(obj)}
              loading={isLoading}
              {...(item || {})} // если item undefined — передаём пустой объект
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
