'use server';

import { headers } from 'next/headers';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;

interface CapiEventPayload {
    eventName: 'Purchase' | 'InitiateCheckout' | 'AddToCart' | 'ViewContent';
    eventTime?: number;
    eventId?: string; // Important for deduplication with client-side pixel
    userEmail?: string;
    userAgent?: string;
    clientIpAddress?: string;
    value?: number;
    currency?: string;
    contents?: Array<{ id: string; quantity: number; item_price: number }>;
}

export async function sendMetaCapiEvent(payload: CapiEventPayload) {
    if (!PIXEL_ID || !CAPI_TOKEN || CAPI_TOKEN.includes('your-capi')) {
        console.warn('Meta CAPI not configured. Skipping event.');
        return { success: false, reason: 'unconfigured' };
    }

    const h = await headers();
    const clientIpAddress = payload.clientIpAddress || h.get('x-forwarded-for') || h.get('x-real-ip');
    const userAgent = payload.userAgent || h.get('user-agent');

    const eventTime = payload.eventTime || Math.floor(Date.now() / 1000);
    const eventId = payload.eventId || `evt_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Hash user data if required. For standard CAPI, emails should be SHA256 hashed.
    // In this basic version, we demonstrate the structure. Production requires proper crypto hashing of PII.

    // Structure required by Facebook Graph API
    const data = [
        {
            event_name: payload.eventName,
            event_time: eventTime,
            event_id: eventId,
            action_source: 'website',
            user_data: {
                client_ip_address: clientIpAddress,
                client_user_agent: userAgent,
                // em: hashedEmail // If available
            },
            custom_data: {
                value: payload.value,
                currency: payload.currency || 'INR',
                contents: payload.contents
            }
        }
    ];

    try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${CAPI_TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        const result = await response.json();
        if (!response.ok) {
            console.error('Meta CAPI Error:', result);
            return { success: false, error: result };
        }

        return { success: true, eventId, result };

    } catch (error) {
        console.error('Failed to send Meta CAPI event:', error);
        return { success: false, error: (error as Error).message };
    }
}
