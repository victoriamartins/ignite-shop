import { ReactNode, useState, createContext } from 'react'

export interface ProductProps {
  id: string
  name: string
  image: string
  price: string
  priceNumber: number
  description: string
  defaultPriceId: string
  amount: number
}

export interface ProductData {
  id: string
  name: string
  image: string
  price: string
  priceNumber: number
  description: string
  defaultPriceId: string
}

interface ShopContextProps {
  cartList: ProductProps[]
  addToCart: (item: ProductData) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

interface ShopContextProviderProps {
  children: ReactNode
}

export const ShopContext = createContext({} as ShopContextProps)

export function ShopContextProvider({ children }: ShopContextProviderProps) {
  const [cartList, setCartList] = useState<ProductProps[]>([])

  function addToCart(item: ProductData) {
    const isItAdded = cartList.filter((listItem) => listItem.id === item.id)
    if (isItAdded.length === 0) {
      const newItem = {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        priceNumber: item.priceNumber,
        description: item.description,
        defaultPriceId: item.defaultPriceId,
        amount: 1,
      }
      setCartList((state) => [...state, newItem])
    } else {
      const indexToUpdate = cartList.indexOf(isItAdded[0])
      const newCartList = cartList.map((item, index) => {
        if (index === indexToUpdate) {
          item.amount++
        }
        return item
      })
      setCartList(newCartList)
    }
  }

  function removeFromCart(id: string) {
    const newAmountList = cartList.map((item) => {
      if (item.id === id) {
        const newItem = item
        newItem.amount = item.amount - 1
        return newItem
      }
      return item
    })
    const newList = newAmountList.filter((item) => item.amount > 0)
    setCartList(newList)
  }

  function clearCart() {
    setCartList([])
  }

  return (
    <ShopContext.Provider
      value={{ cartList, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </ShopContext.Provider>
  )
}
