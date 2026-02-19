import { useEffect, useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?';
const FRAME_RATE = 3; // frames per character reveal

/**
 * Text scramble / decrypt effect.
 * Returns { ref, trigger } — attach ref to element, call trigger() to start.
 */
export function useTextScramble<T extends HTMLElement>(finalText: string) {
    const ref = useRef<T>(null);
    const frameRef = useRef(0);
    const rafRef = useRef<number>(0);

    const trigger = useCallback(() => {
        const el = ref.current;
        if (!el) return;

        let frame = 0;
        const length = finalText.length;

        const update = () => {
            let output = '';
            const revealed = Math.floor(frame / FRAME_RATE);

            for (let i = 0; i < length; i++) {
                if (finalText[i] === ' ') {
                    output += ' ';
                } else if (i < revealed) {
                    output += finalText[i];
                } else {
                    output += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }

            el.textContent = output;
            frame++;

            if (revealed < length) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                el.textContent = finalText;
            }
        };

        cancelAnimationFrame(rafRef.current);
        frame = 0;
        rafRef.current = requestAnimationFrame(update);
    }, [finalText]);

    // Auto-trigger on IntersectionObserver
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    trigger();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, [trigger]);

    return { ref, trigger };
}
