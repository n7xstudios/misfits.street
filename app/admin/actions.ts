'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

// Mock product structure matching our new schema
export interface AdminProduct {
    id?: number;
    slug: string;
    title: string;
    price: number;
    image_url: string;
    category: 'TEES' | 'JACKETS' | 'PANTS' | 'HATS' | 'HOODIES';
    size: string;
    condition: 'DEADSTOCK' | 'EXCELLENT' | 'VERY GOOD' | 'GOOD' | 'DISTRESSED';
    is_sold: boolean;
    is_new: boolean;
    description: string;
}

export async function createProduct(product: Omit<AdminProduct, 'id'>) {
    await requireAdmin(); // Block if not admin
    const supabase = await createClient();

    const { data, error } = await supabase.from('products').insert([product]);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop'); // Refresh public shop
    return data;
}

export async function deleteProduct(id: number) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
}

export async function toggleProductSoldStatus(id: number, currentStatus: boolean) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('products').update({ is_sold: !currentStatus }).eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
}
