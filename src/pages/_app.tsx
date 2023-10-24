import { globalStyles } from '@/styles/global'
import type { AppProps } from 'next/app'
import { Container, Header } from '@/styles/pages/app'
import { Cart } from './components/Cart'
import Link from 'next/link'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
import { ShopContextProvider } from '@/context/ShopContext'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ShopContextProvider>
        <Header>
          <Link href={'/'}>
            <Image src={logoImg} alt="" />
          </Link>

          <Cart />
        </Header>
        <Component {...pageProps} />
      </ShopContextProvider>
    </Container>
  )
}
