import { styled } from "..";

export const Cart = styled('div', {
    width: '30rem',
    height: '100%',
    background: '$gray800',
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: 999,
    boxShadow: '-4px 0px 30px 0px rgba(0, 0, 0, 0.80)',
    padding: '3rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    h2: {
        fontSize: '$lg',
        fontWeight: 700,
        lineHeight: '160%',
        marginBottom: '2rem'
    },
})

export const CartTop = styled('div', {
    overflowY: 'auto',
    marginBottom: '2rem'
})

export const ProductsList = styled('div', {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
})

export const Product = styled('div', {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    '.background-product-image': {
        width: 100,
        height: 100,
        borderRadius: 8,
        background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    '.product-image': {
        width: '100%',
        height: '100%'
    },

    '.product-details': {
        display: 'flex',
        flexDirection: 'column',

        '.product-name': {
            color: '$gray300',
            fontSize: '$md',
            lineHeight: '160%',
            marginBottom: 2
        },

        '.product-price': {
            color: '$gray100',
            fontSize: '$md',
            fontWeight: 700,
            lineHeight: '160%',
            marginBottom: 8
        },

        '.remove-product-button': {
            color: '$green500',
            fontSize: '1rem',
            fontWeight: 700,
            lineHeight: '160%',
            background: 'none',
            border: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            width: 'min-content'
        }
    }
})

export const CartBottom = styled('div', {
    '.quantity-container': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        color: '$gray300',

        '.quantity-description': {
            fontSize: '$md',
        },

        '.quantity-items': {
            fontSize: '$lg',
        }
    },

    '.value-container': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '$gray100',

        '.value-description': {
            fontSize: '$md',
            fontWeight: 'bold'
        },

        '.value': {
            fontSize: '$lg',
            fontWeight: 'bold'
        }
    }
})

export const CheckoutButton = styled('button', {
    width: '100%',
    background: '$green500',
    padding: '20px 2rem',
    border: 'none',
    borderRadius: 8,
    color: '$white',
    fontWeight: 700,
    fontSize: '$md',
    cursor: 'pointer',
    marginTop: '3rem',

    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
        backgroundColor: '$green300',
    }
})

export const CloseButton = styled('button', {
    position: 'absolute',
    right: 24,
    top: 24,
    background: 'none',
    border: 'none',
    color: '$gray100',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
})