import { ShopContext } from '@/context/ShopContext'
import {
  Item,
  ItemHeader,
  ItemInfo,
  SmallImageContainer,
} from '@/styles/components/cartItem'
import Image from 'next/image'
import { useContext } from 'react'

interface CartItemProps {
  id: string
  image: string
  name: string
  price: string
  amount: number
}

export function CartItem(data: CartItemProps) {
  const { removeFromCart } = useContext(ShopContext)

  function handleRemove() {
    removeFromCart(data.id)
  }
  return (
    <Item>
      <SmallImageContainer>
        <Image src={data.image} alt="" width={100} height={100} />
      </SmallImageContainer>

      <ItemInfo>
        <ItemHeader>
          <h3>{data.name}</h3>
          <div>
            <strong>{data.price}</strong> <span>{`(${data.amount})`}</span>
          </div>
        </ItemHeader>

        <span onClick={handleRemove}>Remover</span>
      </ItemInfo>
    </Item>
  )
}
