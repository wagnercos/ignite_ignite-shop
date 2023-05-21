import { Handbag } from '@phosphor-icons/react'
import Image from 'next/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'

import { Modal } from '../pages/modal'

import { HeaderContainer, QuantityMarker } from '../../styles/components/header'

import logoImg from '../assets/logo.svg'

export function Header() {
  const { cartCount } = useShoppingCart()

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button onClick={() => {}}>
            <QuantityMarker cartExist={cartCount > 0 && true}>
              {cartCount}
            </QuantityMarker>
            <Handbag size={24} />
          </button>
        </Dialog.Trigger>
        <Modal />
      </Dialog.Root>
    </HeaderContainer>
  )
}
