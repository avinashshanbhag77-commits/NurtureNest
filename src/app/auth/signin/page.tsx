"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

function SignInContent() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace(callbackUrl);
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
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>Welcome Back</h2>

                {error && (
                    <div style={{
                        backgroundColor: '#FFEBEE',
                        color: '#C62828',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        textAlign: 'center',
                        fontSize: '0.9rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #e0e0e0',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid #e0e0e0',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <Button type="submit" fullWidth style={{ marginTop: '1rem' }}>Sign In</Button>
                </form>


                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
                    Don&apos;t have an account? <Link href="/auth/signup" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Sign up</Link>
                </p>
            </Card>
        </div>
    );
}

export default function SignIn() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
