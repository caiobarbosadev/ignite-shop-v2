import { AppProps } from 'next/app';
import Image from 'next/image';
import { globalStyles } from '../styles/global';
import { Container, Header, CartButton, Tag } from '../styles/pages/app';
import logoImg from '../assets/logo.svg';
import { Handbag } from '@phosphor-icons/react';
import CartComponent from '../components/CartComponent';
import { useState, createContext } from 'react';

globalStyles();

interface ProductProps {
  id: string,
  name: string,
  price: string,
  imageUrl: string,
  priceId: string
}

// Interface para o contexto do carrinho
interface CartContextProps {
  cart: ProductProps[];
  setCart: React.Dispatch<React.SetStateAction<ProductProps[]>>;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => { },
});

export default function App({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<ProductProps[]>([]);

  function openCart() {
    setIsCartOpen(true);
  }

  return (
    <Container>
      <Header>
        <Image src={logoImg} alt="Ignite Shop" />
        <CartButton onClick={openCart}>
          <Handbag size={24} />
          {cart.length > 0 ? <Tag>{cart.length}</Tag> : null}
        </CartButton>
      </Header>

      <CartContext.Provider value={{ cart, setCart }}>
        {isCartOpen ? <CartComponent setIsCartOpen={setIsCartOpen} /> : null}
        <Component {...pageProps} />
      </CartContext.Provider>
    </Container>
  );
}
