import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Stripe from 'stripe'

import {
  ImageContent,
  ImagesContainer,
  SuccessContainer,
} from '../../styles/pages/success'
import { stripe } from '../services/stripe'

interface SuccessProps {
  customerName: string
  products: {
    id: string
    name: string
    image: string
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesContainer>
          {products.map((product) => (
            <ImageContent key={product.id}>
              <Image src={product.image} alt="" width={120} height={120} />
            </ImageContent>
          ))}
        </ImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {products.length}{' '}
          {products.length === 1 ? 'camiseta' : 'camisetas'} já está a caminho
          da sua casa
        </p>

        <Link href="/">Voltar ao catálogo</Link>
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

  const customerName = session.customer_details.name
  const products = session.line_items.data.map((p) => {
    const product = p.price.product as Stripe.Product
    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
    }
  })

  return {
    props: {
      customerName,
      products,
    },
  }
}
