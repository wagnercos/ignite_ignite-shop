import * as Dialog from '@radix-ui/react-dialog'
import { keyframes, styled } from '..'

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
})

const fadeOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'translateX(100%)',
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'transparent',
})

export const Content = styled(Dialog.Content, {
  height: '100vh',
  width: '30rem',
  backgroundColor: '$gray800',
  padding: '4.5rem 3rem',

  position: 'fixed',
  top: 0,
  right: 0,

  boxShadow: '-4px 0 30px rgba(0,0,0, .7)',

  '&[data-state="open"]': {
    animation: `${fadeIn} 200ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${fadeOut} 150ms ease-in`,
  },

  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
})

export const CloseButton = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  top: '1.5rem',
  right: '1.5rem',
  cursor: 'pointer',
  color: '$gray300',
})

export const CartContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',

  flex: 1,
})

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
})

export const ImageContainer = styled('div', {
  width: 102,
  height: 94,
  background: 'linear-gradient(180deg, #1ea483  0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const DescriptionGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  p: {
    fontSize: '$md',
    color: '$gray300',
  },
  strong: {
    fontSize: '$md',
    color: '$gray100',
  },

  button: {
    all: 'unset',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '$green500',
    cursor: 'pointer',
    transition: 'all .15s ease-in-out',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const CartFooter = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '3.5rem',

  button: {
    width: '100%',
    border: 0,
    color: '$white',
    backgroundColor: '$green500',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',
    transition: 'all 0.15s ease',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const Quantity = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '0.5rem',

  'p:first-child': {
    fontSize: '$md',
    color: '$gray100',
  },

  'p:last-child': {
    fontSize: '$lg',
    color: '$gray300',
  },
})

export const Total = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  'strong:first-child': {
    fontSize: '$lg',
    color: '$gray100',
  },

  'strong:last-child': {
    fontSize: '$xl',
    color: '$gray300',
  },
})
