import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import '@/styles/globals.css';

const BASE_URL = 'https://misfits.street';

export const metadata: Metadata = {
    title: {
        default: 'MISFITS STREET // Premium Streetwear Thrift',
        template: '%s // MISFITS STREET',
    },
    description: 'One-of-one thrifted streetwear. No restocks. No replicas. If it fits the misfit, it fits the bin.',
    metadataBase: new URL(BASE_URL),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'MISFITS STREET',
        title: 'MISFITS STREET // Premium Streetwear Thrift',
        description: 'One-of-one thrifted streetwear. No restocks. No replicas.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MISFITS STREET' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MISFITS STREET',
        description: 'One-of-one thrifted streetwear. No restocks. No replicas.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            name: 'Misfits Street',
            url: BASE_URL,
            description: 'Premium one-of-one thrifted streetwear. No restocks. No replicas.',
            foundingDate: '2026',
        },
        {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: BASE_URL,
            name: 'MISFITS STREET',
            publisher: { '@id': `${BASE_URL}/#organization` },
            potentialAction: {
                '@type': 'SearchAction',
                target: `${BASE_URL}/shop?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
            },
        },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:wght@400;700&family=Permanent+Marker&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="bg-ink text-ash antialiased">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
