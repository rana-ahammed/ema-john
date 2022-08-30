import React, { useEffect, useState } from 'react';
import { fakeData } from '../../fakeData/products';
import { clearTheCart, deleteFromDb, getStoredCart } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';

const Review = () => {

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  
  const handleProceedCheckout = () => {
    navigate('/shipment');
  }

  const removeProduct = (productKey) => {
    console.log("remove clicked", productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    deleteFromDb(productKey);
  }

  useEffect( () => {
    //cart
    const savedCart = getStoredCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    setCart(cartProducts);
  }, [])

  let thankyou;
  if(orderPlaced) {
    thankyou = <img src={happyImage} alt="" />;
  }
  return (
    <div className="twin-container">


      <div className="product-container">
      {
        cart.map(pd => <ReviewItem
           key = {pd.key}
           removeProduct = {removeProduct}
           product = {pd}></ReviewItem>)
      }

      { thankyou }
      </div>



      <div className="cart-container">
          <Cart cart={cart}>
            <button onClick={handleProceedCheckout} className="main-button">Proceed CheckOut</button>
          </Cart>
      </div>
      

    </div>
  );
};

export default Review;