// store.ts — Product data for Misfits Street (INR pricing)

export interface Product {
    id: number;
    slug: string;
    title: string;
    price: number;
    image: string;
    category: 'TEES' | 'JACKETS' | 'PANTS' | 'HATS' | 'HOODIES';
    size: string;
    condition: 'DEADSTOCK' | 'EXCELLENT' | 'VERY GOOD' | 'GOOD' | 'DISTRESSED';
    soldOut?: boolean;
    isNew?: boolean;
    description?: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        slug: 'utility-bomber-v2',
        title: 'Utility Bomber_V2',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
        category: 'JACKETS',
        size: 'L',
        condition: 'VERY GOOD',
        isNew: true,
        description: 'Military-grade utility bomber. Patched, beaten, perfect. One previous owner who clearly had taste.',
    },
    {
        id: 2,
        slug: 'acid-wash-tee',
        title: 'Acid Wash Tee',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        category: 'TEES',
        size: 'M',
        condition: 'EXCELLENT',
        isNew: true,
        description: 'Classic acid wash with that perfect vintage fade. Soft like butter, loud like a concert.',
    },
    {
        id: 3,
        slug: 'cargo-pant-mk3',
        title: 'Cargo Pant_MK3',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
        category: 'PANTS',
        size: '32',
        condition: 'VERY GOOD',
        description: 'Six pockets of pure utility. Tapered fit. The kind of cargos that make people ask where you got them.',
    },
    {
        id: 4,
        slug: 'vintage-hoodie-og',
        title: 'Vintage Hoodie_OG',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
        category: 'HOODIES',
        size: 'XL',
        condition: 'GOOD',
        description: 'Heavyweight cotton. Faded in all the right places. The hoodie equivalent of a worn-in leather jacket.',
    },
    {
        id: 5,
        slug: 'distressed-denim',
        title: 'Distressed Denim',
        price: 3499,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
        category: 'PANTS',
        size: '30',
        condition: 'DISTRESSED',
        soldOut: true,
        description: 'Naturally distressed over years. Every rip tells a story. Gone before you knew it existed.',
    },
    {
        id: 6,
        slug: 'puffer-vest-archive',
        title: 'Puffer Vest_Archive',
        price: 3999,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
        category: 'JACKETS',
        size: 'M',
        condition: 'EXCELLENT',
        isNew: true,
        description: 'From the archive. Down-filled, lightweight, and impossibly warm. Layer it over everything.',
    },
    {
        id: 7,
        slug: 'bucket-hat-og',
        title: 'Bucket Hat_OG',
        price: 999,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
        category: 'HATS',
        size: 'OS',
        condition: 'VERY GOOD',
        description: 'The bucket hat your favourite rapper wishes they had. One size. One-of-one.',
    },
    {
        id: 8,
        slug: 'flannel-overshirt',
        title: 'Flannel Overshirt',
        price: 1999,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
        category: 'TEES',
        size: 'L',
        condition: 'GOOD',
        description: 'Thick flannel. Wear it open, wear it buttoned, throw it over your shoulder. Always works.',
    },
    {
        id: 9,
        slug: 'track-pant-90s',
        title: 'Track Pant_90s',
        price: 1799,
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
        category: 'PANTS',
        size: 'M',
        condition: 'VERY GOOD',
        soldOut: true,
        description: '90s side-stripe track pants. The kind you see in old hip-hop videos. Gone.',
    },
    {
        id: 10,
        slug: 'snapback-rare',
        title: 'Snapback_Rare',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',
        category: 'HATS',
        size: 'OS',
        condition: 'EXCELLENT',
        description: 'Rare snapback from a limited collab that nobody remembers. Which makes it even better.',
    },
    {
        id: 11,
        slug: 'leather-moto-jacket',
        title: 'Leather Moto Jacket',
        price: 7999,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
        category: 'JACKETS',
        size: 'S',
        condition: 'VERY GOOD',
        isNew: true,
        description: 'Real leather. Real patina. The kind of jacket that gets better every year you wear it.',
    },
    {
        id: 12,
        slug: 'graphic-tee-misfit',
        title: 'Graphic Tee_MISFIT',
        price: 1199,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
        category: 'TEES',
        size: 'M',
        condition: 'DEADSTOCK',
        isNew: true,
        description: 'Never worn. Original tags still on. Custom graphic print exclusive to Misfits Street.',
    },
];

export const CATEGORIES = ['ALL', 'TEES', 'HOODIES', 'JACKETS', 'PANTS', 'HATS'] as const;
export type Category = (typeof CATEGORIES)[number];

export function formatPrice(price: number): string {
    return `₹${price.toLocaleString('en-IN')}`;
}

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find(p => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
    return PRODUCTS.find(p => p.id === id);
}
