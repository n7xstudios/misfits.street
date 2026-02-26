import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/lib/store';

const BASE_URL = 'https://misfits.street';

export default function sitemap(): MetadataRoute.Sitemap {
    const productRoutes = PRODUCTS.map(product => ({
        url: `${BASE_URL}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...productRoutes,
    ];
}
