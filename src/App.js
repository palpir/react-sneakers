import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Orders from "./components/pages/Orders";

const AppContext = createContext({});

function App() {
  //кроссовки храним в useState
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isDrawer, setIsDrawer] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://68efc43fb06cc802829eaaa4.mockapi.io/cart"
        );

        const favoritesResponse = await axios.get(
          "https://68f3cdb9fd14a9fcc429e864.mockapi.io/like"
        );

        const itemsResponse = await axios.get(
          "https://68efc43fb06cc802829eaaa4.mockapi.io/items"
        );

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        await axios.delete(
          `https://68efc43fb06cc802829eaaa4.mockapi.io/cart/${findItem.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://68efc43fb06cc802829eaaa4.mockapi.io/cart",
          { ...obj, parentId: obj.id }
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://68efc43fb06cc802829eaaa4.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      // Ищем, есть ли уже этот товар в фаворитах (по parentId или name)
      const existing = favorites.find(
        (favObj) => favObj.id === obj.id || favObj.name === obj.name
      );

      if (existing) {
        // Ждём завершения запроса, чтобы не было коллизий при частых кликах
        await axios.delete(
          `https://68f3cdb9fd14a9fcc429e864.mockapi.io/like/${existing.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://68f3cdb9fd14a9fcc429e864.mockapi.io/like",
          { ...obj, parentId: obj.id } // сохраняем оригинальный id
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Ошибка при добавлении/удалении избранного:", error);
    }
  };
  return (
    <AppContext.Provider value={{ cartItems, favorites, items }}>
      <div className="wrapper clear">
        <Header onCart={() => setIsDrawer(!isDrawer)} cartItems={cartItems} />
        <Drawer
          items={cartItems}
          onCartClose={() => setIsDrawer(!isDrawer)}
          onRemove={onRemoveItem}
          setCartItems={setCartItems}
          cartItems={cartItems}
          opened={isDrawer}
        />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeInput={onChangeInput}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                setSearchValue={setSearchValue}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
            }
          />
          <Route
            path="/orders"
            exact
            element={
              <Orders
                items={favorites}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
              />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
