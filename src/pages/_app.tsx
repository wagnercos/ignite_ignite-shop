import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { CartProvider } from 'use-shopping-cart'

import { globalStyles } from '../../styles/global'
import { Container } from '../../styles/pages/app'
import { Header } from '../components/header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = router

  const isNotPageSuccess = pathname === '/' || pathname === '/product/[id]'

  return (
    <Container>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.STRIPE_PUBLIC_KEY}
        currency="BRL"
        shouldPersist
      >
        {/* {isNotPageSuccess && <Header />} */}
        <Header isNotPageSuccess={isNotPageSuccess} />
        <Component {...pageProps} />
      </CartProvider>
    </Container>
  )
}
