import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Image curtain reveal: a solid overlay wipes away (scaleX 1→0) when the
 * element enters the viewport. Attach wrapRef to the container div that has
 * class="curtain-wrap", and curtainRef to the inner div with class="curtain".
 */
export function useImageCurtain() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const curtainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const curtain = curtainRef.current;
        if (!wrap || !curtain) return;

        gsap.set(curtain, { scaleX: 1, transformOrigin: 'left center' });

        const st = ScrollTrigger.create({
            trigger: wrap,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(curtain, {
                    scaleX: 0,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    transformOrigin: 'right center',
                });
            },
            once: true,
        });

        return () => st.kill();
    }, []);

    return { wrapRef, curtainRef };
}
