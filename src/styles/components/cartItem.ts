import { styled } from '..'

export const Item = styled('li', {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'left',
})

export const ItemHeader = styled('header', {
  lineHeight: 1.6,
  h3: {
    color: '$gray300',
    fontSize: '$md',
    fontWeight: 400,
  },
  strong: {
    color: '$gray100',
    fontSize: '$md',
  },
})

export const ItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  span: {
    color: '$green500',
    fontSize: '1rem',
    lineHeight: 1.6,
    fontWeight: 'bold',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const SmallImageContainer = styled('div', {
  width: 100,
  height: 100,
  background: 'linear-gradient(180deg, #1ea483 0%, #6850FF 100%)',
  borderRadius: 8,
  img: {
    objectFit: 'cover',
  },
})
