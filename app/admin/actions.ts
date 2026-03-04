'use server';

import { createClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

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
    display_order?: number;
}

export type OrderStatus = 'paid' | 'packing' | 'shipped' | 'delivered';

export interface AdminOrder {
    id: number;
    created_at: string;
    user_email: string;
    total: number;
    status: OrderStatus;
    items: { title: string; price: number; image_url: string; quantity: number }[];
    tracking_number?: string;
    shipping_address?: string;
}

// ──────────────── PRODUCT ACTIONS ────────────────

export async function createProduct(product: Omit<AdminProduct, 'id'>) {
    await requireAdmin();
    const supabase = await createClient();

    const { data, error } = await supabase.from('products').insert([product]);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
    return data;
}

export async function updateProduct(id: number, fields: Partial<AdminProduct>) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('products').update(fields).eq('id', id);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
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

export async function bulkUpdateProducts(ids: number[], fields: Partial<AdminProduct>) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('products').update(fields).in('id', ids);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
}

export async function bulkDeleteProducts(ids: number[]) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('products').delete().in('id', ids);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/products');
    revalidatePath('/shop');
}

// ──────────────── ORDER ACTIONS ────────────────

export async function getOrders() {
    await requireAdmin();
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
}

export async function updateOrderStatus(orderId: number, status: OrderStatus) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/orders');
}

export async function updateOrderTracking(orderId: number, trackingNumber: string) {
    await requireAdmin();
    const supabase = await createClient();

    const { error } = await supabase
        .from('orders')
        .update({ tracking_number: trackingNumber, status: 'shipped' as OrderStatus })
        .eq('id', orderId);

    if (error) throw new Error(error.message);

    revalidatePath('/admin/orders');
}

// ──────────────── DASHBOARD STATS ────────────────

export async function getDashboardStats() {
    await requireAdmin();
    const supabase = await createClient();

    const [productsRes, ordersRes] = await Promise.all([
        supabase.from('products').select('id, price, is_sold'),
        supabase.from('orders').select('id, total, status, created_at'),
    ]);

    const products = productsRes.data || [];
    const orders = ordersRes.data || [];

    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter((o: any) => o.status === 'paid' || o.status === 'packing').length;
    const activeInventory = products.filter((p: any) => !p.is_sold).length;

    return { totalRevenue, pendingOrders, activeInventory, orders };
}
