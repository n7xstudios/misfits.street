import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
    <footer id="site-footer" className="w-full bg-ink border-t border-ash/10 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-syne font-extrabold text-ash text-2xl uppercase tracking-tighter mb-3">
                        MISFITS ST.
                    </h3>
                    <p className="font-marker text-acid text-sm -rotate-1 mb-4">"wear your weird."</p>
                    <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest leading-relaxed">
                        Premium thrift & streetwear.<br />
                        One-of-one. No restocks. Ever.
                    </p>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="font-mono text-[9px] text-acid uppercase tracking-[0.3em] mb-4">SHOP</h4>
                    <ul className="space-y-2">
                        <li><Link to="/shop" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">All Items</Link></li>
                        <li><Link to="/shop" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">New Drops</Link></li>
                        <li><Link to="/shop" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Jackets</Link></li>
                        <li><Link to="/shop" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Tees</Link></li>
                        <li><Link to="/shop" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Pants</Link></li>
                    </ul>
                </div>

                {/* Info */}
                <div>
                    <h4 className="font-mono text-[9px] text-acid uppercase tracking-[0.3em] mb-4">INFO</h4>
                    <ul className="space-y-2">
                        <li><Link to="/about" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">About</Link></li>
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Sizing</a></li>
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Shipping</a></li>
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Returns (lol)</a></li>
                    </ul>
                </div>

                {/* Connect */}
                <div>
                    <h4 className="font-mono text-[9px] text-acid uppercase tracking-[0.3em] mb-4">CONNECT</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Instagram</a></li>
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">TikTok</a></li>
                        <li><a href="#" className="font-mono text-[10px] text-silver/40 hover:text-ash uppercase tracking-wider transition-colors duration-200">Discord</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-ash/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-mono text-[9px] text-silver/20 uppercase tracking-widest">
                    © 2026 MISFITS STREET // ALL RIGHTS RESERVED
                </p>
                <div className="flex gap-6">
                    {['PRIVACY', 'TERMS'].map(item => (
                        <a key={item} href="#" className="font-mono text-[9px] text-silver/20 hover:text-acid uppercase tracking-widest transition-colors">
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Big watermark */}
            <div className="mt-8 overflow-hidden">
                <p
                    className="font-syne font-extrabold text-ash/5 uppercase leading-none select-none"
                    style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', letterSpacing: '-0.04em' }}
                    aria-hidden="true"
                >
                    MISFITS
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
