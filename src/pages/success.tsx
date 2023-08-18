import Link from "next/link";
import Image from "next/image";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { GetServerSideProps } from "next";
import { stripe } from "../lib/stripe";
import Head from "next/head";

interface ProductData {
    // Define as propriedades relevantes do produto do Stripe aqui
    price: {
        product: {
            images: string[];
            // Outras propriedades do produto...
        };
        // Outras propriedades do preço...
    };
    // Outras propriedades do item de linha...
}

interface SuccessProps {
    customerName: string;
    products: ProductData[];
}

export default function Success({ customerName, products }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>

            <SuccessContainer>
                <h1>Compra efetuada</h1>

                <div className="success-container-products">
                    {products.map((product, index) => (
                        <ImageContainer key={index}>
                            <Image style={{ zIndex: index }} src={product.price.product.images[0]} width={130} height={145} alt="" />
                        </ImageContainer>
                    ))}
                </div>

                <p>
                    Uhuul <strong>{customerName}</strong>, sua compra de {products.length} {products.length === 1 ? 'camiseta' : 'camisetas'} já está a caminho da sua casa.
                </p>

                <Link href="/">Voltar ao catálogo</Link>
            </SuccessContainer>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.session_id) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name
    const products = session.line_items!.data

    return {
        props: {
            customerName,
            products
        }
    }
}
