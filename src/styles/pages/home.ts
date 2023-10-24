import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  minHeight: 600,
  marginLeft: 'auto',
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #6850FF 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.35s ease-in-out',

    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: 'rgba(0, 0, 0, 0.6)',
    padding: '2rem',

    div: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 4,
    },
  },

  strong: {
    fontSize: '$lg',
    color: '$gray100',
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300',
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    },
  },
})

export const ShopBtn = styled('button', {
  background: '$green500',
  border: 0,
  borderRadius: 6,
  padding: 10,
  cursor: 'pointer',
  '&:hover': {
    background: '$green300',
  },
})
