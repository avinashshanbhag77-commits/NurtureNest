import React from 'react';
import Card from '../components/Card';
import { Wind, Moon, Heart } from 'lucide-react';

const Wellness: React.FC = () => {
    return (
        <div className="wellness-page container">
            <div style={{ textAlign: 'center', margin: '3rem 0' }}>
                <h1 style={{ color: 'var(--accent-color)' }}>Body & Mind Wellness</h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>Stay active and relaxed throughout your journey.</p>
            </div>

            <section style={{ marginBottom: '4rem' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Safe Exercises</h2>
                <div className="grid-cols-2">
                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ height: '150px', backgroundColor: '#F3E5F5', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '3rem' }}>🧘‍♀️</span>
                            </div>
                            <div>
                                <h3>Prenatal Yoga</h3>
                                <p>Gentle stretching to improve flexibility and reduce back pain. Avoid hot yoga or lying flat on your back.</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ height: '150px', backgroundColor: '#E0F7FA', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '3rem' }}>🚶‍♀️</span>
                            </div>
                            <div>
                                <h3>Walking</h3>
                                <p>The perfect low-impact cardio. Aim for 30 minutes a day to keep your heart healthy and mood elevated.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <section>
                <h2 style={{ marginBottom: '1.5rem' }}>Relaxation & Sleep</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <Wind size={40} color="var(--secondary-color)" style={{ marginBottom: '1rem' }} />
                            <h3>Breathing Exercises</h3>
                            <p>Practice deep belly breathing (4-7-8 technique) to manage stress and prepare for labor.</p>
                        </div>
                    </Card>

                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <Moon size={40} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
                            <h3>Sleep Hygiene</h3>
                            <p>Sleep on your side (SOS) with a pillow between your knees for better circulation.</p>
                        </div>
                    </Card>

                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <Heart size={40} color="var(--primary-color)" style={{ marginBottom: '1rem' }} />
                            <h3>Self Care</h3>
                            <p>Take time for yourself. A warm bath (not hot!), reading, or listening to calming music.</p>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Wellness;
