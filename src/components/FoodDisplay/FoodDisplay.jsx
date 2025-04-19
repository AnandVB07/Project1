import React, { useContext } from 'react'
import StoreContext from '../../contexts/StoreContext'
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'

const FoodDisplay = ({category}) => {
    const{food_list}=useContext(StoreContext);
  return (
    <div className="food-display">
        <h2>Top Dishes Near me📍</h2>
        <div className="food-display-item">
            {food_list.map((item,index)=>
            {
                return<FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
            })}
        </div>
    </div>
  )
}

export default FoodDisplay