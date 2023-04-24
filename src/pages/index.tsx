import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

import { stripe } from '../services/stripe'

import 'keen-slider/keen-slider.min.css'
import { HomeContainer, Product } from '../../styles/pages/home'
import { imageBlured } from '../util/blurDataUrl'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 32,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                alt=""
                width={520}
                height={480}
                placeholder="blur"
                blurDataURL={imageBlured}
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

// Utilizado somente com informações que são cruciais em tela para indexadores, bots etc...
// Obter propriedades do Server Side (SSR)
// Lembrando que estes dados rodam dentro do node server
// revalidate = propriedade que atualiza minha página estática (SSG)
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
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
