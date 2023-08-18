import { HomeContainer, Product } from "../styles/pages/home";
import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Handbag } from "@phosphor-icons/react";
import { useContext } from "react";
import { CartContext } from "./_app";

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
}

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  const { cart, setCart } = useContext(CartContext)

  function handleAddProductOnCart(product: Product) {
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
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image
                  src={product.imageUrl}
                  width={520}
                  height={480}
                  alt={product.name}
                />

                <footer>
                  <div className="footer-product-details">
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button
                    type="button"
                    className="add-product-to-cart-button"
                    onClick={
                      (event) => {
                        event.preventDefault();
                        handleAddProductOnCart(product)
                      }
                    }
                  >
                    <Handbag size={24} />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat(
        'pt-br',
        { style: 'currency', currency: 'BRL' }
      ).format(price.unit_amount! / 100),
      priceId: price.id
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}