import React, { useContext} from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets';
import plusIcon from '../../assets/plus.png';
import addIcon from '../../assets/add_icon.png';
import minusIcon from '../../assets/remove_icon.png';
import StoreContext from '../../contexts/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
  const{cartItems,addToCart,removeToCart,url}=useContext(StoreContext);

    
  return (
    <div className='food-item'>
        <div className="foodItem-img-container">
            <img  className="foodItem-image" src={url+"/images/"+image} alt="food"/>
            {!cartItems[id]
              ?<img className="add" onClick={()=>addToCart(id)}   src={plusIcon} alt='plus'/>
              : <div className="food-item-counter">
              <img onClick={()=>removeToCart(id)} src={minusIcon} alt="remove" className="remove" />
              <p>{cartItems[id]}</p>
              <img onClick={()=>addToCart(id)} src={addIcon} alt="add" className="plus" />
              </div>
            }
        </div>
        <div className='food-item-info'>
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src="https://i.pinimg.com/736x/89/2e/ef/892eef6deb987a38c7006173a51de9c9.jpg" alt="ratings" className="item-rating-image" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">{price}</p>
        </div>
    </div>
  )
}

export default FoodItem