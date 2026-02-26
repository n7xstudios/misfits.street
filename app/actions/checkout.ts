'use server';

import { createClient } from '@/lib/supabase/server';
import { sendMetaCapiEvent } from '@/lib/analytics/meta-capi';
import { revalidatePath } from 'next/cache';

export async function processCheckout(itemIds: number[], totalValue: number) {
    const supabase = await createClient();

    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();

    // 2. Insert order into database
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
            user_id: user?.id || null,
            total_amount: totalValue,
            status: 'PROCESSING'
        }])
        .select()
        .single();

    if (orderError) throw new Error(orderError.message);

    // 3. Mark items as sold
    await supabase.from('products').update({ is_sold: true }).in('id', itemIds);

    // 4. Send Server-Side Purchase Event to Meta CAPI
    // This happens securely on the server, bypassing ad blockers
    await sendMetaCapiEvent({
        eventName: 'Purchase',
        value: totalValue,
        currency: 'INR',
        eventId: `order_${order.id}`,
        userEmail: user?.email, // In production, CAPI requires this to be hashed, but Graph API handles some basic parsing if permitted
        contents: itemIds.map(id => ({ id: id.toString(), quantity: 1, item_price: 0 })) // Basic mapping
    });

    revalidatePath('/shop');
    revalidatePath('/admin/orders');
    revalidatePath('/admin/products');

    return { success: true, orderId: order.id };
}
