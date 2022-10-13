import React from 'react';
import axios from 'axios';
import Info from './Info';
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer ({onClose, onRemove, items = []}) {
  const {cartItems, setCartItems} = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://626ed032f75bcfbb35718e66.mockapi.io/orders', {items: cartItems,});
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://626ed032f75bcfbb35718e66.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
      
    } catch(error) {
      alert('Не удалось выполнить заказ!');
    }
    setIsLoading(false);
  }

    return (
        <div className="overlay">
        <div className="drawer">
          <h2 className="mb-30 d-flex justify-between">Корзина
            <img onClick={onClose} className="cu-p" src="/img/cart-btnRemove.svg" alt="close" />
          </h2>

          {items.length > 0 ? (
        <div className="d-flex flex-column flex">
          <div className="items">
          {items.map((el) => (
             
              <div key={el.id} className="cartItem d-flex align-center mb-20">
              <div className="cartItemImg" style={{ backgroundImage: `url(${el.url})`}}>
              </div>
              <div className="mr-20 flex">
                <p className="mb-5">{el.name}</p>
                <b>{el.price}</b>
              </div>
              <img 
              onClick={() => onRemove(el.id)} 
              className="removeBtn" 
              src="/img/cart-btnRemove.svg" 
              alt="remove" />
              
            </div>))}
            </div>
            <div className="cartTotalBlock">
            <ul className="cartTotalBlock">
              <li className="d-flex">
                <span>Итого:</span>
                <div></div>
                <b>21 498 руб.</b>
              </li>
              <li className="d-flex">
                <span>НДС 20%:</span>
                <div></div>
                <b>4 299 руб.</b>
              </li>
            </ul>
            <button disabled={isLoading} onClick={onClickOrder} className="greenBtn">Оформить заказ <img src="/img/cart-btn-arr.svg" alt="arrow" /></button>
            </div>
            </div>
            
          ) : (
            <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
            description={isOrderComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" }
            image={isOrderComplete ? "img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
          )}
          </div>
        </div>
        

    )
}

export default Drawer;