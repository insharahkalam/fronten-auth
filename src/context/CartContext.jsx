import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find(i => i._id === action.payload._id)
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i._id === action.payload._id
                            ? { ...i, qty: i.qty + 1 }
                            : i
                    ),
                }
            }
            return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
        }
        case 'REMOVE':
            return { ...state, items: state.items.filter(i => i._id !== action.payload) }
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items
                    .map(i => i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i)
                    .filter(i => i.qty > 0),
            }
        case 'CLEAR':
            return { ...state, items: [] }
        default:
            return state
    }
}

export function CartProvider({ children }) {
    const saved = JSON.parse(localStorage.getItem('cart') || '{"items":[]}')
    const [state, dispatch] = useReducer(cartReducer, saved)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state))
    }, [state])

    const addToCart = (product) => dispatch({ type: 'ADD', payload: product })
    const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id })
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
    const clearCart = () => dispatch({ type: 'CLEAR' })

    const total = state.items.reduce((s, i) => s + i.price * i.qty, 0)
    const count = state.items.reduce((s, i) => s + i.qty, 0)

    return (
        <CartContext.Provider value={{ items: state.items, total, count, addToCart, removeFromCart, updateQty, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used inside CartProvider')
    return ctx
}