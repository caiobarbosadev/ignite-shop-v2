import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: '100vh',
    position: 'relative'
})

export const Header = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
})

export const CartButton = styled('button', {
    background: '$gray800',
    borderRadius: 6,
    width: '3rem',
    height: '3rem',
    border: 'none',
    color: '$white',
    cursor: 'pointer',
    position: 'relative'
})

export const Tag = styled('span', {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    background: '$green300',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: '3px solid $gray900'
})