import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import StoreContext from '../../contexts/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, food_list } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phoneNumber: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const PlaceOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const userId = localStorage.getItem("userId"); // assuming you store it this way

    const orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const url = "http://localhost:400";

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.href = session_url; // ✅ Fix: Redirects to external Stripe URL
      } else {
        alert("Error placing the order");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <form onSubmit={PlaceOrder} className='place-order-form'>
      <div className="place-order-left">
        <h2>Delivery Information</h2>
        <div className='place-order-flex'>
          <input className='form-style' name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' required />
          <input type='text' name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
        </div>
        <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
        <input type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className='place-order-flex'>
          <input type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className='place-order-flex'>
          <input type='text' name='pincode' onChange={onChangeHandler} value={data.pincode} placeholder='Pincode' />
          <input type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
        </div>
        <input type='number' name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} placeholder='Phone Number' />
      </div>

      <div className="place-order-right">
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-items">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-items">
              <p>Delivery fee</p>
              <p>$2</p>
            </div>
            <hr />
            <div className="cart-total-items">
              <p>Total amount</p>
              <p>${getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
