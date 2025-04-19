import React, { useContext } from 'react'
import './PlaceOrder.css'
import StoreContext from '../../contexts/StoreContext'
const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <>

      <form className='place-order-form'>
        <div className="place-order-left">
          <h2>Delivery Information</h2>
          <div className='place-order-flex'>
            <input className='form-style' type='text' placeholder='First name' required />
            <input type='text' placeholder='Last name' />
          </div>
          <input type='email' placeholder='Email address' />
          <input type='text' placeholder='Street' />
          <div className='place-order-flex'>
            <input type='text' placeholder='City' />
            <input type='text' placeholder='State' />
          </div>
          <div className='place-order-flex'>
            <input type='text' placeholder='Pincode' />
            <input type='text' placeholder='Country' />
          </div>
          <input type='number' placeholder='Phone Number' />
        </div>




        <div className="place-order-right">
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-items">
                <p>SubTotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-items">
                <p>Delivery fee</p>
                <p>${2}</p>
              </div>
              <hr/>
              <div className="cart-total-items">
                <p>Total amount</p>
                <p>${getTotalCartAmount() + 2}</p>
              </div>
            </div>
            <button type='submit'>Proceed to Payment</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default PlaceOrder