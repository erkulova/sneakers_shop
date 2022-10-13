import React from "react";
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';

function Card({
  id,
  name,
  url,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false
  }) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
      onPlus({id, name, url, price});
    }

    const onClickFavorite = () => {
      onFavorite({id, name, url, price});
      setIsFavorite(!isFavorite);
    }

    return (
    <div className={styles.card}>
    {loading ? (
    <ContentLoader 
      speed={2}
      width={165}
      height={250}
      viewBox="0 0 170 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
      <rect x="0" y="108" rx="4" ry="4" width="170" height="15" /> 
      <rect x="0" y="134" rx="4" ry="4" width="93" height="15" /> 
      <rect x="0" y="171" rx="4" ry="4" width="80" height="24" /> 
      <rect x="135" y="164" rx="10" ry="10" width="32" height="32" />
    </ContentLoader> 
    ) : (
      <>
        <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? '/img/bookmark-active.svg' : '/img/bookmark-inactive.svg'} alt="bookmark" />
        </div>
        <img width='100%' height={135} src={url} alt="sneakers"/>
        <h5>{name}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
            <img 
              className={styles.plus} 
              onClick={onClickPlus} 
              src={isItemAdded(id) ? '/img/checkedProd.svg' : '/img/addProd.svg'} 
              alt="add product to cart"/>
          </div>
          </>
    )}      
        </div>
        );
    }

export default Card;