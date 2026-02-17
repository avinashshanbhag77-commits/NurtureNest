"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { CreditCard, Lock, ShieldCheck, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const CheckoutPage = () => {
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

        // Simulate processing time
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
            <Link href="/pricing" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', marginBottom: '2rem' }}>
                <ChevronLeft size={20} /> Back to Pricing
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                {/* Payment Form */}
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
                            <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.4rem' }}>Demo card number provided for testing.</p>
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
                                Your connection is secure. We use 256-bit SSL encryption to protect your data.
                            </p>
                        </div>

                        <Button fullWidth size="lg" disabled={loading}>
                            {loading ? 'Processing...' : `Pay ${getPrice().split('/')[0]}`}
                        </Button>
                    </form>
                </Card>

                {/* Order Summary */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card style={{ backgroundColor: '#fafafa' }}>
                        <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: '#666' }}>Plan: {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                            <span style={{ fontWeight: 600 }}>{getPrice()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: '#666' }}>Tax (0%)</span>
                            <span style={{ fontWeight: 600 }}>$0.00</span>
                        </div>
                        <div style={{ borderTop: '1px solid #ddd', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>Total</span>
                            <span style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary-color)' }}>{getPrice().split('/')[0]}</span>
                        </div>
                    </Card>

                    <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
                        <p>Need help? Contact our support at support@nurturenest.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
