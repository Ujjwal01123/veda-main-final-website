"use client"
import React, { createContext, useReducer, useContext } from "react"
import { cartReducer, initialCartState } from "../utils/CartReducer"

const CartContext = createContext()

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialCartState)

    const addItem = (product, quantity = 1) => dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } })

    const removeItem = (_id) => dispatch({ type: "REMOVE_ITEM", payload: _id })
    const updateQty = (_id, quantity) => dispatch({ type: "UPDATE_QTY", payload: { _id, quantity } })
    const increaseQty = (_id) => dispatch({ type: "INCREASE_QTY", payload: _id })
    const decreaseQty = (_id) => dispatch({ type: "DECREASE_QTY", payload: _id })
    const clearCart = () => dispatch({ type: "CLEAR_CART" })

    return (
        <CartContext.Provider
            value={{
                cart: state,
                addItem,
                removeItem,
                updateQty,
                increaseQty,
                decreaseQty,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
