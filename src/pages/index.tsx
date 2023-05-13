import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { Handbag } from '@phosphor-icons/react'
import { useShoppingCart } from 'use-shopping-cart'
import {
  CartActions,
  CartDetails,
  formatCurrencyString,
  Product,
} from 'use-shopping-cart/core'

import { stripe } from '../services/stripe'

import { Footer, HomeContainer, ProductContent } from '../../styles/pages/home'
import { imageBlured } from '../util/blurDataUrl'

import 'keen-slider/keen-slider.min.css'

interface HomeProps {
  products: Product[]
}

function ProductListing({
  product,
  addItem,
  cartDetails,
}: {
  product: Product
  addItem: CartActions['addItem']
  cartDetails: CartDetails
}) {
  const price = formatCurrencyString({
    value: product.price,
    currency: 'BRL',
    language: 'pt-BR',
  })

  const isInCart = product.id in cartDetails

  console.log(product)

  return (
    <ProductContent className="keen-slider__slide" key={product.id}>
      <Image
        src={product.imageUrl}
        alt=""
        width={520}
        height={480}
        placeholder="blur"
        blurDataURL={imageBlured}
      />

      <Footer>
        <div>
          <strong>{product.name}</strong>
          <span>{price}</span>
        </div>
        <Link
          href={`/product/${product.id}`}
          prefetch={false}
          onClick={!isInCart ? () => addItem(product) : () => {}}
        >
          <Handbag size={32} />
        </Link>
      </Footer>
    </ProductContent>
  )
}

export default function Home({ products }: HomeProps) {
  const { addItem, cartDetails } = useShoppingCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 32,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <ProductListing
              key={product.id}
              product={product}
              addItem={addItem}
              cartDetails={cartDetails}
            />
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

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
