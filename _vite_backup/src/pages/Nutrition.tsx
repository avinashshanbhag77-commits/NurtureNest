import React from 'react';
import Card from '../components/Card';
import { Check, X, Droplet } from 'lucide-react';

const Nutrition: React.FC = () => {
    return (
        <div className="nutrition-page container">
            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <h1 style={{ color: 'var(--primary-color)' }}>Nourish Yourself & Your Baby</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Essential nutrition guide for your second trimester.</p>
            </div>

            <div className="grid-cols-2" style={{ marginBottom: '3rem' }}>
                <Card>
                    <h2 style={{ color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={28} /> Foods to Eat
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            "Leafy Greens (Iron & Folate)",
                            "Lean Proteins (Chicken, Fish, Tofu)",
                            "Dairy Products (Calcium)",
                            "Whole Grains (Fiber)",
                            "Berries & Citrus Fruits (Vitamin C)"
                        ].map((item, i) => (
                            <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#2E7D32' }}>•</span> {item}
                            </li>
                        ))}
                    </ul>
                </Card>

                <Card>
                    <h2 style={{ color: '#C62828', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <X size={28} /> Foods to Avoid
                    </h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            "Raw or Undercooked Meat/Fish",
                            "Unpasteurized Dairy (Soft Cheeses)",
                            "High-Mercury Fish (Shark, Swordfish)",
                            "Excess Caffeine (>200mg/day)",
                            "Alcohol (Strictly No)"
                        ].map((item, i) => (
                            <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#C62828' }}>•</span> {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

            <section style={{ marginBottom: '3rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Hydration & Supplements</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <Card className="water-card" style={{ backgroundColor: '#E3F2FD' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '10px', backgroundColor: '#BBDEFB', borderRadius: '50%' }}>
                                <Droplet size={32} color="#1976D2" />
                            </div>
                            <h3 style={{ margin: 0, color: '#1565C0' }}>Stay Hydrated</h3>
                        </div>
                        <p>Aim for <strong>8-12 cups</strong> of water daily. Water helps form the placenta and amniotic sac.</p>
                    </Card>

                    <Card>
                        <h3>💊 Daily Essentials</h3>
                        <ul style={{ paddingLeft: '1.2rem' }}>
                            <li><strong>Prenatal Vitamin:</strong> With Folic Acid & Iron.</li>
                            <li><strong>Calcium:</strong> 1,000 mg/day for bone health.</li>
                            <li><strong>Omega-3s (DHA):</strong> Crucial for baby's brain development.</li>
                        </ul>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Nutrition;
