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

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const delivery_pincode = searchParams.get('delivery_pincode');
    const pickup_pincode = searchParams.get('pickup_pincode');
    const weight = searchParams.get('weight') || '0.5';
    const cod = searchParams.get('cod') || '0';

    if (!delivery_pincode) {
        return NextResponse.json({ error: 'delivery_pincode is required' }, { status: 400 });
    }

    try {
        const token = await getToken();

        const params = new URLSearchParams({
            pickup_postcode: pickup_pincode || process.env.SHIPROCKET_PICKUP_PINCODE || '110001',
            delivery_postcode: delivery_pincode,
            weight,
            cod,
        });

        const response = await fetch(
            `${SHIPROCKET_BASE}/courier/serviceability/?${params}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json({ error: 'Shiprocket API error', details: errorData }, { status: response.status });
        }

        const data = await response.json();
        const couriers = data.data?.available_courier_companies || [];
        const cheapest = couriers.length > 0
            ? couriers.reduce((min: any, c: any) => (c.rate < min.rate ? c : min), couriers[0])
            : null;

        return NextResponse.json({
            serviceable: couriers.length > 0,
            courier_count: couriers.length,
            estimated_delivery: cheapest?.estimated_delivery_days || null,
            cheapest_rate: cheapest?.rate || null,
            cheapest_courier: cheapest?.courier_name || null,
            cod_available: couriers.some((c: any) => c.cod === 1),
        });
    } catch (err: any) {
        console.error('Shiprocket serviceability error:', err);
        return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
    }
}
