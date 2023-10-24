import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@/styles/pages/product'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Notification } from '../components/Notification'
import { useContext, useState } from 'react'
import { ShopContext } from '@/context/ShopContext'
import Image from 'next/image'
import Stripe from 'stripe'
import Head from 'next/head'
// import axios from 'axios'

interface ProductProps {
  product: {
    id: string
    name: string
    image: string
    priceNumber: number
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  // const router = useRouter()
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
  //   useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { isFallback } = useRouter() // permite a criação de telas de login
  const { addToCart } = useContext(ShopContext)

  function handleAddToCart() {
    addToCart(product)
    manageNotification()
  }

  function manageNotification() {
    setShowNotification(true)
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 2500)
    return () => clearTimeout(timer)
  }

  if (isFallback) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      {showNotification && <Notification />}
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.image}
            width={520}
            height={480}
            alt="Camiseta preta com desenho na frente"
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button
            onClick={handleAddToCart}
            // disabled={isCreatingCheckoutSession}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: 'prod_OgENLfyoPnoAuE' },
      },
    ],
    fallback: true, // falback false não carrega params fora dos informados
    // com fallback true, o next carrega o html (componente) e, quando rodar o
    // get static props, vai tentar colocar esses dados no componente. Por isso
    // precisa do estado de loading

    // fallback 'blocking' não mostra a tela até que tudo seja carregado
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}: any) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  if (price.unit_amount == null) price.unit_amount = 0

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        image: product.images[0],
        priceNumber: price.unit_amount / 100,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100), // cents, ex: 7990 = 79,90
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
