import Image from 'next/image'

import { Cart, CartBottom, CartTop, CheckoutButton, CloseButton, Product, ProductsList } from '../styles/components/cart'
import { X } from '@phosphor-icons/react'
import { CartContext } from '../pages/_app';
import { useContext, useState } from 'react'
import EmptyCart from './EmptyCart';
import axios from 'axios';

interface CartComponentProps {
    setIsCartOpen: (isCartOpen: boolean) => void;
}

export default function CartComponent({ setIsCartOpen }: CartComponentProps) {
    const { cart, setCart } = useContext(CartContext)
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

    const products = cart.map(product => {
        return {
            price: product.priceId,
            quantity: 1
        };
    });

    async function handleBuyProducts() {
        try {
            setIsCreatingCheckoutSession(true)

            const response = await axios.post('/api/checkout', {
                products
            })

            const { checkoutUrl } = response.data

            window.location.href = checkoutUrl
        } catch (error) {
            console.log(error)

            setIsCreatingCheckoutSession(false)

            alert('Falha ao redirecionar ao checkout!')
        }
    }

    function handleRemoveProductFromCart(productId: string) {
        const newCart = cart.filter(product => {
            return product.id != productId
        })

        setCart(newCart)
    }

    const prices = cart.map(product => {
        return product.price
    })

    const totalValue = prices.reduce((accumulator, price) => {
        const numericValue = parseFloat(price.replace('R$', '').replace(',', '.'));
        return accumulator + numericValue;
    }, 0);

    return (
        <Cart>
            <CloseButton onClick={() => { setIsCartOpen(false) }}>
                <X size={24} />
            </CloseButton>

            {cart.length > 0 ? (
                <>
                    <CartTop>
                        <h2>Sacola de compras</h2>

                        <ProductsList>
                            {cart.map(product => {
                                return (
                                    <Product key={product.id}>
                                        <div className='background-product-image'>
                                            <Image className='product-image' width={100} height={100} src={product.imageUrl} alt=''></Image>
                                        </div>

                                        <div className='product-details'>
                                            <span className='product-name'>{product.name}</span>
                                            <span className='product-price'>{product.price}</span>
                                            <button
                                                className='remove-product-button'
                                                onClick={() => { handleRemoveProductFromCart(product.id) }}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </Product>
                                )
                            })}
                        </ProductsList>
                    </CartTop>

                    <CartBottom>
                        <div className='quantity-container'>
                            <span className='quantity-description'>Quantidade</span>
                            <span className='quantity-items'>
                                {cart.length} {cart.length === 1 ? 'item' : 'itens'}
                            </span>
                        </div>

                        <div className='value-container'>
                            <span className='value-description'>Valor total</span>
                            <span className='value'>
                                {
                                    new Intl.NumberFormat(
                                        'pt-BR',
                                        { style: 'currency', currency: 'BRL' }
                                    ).format(totalValue)
                                }
                            </span>
                        </div>

                        <CheckoutButton
                            disabled={isCreatingCheckoutSession}
                            onClick={handleBuyProducts}
                        >
                            Finalizar compra
                        </CheckoutButton>
                    </CartBottom>
                </>) : <EmptyCart />}
        </Cart>
    )
}