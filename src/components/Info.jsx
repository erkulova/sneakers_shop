import React from 'react';
import AppContext from '../context';

const Info = ({title, image, description}) => {
    const {setCartOpened} = React.useContext(AppContext);
  return (
    <div class="cartEmpty d-flex align-center justify-center flex-column flex">
      <img class="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p class="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} class="greenBtn">
        <img src="/img/cart-btn-arr.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info;
