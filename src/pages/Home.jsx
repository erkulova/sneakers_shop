
import React from 'react';
import Card from "../components/Card";
import AppContext from "../context";

function Home ({
  items, 
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToFavorite, 
  onAddToCart,
  isLoading
  }) {

    const renderItems = () => {
      const filteredItems = items.filter((el) => 
        el.name.toLowerCase().includes(searchValue.toLocaleLowerCase()),
      );
      return (isLoading ? [...Array(12)] : filteredItems).map((el, index) => (
            <Card 
               key={index}
               onFavorite={(obj) => onAddToFavorite(obj)} 
               onPlus={(obj) => onAddToCart(obj)}
               loading={isLoading}
               {...el}
               />
      ));      
    };

    return (
<div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/cart-btnRemove.svg" alt="clear" />}
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."></input>
          </div>
        </div>

        <div className="d-flex flex-wrap">
          
          {renderItems()}

        </div>

      </div>
    );
}

export default Home;
