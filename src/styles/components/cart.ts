import { styled } from '..'

export const MainContainer = styled('main', {
  width: '480px',
  maxWidth: '480px',
  height: '100vh',
  padding: 48,
  background: '$gray800',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const BtnWrap = styled('div', {
  width: '100%',
  textAlign: 'right',
})

export const CloseBtn = styled('button', {
  background: 'transparent',
  color: '#8D8D99',
  border: 0,
  cursor: 'pointer',

  '&:hover': {
    color: '$gray300',
  },
})

export const ListContainer = styled('section', {
  h2: {
    fontSize: '$lg',
    color: '$gray100',
  },
  ul: {
    listStyle: 'none',
    height: '50vh',
    overflowY: 'auto',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
})

export const ItemFooter = styled('footer', {
  color: '$gray100',
  fontSize: '$md',
  div: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: 1.6,
  },
  button: {
    marginTop: '5vh',

    background: '$green500',
    color: 'white',
    borderRadius: 8,
    padding: 20,
    cursor: 'pointer',
    width: '100%',
    border: 0,
    fontSize: '$md',
    fontWeight: 'bold',

    '&:hover': {
      background: '$green300',
    },
  },
})
