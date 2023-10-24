import { stripe } from '@/lib/stripe'
import {
  ImageContainer,
  SuccessContainer,
  TShirts,
} from '@/styles/pages/success'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useContext } from 'react'
import { ShopContext } from '@/context/ShopContext'

interface SuccessProps {
  customerName: string
  amount: number
  images: string[]
}

// OPÇÕES DE FETCHING: getstaticprops (n pode ser pq aqui depende de uma var),
//  UseEffect: pode ser, mas precisa de uma loading screen e a api nao permite
// clientside fetching. Solução: getserversideprops
export default function Success({
  customerName,
  amount,
  images,
}: SuccessProps) {
  const { clearCart } = useContext(ShopContext)
  clearCart()
  return (
    <>
      <Head>
        <title>Obrigada!</title>
        {/* a linha abaixo esconde a página dos crowlers */}
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <TShirts>
          {images.map((source) => {
            return (
              <ImageContainer key={source}>
                <Image src={source} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </TShirts>
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de{' '}
          <strong>{`${amount} camiseta(s) `}</strong>
          já está a caminho da sua casa.{' '}
        </p>

        <Link href={'/'}>Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details.name || ''
  const data = session.line_items.data

  const amount = data.reduce((sum, item) => sum + (item.quantity || 0), 0)
  const images = data.map((item) => item.price?.product.images[0])

  return {
    props: {
      customerName,
      amount,
      images,
    },
  }
}
