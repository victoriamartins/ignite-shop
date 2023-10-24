import { Fragment, useContext, useState } from 'react'
import { Handbag, X } from 'phosphor-react'
import { CartItem } from './CartItem'
import {
  CloseBtn,
  ListContainer,
  MainContainer,
  ItemFooter,
  BtnWrap,
} from '@/styles/components/cart'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { ShopContext } from '@/context/ShopContext'
import axios from 'axios'

export function Cart() {
  const { cartList } = useContext(ShopContext)
  const [state, setState] = useState(false)

  const amountOfProducts = cartList.reduce((sum, item) => sum + item.amount, 0)
  let amountOfProductsText = ''
  amountOfProducts === 1
    ? (amountOfProductsText = '1 item')
    : (amountOfProductsText = `${amountOfProducts} itens`)

  const amountOfMoney = cartList.reduce(
    (sum, item) => sum + item.priceNumber * item.amount,
    0,
  )
  const amountOfMoneyText = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountOfMoney)

  async function handleCheckout() {
    try {
      const response = await axios.post('/api/checkout', {
        products: cartList,
      })
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl // redireciona para paginas externas
    } catch {
      alert('Falha ao comprar produto')
    }
  }

  return (
    <div>
      <Fragment>
        <Button onClick={() => setState(true)}>
          <Handbag size={24} weight="bold" />
        </Button>
        <Drawer anchor="right" open={state} onClose={() => setState(false)}>
          <MainContainer>
            <BtnWrap>
              <CloseBtn onClick={() => setState(false)}>
                <X size={24} weight="bold" />
              </CloseBtn>
            </BtnWrap>

            <ListContainer>
              <h2>Sacola de compras</h2>
              <ul>
                {cartList.map((item) => {
                  return (
                    <CartItem
                      id={item.id}
                      image={item.image}
                      name={item.name}
                      price={item.price}
                      amount={item.amount}
                      key={item.id}
                    />
                  )
                })}
              </ul>
            </ListContainer>

            <ItemFooter>
              <section>
                <div>
                  <span>Quantidade</span>
                  <span>{amountOfProductsText}</span>
                </div>

                <div>
                  <strong>Valor total</strong>
                  <strong>{amountOfMoneyText}</strong>
                </div>
              </section>
              <button onClick={handleCheckout}>Finalizar compra</button>
            </ItemFooter>
          </MainContainer>
        </Drawer>
      </Fragment>
    </div>
  )
}
