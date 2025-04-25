import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const url = "http://localhost:400"; // Your backend URL

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
            // Handle error appropriately (e.g., display a message to the user)
        }
    };

    const fetchCart = async () => {
        if (token) {
            try {
                const response = await axios.post(`${url}/api/cart/get`, { userId: token }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.success) {
                    setCartItems(response.data.cartData);
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
                // Handle error
            }
        }
    };

    const addToCart = async (itemId) => {
        const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
        setCartItems(updatedCart);
        if (token) {
            try {
                await axios.post(`${url}/api/cart/add`, { itemId, userId: token }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
                // Optionally revert cart state on error
            }
        }
    };

    const removeToCart = async (itemId) => {
        const updatedCart = { ...cartItems };
        if (updatedCart[itemId] > 0) {
            updatedCart[itemId] -= 1;
            if (updatedCart[itemId] === 0) {
                delete updatedCart[itemId];
            }
            setCartItems(updatedCart);
            if (token) {
                try {
                    await axios.post(`${url}/api/cart/remove`, { itemId, userId: token }, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                } catch (error) {
                    console.error("Error removing from cart:", error);
                    // Optionally revert cart state on error
                }
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const itemInfo = food_list.find(item => item._id === itemId);
                if (itemInfo) {
                    totalAmount += Number(itemInfo.price) * cartItems[itemId];
                }
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        fetchFoodList();
        fetchCart(); // Fetch cart on initial load/login
    }, [token]); // Re-fetch cart when token changes

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContextProvider };
export default StoreContext;