import React, { useEffect, useState } from 'react';
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

    fetch("https://damp-coast-75016.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
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