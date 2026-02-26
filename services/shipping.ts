// Frontend service for Shiprocket shipping integration

export interface ServiceabilityResult {
    serviceable: boolean;
    courier_count: number;
    estimated_delivery: string | null;
    cheapest_rate: number | null;
    cheapest_courier: string | null;
    cod_available: boolean;
}

export interface OrderItem {
    id: number;
    name: string;
    sku?: string;
    units: number;
    selling_price: number;
    discount?: number;
}

export interface ShippingOrder {
    order_id: string;
    billing_customer_name: string;
    billing_last_name?: string;
    billing_address: string;
    billing_city: string;
    billing_pincode: string;
    billing_state: string;
    billing_country?: string;
    billing_email: string;
    billing_phone: string;
    order_items: OrderItem[];
    sub_total: number;
    payment_method?: 'Prepaid' | 'COD';
}

export async function checkServiceability(pincode: string): Promise<ServiceabilityResult> {
    const res = await fetch(`/api/shiprocket/serviceability?delivery_pincode=${pincode}`);

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Network error' }));
        throw new Error(err.error || 'Failed to check serviceability');
    }

    return res.json();
}

export async function createShippingOrder(order: ShippingOrder) {
    const res = await fetch(`/api/shiprocket/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Network error' }));
        throw new Error(err.error || 'Failed to create order');
    }

    return res.json();
}

export function generateOrderId(): string {
    return `MISFIT-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function getTrackingUrl(shipmentId: string): string {
    return `https://shiprocket.co/tracking/${shipmentId}`;
}

export const FREE_SHIPPING_THRESHOLD = 2999;

export function calculateShippingCost(subtotal: number, shippingRate: number | null): number {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return shippingRate || 99;
}
