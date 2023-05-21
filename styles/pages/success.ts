import { styled } from '@stitches/react'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: 1.4,
    marginTop: '2rem',
  },

  a: {
    marginTop: '5rem',
    textDecoration: 'none',
    display: 'block',
    fontSize: '$lg',
    color: '$green500',
    fontWeight: 'bold',
    transition: 'all 0.15s',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImagesContainer = styled('div', {
  height: 140,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '3rem',
})

export const ImageContent = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483  0%, #7465d4 100%)',
  borderRadius: '100%',
  padding: '0.25rem',
  boxShadow: '-4px 0 30px rgba(0,0,0, .7)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:not(:first-child)': {
    position: 'relative',
    zIndex: 1,
    marginLeft: '-45px',
  },

  img: {
    objectFit: 'cover',
  },
})
