import { calculateDiscount } from "./utils"

const storedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null

export const initialCartState = storedCart
    ? JSON.parse(storedCart)
    : {
          items: [],
          totalQty: 0,
          totalPrice: 0,
      }

function recalcTotals(items) {
    const totalQty = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = items.reduce((acc, item) => acc + calculateDiscount(item.productPrice, item.productDiscount) * item.quantity, 0)
    return { totalQty, totalPrice }
}

export function cartReducer(state, action) {
    let newState

    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((item) => item._id === action.payload._id)
            let updatedItems

            if (existing) {
                updatedItems = state.items.map((item) => (item._id === action.payload._id ? { ...item, quantity: item.quantity + action.payload.quantity } : item))
            } else {
                updatedItems = [...state.items, { ...action.payload }]
            }

            newState = { ...state, items: updatedItems, ...recalcTotals(updatedItems) }
            break
        }

        case "REMOVE_ITEM": {
            const updatedItems = state.items.filter((item) => item._id !== action.payload)
            newState = { ...state, items: updatedItems, ...recalcTotals(updatedItems) }
            break
        }

        case "UPDATE_QTY": {
            const updatedItems = state.items.map((item) => (item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item))
            newState = { ...state, items: updatedItems, ...recalcTotals(updatedItems) }
            break
        }

        case "INCREASE_QTY": {
            const updatedItems = state.items.map((item) => (item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item))
            newState = { ...state, items: updatedItems, ...recalcTotals(updatedItems) }
            break
        }

        case "DECREASE_QTY": {
            let updatedItems = state.items.map((item) => (item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item))
            updatedItems = updatedItems.filter((item) => item.quantity > 0)
            newState = { ...state, items: updatedItems, ...recalcTotals(updatedItems) }
            break
        }

        case "CLEAR_CART":
            newState = { items: [], totalQty: 0, totalPrice: 0 }
            break

        default:
            return state
    }

    // 🔥 Save updated cart in localStorage
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState))
    }

    return newState
}
