import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/store';
import ShopPage from './ShopClient';

const BASE_URL = 'https://misfits.street';

export const metadata: Metadata = {
    title: 'SHOP',
    description: 'Browse all one-of-one thrifted streetwear. Tees, hoodies, jackets, pants, hats.',
    alternates: {
        canonical: '/shop',
    },
    openGraph: {
        title: 'SHOP // MISFITS STREET',
        description: 'Browse all one-of-one thrifted streetwear.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SHOP // MISFITS STREET',
        description: 'Browse all one-of-one thrifted streetwear. Tees, hoodies, jackets, pants, hats.',
    },
};

function ShopJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Shop — Misfits Street',
        description: 'Browse all one-of-one thrifted streetwear.',
        url: `${BASE_URL}/shop`,
        isPartOf: { '@id': `${BASE_URL}/#website` },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: PRODUCTS.filter(p => !p.soldOut).length,
            itemListElement: PRODUCTS.filter(p => !p.soldOut).map((product, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${BASE_URL}/product/${product.slug}`,
                name: product.title,
            })),
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default function Page() {
    return (
        <>
            <ShopJsonLd />
            <ShopPage />
        </>
    );
}
