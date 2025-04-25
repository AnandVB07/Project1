import React, { useContext } from 'react';
import './Cart.css';
import StoreContext from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeToCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      {/* Table Header */}
      <div className="cart-page-items">
        <p>Item</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Cart Items */}
      {food_list.map((item) => {
        const quantity = cartItems[item._id] || 0;
        if (quantity > 0) {
          return (
            <div className="cart-item-list" key={item._id}>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p> {/* Fixed: Use toFixed() for numbers */}
              <p>{quantity}</p>
              <p>${(item.price * quantity).toFixed(2)}</p>
              <p onClick={() => removeToCart(item._id)} className="cross">×</p>
            </div>
          );
        }
        return null;
      })}

      {/* Cart Summary */}
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart-total-items">
            <p>SubTotal</p>
            <p>${getTotalCartAmount().toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-items">
            <p>Delivery Fee</p>
            <p>$2.00</p>
          </div>
          <hr />
          <div className="cart-total-items">
            <p>Total Amount</p>
            <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
          </div>
        </div>
        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
};

export default Cart;