'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('CHECK EMAIL TO VERIFY IDENTIY.');
            router.push('/login');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-16 px-4 relative z-10">
            <div className="w-full max-w-md bg-charcoal/50 p-8 border border-ash/10 backdrop-blur-md">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter mb-2 text-ash">
                    JOIN.
                </h1>
                <p className="font-mono text-ash/50 text-[10px] uppercase tracking-[0.2em] mb-8">
                    ONLY FOR THE MISFITS.
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            required
                            placeholder="EMAIL"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-ink border border-ash/20 font-mono text-xs uppercase p-3 text-ash placeholder-ash/30 focus:outline-none focus:border-ash transition-colors"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            required
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-ink border border-ash/20 font-mono text-xs uppercase p-3 text-ash placeholder-ash/30 focus:outline-none focus:border-ash transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ash text-ink font-syne font-bold uppercase py-3 hover:bg-electric transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'PROCESSING...' : 'CREATE IDENTITY'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="font-mono text-ash/40 text-[10px] uppercase tracking-widest">
                        ALREADY IN?{' '}
                        <Link href="/login" className="text-ash hover:text-electric transition-colors">
                            ENTER
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
