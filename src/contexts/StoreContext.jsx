import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const[cartItems,setCartItems]=useState({});
  const[token,setToken] = useState("");
  const[food_list,setFoodList] = useState([]);
  const url="http://localhost:400";

  const addToCart=async (itemID)=>
  {
    if(!cartItems[itemID])
    {
      setCartItems((prev)=>({...prev,[itemID]:1}))
    }
    else
    {
      setCartItems((prev)=>({...prev,[itemID]:prev[itemID]+1}))
    }
    if(token)
    {
      await axios.post(url+"/api/cart/add",{itemID},{headers:{token}});
    }
  }

  const removeToCart=(itemID)=>
  {
    setCartItems((prev)=>({...prev,[itemID]:prev[itemID]-1}))
  }

  useEffect(()=>
  {
    console.log(cartItems);
  },[cartItems])
  const getTotalCartAmount = () => {
    let totalAmount = 0;
  
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === (item)); // Convert item to a number
        if (itemInfo) {
          totalAmount += Number(itemInfo.price.toString().replace(/[^0-9.]/g, "")) * cartItems[item];
        }
      }
    } 
  
    return totalAmount; // Move return outside the loop
  };

  const fetchFoodList = async()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data);
  }

  
  useEffect(()=>{
    async function loadData()
   {
    await fetchFoodList();
    if(localStorage.getItem("token"))
      {
        setToken(localStorage.getItem("token"))
      }
      
    }
    loadData();
    
},[])
  const contextValue = { food_list,cartItems,addToCart,removeToCart,getTotalCartAmount,url,token,setToken};

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };
export default StoreContext;
