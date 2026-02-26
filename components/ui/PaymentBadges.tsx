export default function PaymentBadges() {
    return (
        <div className="flex flex-wrap gap-4 items-center justify-start opacity-30 mt-6">
            <span className="font-mono text-[8px] tracking-widest uppercase items-center flex gap-1 border border-ash pb-0.5 px-1.5 pt-1 rounded-sm">Visa</span>
            <span className="font-mono text-[8px] tracking-widest uppercase items-center flex gap-1 border border-ash pb-0.5 px-1.5 pt-1 rounded-sm">MasterCard</span>
            <span className="font-mono text-[8px] tracking-widest uppercase items-center flex gap-1 border border-ash pb-0.5 px-1.5 pt-1 rounded-sm">Amex</span>
            <span className="font-mono text-[8px] tracking-widest uppercase items-center flex gap-1 border border-ash pb-0.5 px-1.5 pt-1 rounded-sm">UPI</span>
            <span className="font-mono text-[8px] tracking-widest uppercase items-center flex border-l-2 pl-2 border-ash/50 text-ash ml-2">SSL SECURED</span>
        </div>
    );
}
