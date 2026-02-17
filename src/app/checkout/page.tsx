"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { CreditCard, Lock, ShieldCheck, ChevronLeft } from 'lucide-react';
import LoadingEvolution from '@/components/LoadingEvolution';

const CheckoutContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tier = searchParams.get('tier') || 'pro';

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '4242 4242 4242 4242',
        expiry: '12/26',
        cvc: '123',
        name: ''
    });

    const getPrice = () => {
        if (tier === 'pro') return '$10/month';
        if (tier === 'annual') return '$100/year';
        return '$0';
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(async () => {
            try {
                const res = await fetch('/api/user/upgrade', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tier })
                });

                if (res.ok) {
                    alert('Payment Successful! Your account has been upgraded.');
                    router.push('/dashboard');
                } else {
                    alert('Payment failed. Please try again.');
                }
            } catch (error) {
                console.error('Payment error', error);
                alert('An error occurred during payment.');
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="checkout-page container" style={{ padding: '4rem 1rem', maxWidth: '900px' }}>
            <span onClick={() => router.back()} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', marginBottom: '2rem' }}>
                <ChevronLeft size={20} /> Back
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <Card>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <CreditCard color="var(--primary-color)" /> Payment Details
                    </h2>

                    <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Cardholder Name</label>
                            <input
                                required
                                type="text"
                                placeholder="Jane Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Card Number</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    required
                                    type="text"
                                    value={formData.cardNumber}
                                    readOnly
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', backgroundColor: '#f9f9f9', color: '#666' }}
                                />
                                <Lock size={16} color="#aaa" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Expiry Date</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.expiry}
                                    readOnly
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', backgroundColor: '#f9f9f9', color: '#666' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>CVC</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.cvc}
                                    readOnly
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', backgroundColor: '#f9f9f9', color: '#666' }}
                                />
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <ShieldCheck color="#0ea5e9" size={24} />
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#0369a1' }}>
                                Secure 256-bit SSL encrypted payment.
                            </p>
                        </div>

                        <Button fullWidth size="lg" disabled={loading}>
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', transform: 'scale(0.5)' }}>
                                    <div className="evolution-loader" style={{ fontSize: '1rem' }} /> Processing...
                                </div>
                            ) : `Pay ${getPrice().split('/')[0]}`}
                        </Button>
                    </form>
                </Card>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card style={{ backgroundColor: '#fafafa' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#666' }}>Plan: {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                            <span style={{ fontWeight: 600 }}>{getPrice()}</span>
                        </div>
                        <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Total</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-color)' }}>{getPrice().split('/')[0]}</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const CheckoutPage = () => {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
};

export default CheckoutPage;
