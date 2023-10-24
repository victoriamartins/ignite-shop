import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    padding: 12,
    background: '$gray800',
    borderRadius: 6,
    border: 0,
    cursor: 'pointer',
    color: '$gray300',
    transition: 'all 0.1s',

    '&:hover': {
      color: '$white',
      background: '$gray800',
    },
  },
})
