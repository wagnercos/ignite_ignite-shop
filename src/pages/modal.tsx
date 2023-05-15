import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'

import {
  CartContent,
  CartFooter,
  CartItem,
  CloseButton,
  Content,
  DescriptionGroup,
  ImageContainer,
  Overlay,
  Quantity,
  Total,
} from '../../styles/pages/modal'

export function Modal() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { cartDetails, removeItem, cartCount, formattedTotalPrice } =
    useShoppingCart()

  const products = Object.values(cartDetails ?? {}).map((entry) => {
    return {
      entry,
      removeItem,
    }
  })

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        cartItem: products,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <Dialog.Title>Sacola de compras</Dialog.Title>

        <CartContent>
          {products.map((product) => {
            return (
              <CartItem key={product.entry.id}>
                <ImageContainer>
                  <Image
                    src={product.entry.image}
                    alt=""
                    width={90}
                    height={90}
                  />
                </ImageContainer>
                <DescriptionGroup>
                  <p>{product.entry.name}</p>
                  <strong>
                    {formatCurrencyString({
                      value: product.entry.price,
                      currency: 'BRL',
                      language: 'pt-BR',
                    })}
                  </strong>
                  <button
                    type="button"
                    onClick={() => product.removeItem(product.entry.id)}
                  >
                    Remover
                  </button>
                </DescriptionGroup>
              </CartItem>
            )
          })}
        </CartContent>

        <CartFooter>
          <div>
            <Quantity>
              <p>Quantidade</p>
              <p>
                {cartCount} {cartCount === 1 ? 'item' : 'itens'}
              </p>
            </Quantity>
            <Total>
              <strong>Valor total</strong>
              <strong>{formattedTotalPrice}</strong>
            </Total>
          </div>
          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Finalizar compra
          </button>
        </CartFooter>
      </Content>
    </Dialog.Portal>
  )
}
