import React, { useState } from 'react';
import classes from '../css/Card.module.css';

const Card = ({ price }) => {
  const [counter, setCounter] = useState(0);
  const [hasOffer, setHasOffer] = useState(0);

  const increment = () => {
    setCounter((prev) => prev++);
  };
  const decrement = () => {
    setCounter((prev) => prev--);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes['card']}>
      <div className={classes['media']}>
        <div className={classes['thumb-main']}></div>
        <div className={classes['thumb-sub']}></div>
      </div>
      <div className={classes['content']}>
        <div className={classes['price']}>${price - hasOffer}</div>
        {hasOffer > 0 && (
          <div className={classes['offer']}>
            $<del>{price}</del>
          </div>
        )}
        <div>
          <div className={classes['counter']}>
            <button onClick={increment}>+</button>
            <input type='number' value={counter} />
            <button onClick={decrement}>-</button>
          </div>
        </div>
        <button className={classes['add-to-cart']}>
          <i className='fa-solid fa-caret'></i>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};
export default Card;
