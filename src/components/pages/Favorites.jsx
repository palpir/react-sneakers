import React from "react";
import Card from "../Card";

const Favorites = ({ items, onAddToFavorite }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="items d-flex">
        {items.map((item, index) => (
          <div key={index}>
            <Card favorited={true} onFavorite={onAddToFavorite} {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
