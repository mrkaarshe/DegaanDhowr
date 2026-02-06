'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { getProductDetail } from '@/lib/api/services/products'

const CartContext = createContext()

const CART_STORAGE_KEY = 'cart'

// Load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window === 'undefined') return { items: [] }
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

// Save cart to localStorage
const saveCartToStorage = (state) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    console.error('Failed to save cart to localStorage:', err)
  }
}

const cartReducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'ADD_ITEM': {
      // action.payload is the full product object
      const product = action.payload
      // Use product.name or product.code as unique identifier
      const itemId = product.name || product.code || product.id

      const existingItem = state.items.find(item => {
        const existingId = item.name || item.code || item.id
        return existingId === itemId
      })

      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item => {
            const existingId = item.name || item.code || item.id
            if (existingId === itemId) {
              return {
                ...item,
                quantity: (item.quantity || 1) + (product.quantity || 1)
              }
            }
            return item
          }),
        }
      } else {
        // Store full product with quantity
        newState = {
          ...state,
          items: [...state.items, {
            ...product,
            quantity: product.quantity || 1
          }],
        }
      }
      break
    }
    case 'REMOVE_ITEM': {
      const itemId = action.payload
      newState = {
        ...state,
        items: state.items.filter(item => {
          const existingId = item.name || item.code || item.id
          return existingId !== itemId
        }),
      }
      break
    }
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      newState = {
        ...state,
        items: state.items.map(item => {
          const existingId = item.name || item.code || item.id
          if (existingId === id) {
            return { ...item, quantity: Math.max(1, quantity) }
          }
          return item
        }),
      }
      break
    }
    case 'CLEAR_CART':
      newState = { items: [] }
      break
    case 'LOAD_CART':
      newState = action.payload
      break
    default:
      return state
  }

  // Persist to localStorage after each action
  saveCartToStorage(newState)
  return newState
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage()
    if (savedCart.items && savedCart.items.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart })
    }
  }, [])

  // addItem now accepts full product object
  // If product is a package and doesn't have items, fetch detail first
  const addItem = async (product) => {
    // If it's a package and items are missing, fetch detail
    if (product.type === 'package' && (!product.items || !Array.isArray(product.items) || product.items.length === 0)) {
      try {
        const detailResult = await getProductDetail(product.code || product.name)
        if (detailResult.ok && detailResult.data && detailResult.data.items) {
          // Merge fetched items into product
          product = {
            ...product,
            items: detailResult.data.items.map(item => ({
              type: 'item',
              code: item.code || item.item_code || item.name,
              title: item.title || item.name,
              image: item.image,
              quantity: item.quantity || 1,
              description: item.description || item.short_description,
            }))
          }
        }
      } catch (err) {
        console.error('Failed to fetch package details:', err)
      }
    }
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })

  const updateQuantity = (id, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const cartCount = state.items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const cartTotal = state.items.reduce((sum, item) => {
    const price = item.package_price || item.price || 0
    return sum + price * (item.quantity || 1)
  }, 0)

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart mjust be used within CartProvider')
  }
  return context
}
