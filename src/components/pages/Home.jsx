import React from "react";
import Card from "../Card";

const Home = ({
  items,
  cartItems,
  searchValue,
  onChangeInput,
  onAddToCart,
  onAddToFavorite,
  setSearchValue,
  isLoading,
}) => {
  // Фильтруем товары по поиску
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeInput}
            value={searchValue}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
        </div>
      </div>

      <div className="sneakers d-flex flex-wrap">
        {(isLoading ? Array.from({ length: 8 }) : filteredItems).map(
          (item, index) => {
            // При загрузке рендерим заглушки (если isLoading)
            if (isLoading) {
              return <Card key={index} loading={true} />;
            }

            // Безопасная проверка: возможно в cartItems нет parentId (старые записи)
            const isAdded = cartItems.some(
              (cartItem) =>
                Number(cartItem.parentId ?? cartItem.id) === Number(item.id)
            );

            return (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                src={item.src}
                onPluss={onAddToCart} // Card ожидает prop onPluss
                onFavorite={onAddToFavorite}
                added={isAdded}
                loading={false}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default Home;
