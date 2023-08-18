import Image from "next/image"
import emptyCart from '../assets/empty-cart.png'
import { EmptyCartContainer } from "../styles/components/emptyCart"

export default function EmptyCart() {
    return (
        <EmptyCartContainer>
            <h3>😥 Carrinho vazio...</h3>
            <Image className='empty-cart-image' src={emptyCart} alt="Carrinho vazio" />
        </EmptyCartContainer>
    )
}