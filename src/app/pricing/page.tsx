"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useSession } from 'next-auth/react';

const PricingPage = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<string | null>(null);

    const handleUpgrade = async (tier: string) => {
        if (!session) {
            window.location.href = '/auth/signin';
            return;
        }
        setLoading(tier);
        // Simulate payment/upgrade
        try {
            const res = await fetch('/api/user/upgrade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tier })
            });
            if (res.ok) {
                alert(`Successfully upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`);
                window.location.reload();
            }
        } catch (error) {
            console.error('Upgrade failed', error);
        } finally {
            setLoading(null);
        }
    };

    const tiers = [
        {
            name: 'Free',
            price: '$0',
            duration: '1 month trial',
            id: 'free',
            icon: <Zap size={24} color="#666" />,
            features: [
                '5 AI Assistant requests',
                'Basic pregnancy tracker',
                'Minimal nutrition benefits',
                'Community access'
            ],
            buttonText: 'Current Plan',
            isCurrent: true
        },
        {
            name: 'Pro',
            price: '$10',
            duration: '/ month',
            id: 'pro',
            icon: <Star size={24} color="var(--secondary-color)" />,
            features: [
                '100 AI Assistant requests',
                'Nutrition reports based on logs',
                'Doctor access (3 times/mo)',
                'Priority support',
                'Personalized health alerts'
            ],
            buttonText: 'Upgrade to Pro',
            highlight: true
        },
        {
            name: 'Annual',
            price: '$100',
            duration: '/ year',
            id: 'annual',
            icon: <Crown size={24} color="var(--accent-color)" />,
            features: [
                'Unlimited AI Assistant access',
                'Unlimited doctor calls',
                'Full historical health reports',
                'exclusive community badges',
                'Early access to new features'
            ],
            buttonText: 'Go Annual'
        }
    ];

    return (
        <div className="pricing-page container" style={{ padding: '4rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>Choose Your Nest</h1>
                <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                    Get the support you deserve during this beautiful journey. Upgrade for more AI help and professional advice.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                maxWidth: '1100px',
                margin: '0 auto'
            }}>
                {tiers.map((tier) => (
                    <Card
                        key={tier.id}
                        style={{
                            position: 'relative',
                            border: tier.highlight ? '2px solid var(--secondary-color)' : '1px solid #eee',
                            transform: tier.highlight ? 'scale(1.05)' : 'none',
                            zIndex: tier.highlight ? 1 : 0
                        }}
                    >
                        {tier.highlight && (
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'var(--secondary-color)',
                                color: 'white',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                MOST POPULAR
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                            {tier.icon}
                            <h2 style={{ margin: 0 }}>{tier.name}</h2>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{tier.price}</span>
                            <span style={{ color: '#666' }}>{tier.duration}</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {tier.features.map((feature, idx) => (
                                <li key={idx} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                    <Check size={18} color="var(--secondary-color)" style={{ minWidth: '18px' }} />
                                    <span style={{ color: '#444' }}>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            fullWidth
                            variant={tier.highlight ? 'primary' : 'outline'}
                            onClick={() => handleUpgrade(tier.id)}
                            disabled={loading !== null}
                        >
                            {loading === tier.id ? 'Processing...' : tier.buttonText}
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
