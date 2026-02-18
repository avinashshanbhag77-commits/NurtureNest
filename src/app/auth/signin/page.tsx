"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

export default function SignIn() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}

function SignInContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get callbackUrl and ensure it's a string, defaulting to dashboard
    const rawCallbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    // Normalize callbackUrl to be relative if it points to the same host
    const callbackUrl = React.useMemo(() => {
        try {
            if (rawCallbackUrl.startsWith('http')) {
                const url = new URL(rawCallbackUrl);
                if (typeof window !== 'undefined' && url.host === window.location.host) {
                    return url.pathname + url.search;
                }
            }
        } catch (e) {
            console.error("Error parsing callbackUrl:", e);
        }
        return rawCallbackUrl;
    }, [rawCallbackUrl]);

    useEffect(() => {
        if (status === 'authenticated') {
            console.log("Authenticated detected, auto-redirecting to:", callbackUrl);
            router.push(callbackUrl);
        }
    }, [status, callbackUrl, router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await signIn('credentials', {
                email,
                password,
                callbackUrl: callbackUrl,
                redirect: true,
            });

            if (res?.error) {
                setError(res.error);
                return;
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <Card style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ color: 'var(--primary-color)', fontSize: '1.75rem', fontWeight: 700 }}>Welcome Back</h2>
                    <p style={{ color: '#666', marginTop: '0.5rem' }}>{status === 'loading' ? 'Verifying session...' : 'Sign in to your account'}</p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#FFEBEE',
                        color: '#C62828',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #e0e0e0',
                                outline: 'none',
                                fontSize: '1rem',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Password</label>
                            <Link href="/auth/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--primary-color)', textDecoration: 'none' }}>Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.85rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #e0e0e0',
                                outline: 'none',
                                fontSize: '1rem',
                                transition: 'border-color 0.2s'
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        fullWidth
                        size="md"
                        disabled={status === 'loading'}
                        style={{ marginTop: '0.5rem', padding: '1rem' }}
                    >
                        {status === 'loading' ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div style={{ position: 'relative', margin: '2rem 0', textAlign: 'center' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                    <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '0 0.75rem', color: '#999', fontSize: '0.8rem' }}>OR</span>
                </div>

                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Don&apos;t have an account? <Link href="/auth/signup" style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>Create an account</Link>
                </p>
            </Card>
        </div>
    );
}
