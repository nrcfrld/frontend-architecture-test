import { useCallback, useEffect, useMemo, useReducer } from 'react'
import type { CartItem, Product } from '@/types/product'

type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'decrement'; productId: number }
  | { type: 'remove'; productId: number }
  | { type: 'clear' }

const STORAGE_KEY = 'shiguang-cart'

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existingItem = state.find((item) => item.product.id === action.product.id)

      if (!existingItem) {
        return [...state, { product: action.product, quantity: 1 }]
      }

      return state.map((item) =>
        item.product.id === action.product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      )
    }
    case 'decrement':
      return state
        .map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0)
    case 'remove':
      return state.filter((item) => item.product.id !== action.productId)
    case 'clear':
      return []
  }
}

function getInitialCart(): CartItem[] {
  try {
    const savedCart = window.localStorage.getItem(STORAGE_KEY)
    return savedCart ? (JSON.parse(savedCart) as CartItem[]) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, [], getInitialCart)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )

  const add = useCallback((product: Product) => dispatch({ type: 'add', product }), [])
  const decrement = useCallback(
    (productId: number) => dispatch({ type: 'decrement', productId }),
    [],
  )
  const remove = useCallback(
    (productId: number) => dispatch({ type: 'remove', productId }),
    [],
  )
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])

  return { items, itemCount, total, add, decrement, remove, clear }
}
