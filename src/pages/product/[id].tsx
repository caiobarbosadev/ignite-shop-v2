import { stripe } from "@/src/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Stripe from "stripe"
import Image from "next/image"
import { useContext } from "react"
import Head from "next/head"
import { CartContext } from "../_app"

export interface ProductProps {
    product: {
        id: string;
        name: string;
        imageUrl: string;
        price: string;
        description: string;
        priceId: string;
    }
}

export default function Product({ product }: ProductProps) {
    const { cart, setCart } = useContext(CartContext);

    function handleAddProductOnCart() {
        const isProductInCart = cart.some(cartProduct => cartProduct.id === product.id)

        if (!isProductInCart) {
            setCart([...cart, product])

            return
        }

        alert('Este produto já está no carrinho!')
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>

            <ProductContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt=""></Image>
                </ImageContainer>

                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{product.price}</span>

                    <p>{product.description}</p>

                    <button onClick={handleAddProductOnCart}>Colocar na sacola</button>
                </ProductDetails>
            </ProductContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productId = params!.id

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat(
                    'pt-br',
                    { style: 'currency', currency: 'BRL' }
                ).format(price.unit_amount! / 100),
                description: product.description,
                priceId: price.id
            }
        },
        revalidate: 60 * 60 * 1 // 1 hour
    }
}