import { styled } from '..'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  variants: {
    noCart: {
      true: {
        justifyContent: 'center',
      },
    },
  },

  button: {
    all: 'unset',
    color: '$gray300',
    width: '3rem',
    height: '3rem',
    backgroundColor: '$gray800',
    borderRadius: 6,
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',

    '&:hover': {
      color: '$gray100',
    },
  },
})

export const QuantityMarker = styled('span', {
  position: 'absolute',
  top: -8,
  right: -8,
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: 100,
  backgroundColor: '$green500',
  border: '2px solid $gray900',

  display: 'none',

  fontSize: '0.875rem',
  fontWeight: 'bold',

  variants: {
    cartExist: {
      true: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
})
