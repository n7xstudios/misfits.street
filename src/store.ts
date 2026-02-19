// store.ts — Mock product data for Misfits Street
// 12 one-of-one items across 5 categories

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    textureUrl?: string; // For 3D projection
    category: 'TEES' | 'JACKETS' | 'PANTS' | 'HATS' | 'HOODIES';
    size: string;
    condition: 'DEADSTOCK' | 'EXCELLENT' | 'VERY GOOD' | 'GOOD' | 'DISTRESSED';
    soldOut?: boolean;
    isNew?: boolean;
    height?: number; // for masonry layout variation
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        title: 'Utility Bomber_V2',
        price: 240,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
        category: 'JACKETS',
        size: 'L',
        condition: 'VERY GOOD',
        isNew: true,
        height: 420,
    },
    {
        id: 2,
        title: 'Acid Wash Tee',
        price: 85,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        category: 'TEES',
        size: 'M',
        condition: 'EXCELLENT',
        isNew: true,
        height: 340,
    },
    {
        id: 3,
        title: 'Cargo Pant_MK3',
        price: 180,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
        category: 'PANTS',
        size: '32',
        condition: 'VERY GOOD',
        height: 480,
    },
    {
        id: 4,
        title: 'Vintage Hoodie_OG',
        price: 120,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
        category: 'HOODIES',
        size: 'XL',
        condition: 'GOOD',
        height: 360,
    },
    {
        id: 5,
        title: 'Distressed Denim',
        price: 160,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
        category: 'PANTS',
        size: '30',
        condition: 'DISTRESSED',
        soldOut: true,
        height: 400,
    },
    {
        id: 6,
        title: 'Puffer Vest_Archive',
        price: 195,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80',
        category: 'JACKETS',
        size: 'M',
        condition: 'EXCELLENT',
        isNew: true,
        height: 440,
    },
    {
        id: 7,
        title: 'Bucket Hat_OG',
        price: 55,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80',
        category: 'HATS',
        size: 'OS',
        condition: 'VERY GOOD',
        height: 300,
    },
    {
        id: 8,
        title: 'Flannel Overshirt',
        price: 110,
        image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
        category: 'TEES',
        size: 'L',
        condition: 'GOOD',
        height: 380,
    },
    {
        id: 9,
        title: 'Track Pant_90s',
        price: 95,
        image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80',
        category: 'PANTS',
        size: 'M',
        condition: 'VERY GOOD',
        soldOut: true,
        height: 360,
    },
    {
        id: 10,
        title: 'Snapback_Rare',
        price: 70,
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80',
        category: 'HATS',
        size: 'OS',
        condition: 'EXCELLENT',
        height: 320,
    },
    {
        id: 11,
        title: 'Leather Moto Jacket',
        price: 380,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
        category: 'JACKETS',
        size: 'S',
        condition: 'VERY GOOD',
        isNew: true,
        height: 460,
    },
    {
        id: 12,
        title: 'Graphic Tee_MISFIT',
        price: 65,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
        textureUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
        category: 'TEES',
        size: 'M',
        condition: 'DEADSTOCK',
        isNew: true,
        height: 340,
    },
];

export const CATEGORIES = ['ALL', 'TEES', 'HOODIES', 'JACKETS', 'PANTS', 'HATS'] as const;
export type Category = typeof CATEGORIES[number];
