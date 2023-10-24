import { HomeContainer, Product, ShopBtn } from '@/styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '@/lib/stripe'
import { GetStaticProps } from 'next'
import { Handbag } from 'phosphor-react'
import Stripe from 'stripe'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: {
    id: string
    name: string
    image: string
    priceNumber: number
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [refSlider] = useKeenSlider({
    slides: {
      perView: 2.4,
      spacing: 50,
    },
  })
  return (
    <>
      <Head>
        <title>Ignite Shop | Home</title>
      </Head>
      <HomeContainer ref={refSlider} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image
                  src={product.image}
                  alt="camiseta preta com ilustração"
                  width={520}
                  height={480}
                />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <ShopBtn>
                    <Handbag size={30} color="white" weight="bold" />
                  </ShopBtn>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    if (price.unit_amount == null) price.unit_amount = 0

    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      preceNumber: price.unit_amount / 100,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100), // cents, ex: 7990 = 79,90
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}
