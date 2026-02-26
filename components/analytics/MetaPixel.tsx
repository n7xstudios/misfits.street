'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView', { event_source_url: url });
    }
};

export const trackEvent = (name: string, options = {}) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', name, options);
    }
};

function PixelEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!PIXEL_ID || PIXEL_ID.includes('your-pixel')) return;
        pageview(`${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`);
    }, [pathname, searchParams]);

    return null;
}

export default function MetaPixel() {
    if (!PIXEL_ID || PIXEL_ID.includes('your-pixel')) return null;

    return (
        <>
            <Suspense fallback={null}>
                <PixelEvents />
            </Suspense>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
          `,
                }}
            />
            {/* Fallback for disabled JS */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                    alt="Meta Pixel"
                />
            </noscript>
        </>
    );
}
