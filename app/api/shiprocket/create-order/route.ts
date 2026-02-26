import { NextRequest, NextResponse } from 'next/server';

const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external';

async function getToken(): Promise<string> {
    const email = process.env.SHIPROCKET_EMAIL;
    const password = process.env.SHIPROCKET_PASSWORD;

    if (!email || !password) {
        throw new Error('Shiprocket credentials not configured');
    }

    const res = await fetch(`${SHIPROCKET_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Shiprocket auth failed');
    const data = await res.json();
    return data.token;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = await getToken();

        const {
            order_id,
            order_date,
            billing_customer_name,
            billing_last_name,
            billing_address,
            billing_city,
            billing_pincode,
            billing_state,
            billing_country,
            billing_email,
            billing_phone,
            order_items,
            sub_total,
            payment_method,
            shipping_is_billing = true,
        } = body;

        if (!order_id || !billing_customer_name || !billing_phone || !billing_pincode || !order_items?.length) {
            return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 });
        }

        const orderPayload = {
            order_id,
            order_date: order_date || new Date().toISOString().split('T')[0],
            pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
            billing_customer_name,
            billing_last_name: billing_last_name || '',
            billing_address,
            billing_city,
            billing_pincode: String(billing_pincode),
            billing_state,
            billing_country: billing_country || 'India',
            billing_email,
            billing_phone: String(billing_phone),
            shipping_is_billing,
            order_items: order_items.map((item: any) => ({
                name: item.name,
                sku: item.sku || `MISFIT-${item.id}`,
                units: item.units || 1,
                selling_price: item.selling_price,
                discount: item.discount || 0,
            })),
            payment_method: payment_method || 'Prepaid',
            sub_total,
            length: 30,
            breadth: 20,
            height: 5,
            weight: 0.5,
        };

        const response = await fetch(`${SHIPROCKET_BASE}/orders/create/adhoc`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to create Shiprocket order', details: data }, { status: response.status });
        }

        return NextResponse.json({
            success: true,
            order_id: data.order_id,
            shipment_id: data.shipment_id,
            status: data.status,
            message: 'Order created successfully',
        });
    } catch (err: any) {
        console.error('Shiprocket order creation error:', err);
        return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
    }
}
