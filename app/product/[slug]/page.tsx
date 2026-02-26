import type { Metadata } from 'next';
import { getProductBySlug, PRODUCTS } from '@/lib/store';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

const BASE_URL = 'https://misfits.street';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.title,
        description: product.description || `${product.title} — One-of-one streetwear from Misfits Street.`,
        alternates: {
            canonical: `/product/${slug}`,
        },
        openGraph: {
            title: `${product.title} // MISFITS STREET`,
            description: product.description || `${product.title} — One-of-one thrifted streetwear.`,
            images: [{ url: product.image, width: 600, height: 800, alt: product.title }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.title} // MISFITS STREET`,
            description: product.description || `${product.title} — One-of-one thrifted streetwear.`,
            images: [product.image],
        },
    };
}

export function generateStaticParams() {
    return PRODUCTS.map(p => ({ slug: p.slug }));
}

function ProductJsonLd({ slug }: { slug: string }) {
    const product = getProductBySlug(slug);
    if (!product) return null;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: product.description || `${product.title} — One-of-one thrifted streetwear.`,
        image: product.image,
        brand: {
            '@type': 'Brand',
            name: 'Misfits Street',
        },
        category: product.category,
        itemCondition: product.condition === 'DEADSTOCK'
            ? 'https://schema.org/NewCondition'
            : 'https://schema.org/UsedCondition',
        offers: {
            '@type': 'Offer',
            url: `${BASE_URL}/product/${product.slug}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: product.soldOut
                ? 'https://schema.org/SoldOut'
                : 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'Misfits Street',
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    return (
        <>
            <ProductJsonLd slug={slug} />
            <ProductDetailClient slug={slug} />
        </>
    );
}
