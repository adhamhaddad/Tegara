import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import Card from '../components/Card';
import classes from '../css/Products.module.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  const getProducts = async () => {
    // const data = 
    const response = await sendRequest('/product', 'GET', null, );
  };
  const list =
    products.length > 0 &&
    products.map(({ id, price }) => <Card key={id} price={price} />);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={classes['products']}>
      {isLoading && 'Loading'}
      {isError && 'Error'}
      {list.length > 0 && <ul>{list}</ul>}
    </div>
  );
};
export default Products;
