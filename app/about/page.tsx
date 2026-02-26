import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
    title: 'ABOUT',
    description: "Misfits Street — One-of-one thrifted streetwear. Anti-waste, anti-boring.",
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'ABOUT // MISFITS STREET',
        description: "One-of-one thrifted streetwear. Anti-waste, anti-boring.",
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ABOUT // MISFITS STREET',
        description: "Misfits Street — One-of-one thrifted streetwear. Anti-waste, anti-boring.",
    },
};

export default function Page() {
    return <AboutClient />;
}
