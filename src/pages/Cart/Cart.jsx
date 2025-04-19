import React, { useContext } from 'react';
import './Cart.css';
import StoreContext from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeToCart, getTotalCartAmount,url } = useContext(StoreContext);
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
        const quantity = cartItems[item._id] || 0; // Ensure it doesn't break if undefined
        if (quantity > 0) {
          return (
            <div className="cart-item-list" key={item._id}>
              <img src={url+"/images/"+item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{quantity}</p>
              <p>${(Number(item.price.replace(/[^0-9.]/g, "")) * quantity).toFixed(2)}</p>
              <p onClick={() => removeToCart(item._id)} className="cross">x</p>
            </div>
          );
        }
        return null;
      })}

      {/* Cart Summary */}
      <div className="total-amount">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-items">
              <p>SubTotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <div className="cart-total-items">
              <p>Delivery Fee</p>
              <p>$2.00</p>
            </div>
            <div className="cart-total-items">
              <p>Total Amount</p>
              <p>${(getTotalCartAmount() + 2).toFixed(2)}</p>
            </div>
          </div>
          <button onClick={() => navigate('/order')} type="submit">Proceed to Checkout</button>
        </div>

        {/* Promo Code Section */}
        <div className="promo">
          <div className="promo-card">
            <p>Have a promo code? Enter it!</p>
            <input type="text" placeholder="Promo code" />
            <button type="submit">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;