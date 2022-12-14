import React, { useState } from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);  
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
    
    const cartResponse = await axios.get('https://626ed032f75bcfbb35718e66.mockapi.io/cart');
    const favoritesResponse = await axios.get('https://626ed032f75bcfbb35718e66.mockapi.io/favorites');
    const itemsResponse = await axios.get('https://626ed032f75bcfbb35718e66.mockapi.io/items');

    setIsLoading(false);
    setCartItems(cartResponse.data);
    setFavorites(favoritesResponse.data);
    setItems(itemsResponse.data);
  }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {

      if (cartItems.find((el) => Number(el.id) === Number(obj.id))) {
        axios.delete(`https://626ed032f75bcfbb35718e66.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((el) => Number(el.id) !== Number(obj.id)));
      } else {
        axios.post('https://626ed032f75bcfbb35718e66.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://626ed032f75bcfbb35718e66.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
    try {
    if (favorites.find((objF) => Number(objF.id) === Number(obj.id))) {
      axios.delete(`https://626ed032f75bcfbb35718e66.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((el) => Number(el.id) !== Number(obj.id)));
    } else {
    const {data} = await axios.post('https://626ed032f75bcfbb35718e66.mockapi.io/favorites', obj);
    setFavorites((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('???? ?????????????? ???????????????? ?? ????????????????');
  }
  };

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider 
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems
      }}>
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} 
                onClose={() => setCartOpened(false)} 
                onRemove={onRemoveItem} />)}
      <Header onClickCart={() => setCartOpened(true)}/>

      <Routes> 
       <Route element={<Home
                          items={items} 
                          cartItems={cartItems}
                          searchValue={searchValue} 
                          setSearchValue={setSearchValue}
                          onChangeSearchInput={onChangeSearchInput}
                          onAddToFavorite={onAddToFavorite}
                          onAddToCart={onAddToCart}
                          isLoading={isLoading}
       />}path="/" exact>
      </Route>
      <Route element={<Favorites />} path="/favorites" exact>        
      </Route>
      </Routes>
    </div>
    </AppContext.Provider>    
  );
}

export default App;
