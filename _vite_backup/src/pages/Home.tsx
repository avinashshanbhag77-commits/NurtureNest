import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Activity, Smile } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" style={{
                padding: '4rem 0',
                textAlign: 'center',
                background: 'linear-gradient(180deg, var(--background-color) 0%, rgba(255,255,255,0) 100%)'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <span style={{
                            backgroundColor: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--primary-color)',
                            marginBottom: '1rem',
                            display: 'inline-block',
                            boxShadow: '0 2px 8px rgba(255, 183, 178, 0.4)'
                        }}>
                            ✨ Your Smart Pregnancy Companion
                        </span>
                        <h1 style={{ fontSize: '3rem', margin: '1rem 0', lineHeight: 1.2 }}>
                            A Healthier, Happier Journey for <span style={{ color: 'var(--primary-color)' }}>You & Baby</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Track your pregnancy, get personalized health tips, and find support—all in one place. Designed for moms, backed by experts.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Link to="/tracker">
                                <Button size="lg">Start Your Journey <ArrowRight size={20} /></Button>
                            </Link>
                            <Link to="/about">
                                <Button variant="outline" size="lg">Learn More</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Illustration Placeholder */}
                    <div style={{
                        marginTop: '3rem',
                        height: '300px',
                        backgroundColor: '#fff',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        border: '2px dashed var(--accent-color)'
                    }}>
                        <span style={{ color: 'var(--accent-color)' }}>Add Hero Illustration Here</span>
                    </div>
                </div>
            </section>

            {/* Week Preview Section */}
            <section style={{ padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Week at a Glance</h2>
                            <p style={{ color: '#666' }}>Currently tracking: <strong>Week 16 (Month 4)</strong></p>
                        </div>
                        <Link to="/tracker"><Button variant="ghost">View Full Timeline <ArrowRight size={16} /></Button></Link>
                    </div>

                    <div className="grid-cols-2">
                        <Card>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--secondary-color)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '2rem' }}>🥑</span>
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Baby Size</h3>
                                    <p style={{ margin: '0.2rem 0 0', color: '#666' }}>Your baby is the size of an <strong>Avocado</strong></p>
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '60px', height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--accent-color)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Activity color="white" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>Today's Tip</h3>
                                    <p style={{ margin: '0.2rem 0 0', color: '#666' }}>Stay hydrated! Aim for 8-10 glasses of water.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '4rem 0', backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '3rem' }}>Why Moms Love NurtureNest</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <FeatureCard
                            icon={<Heart color="var(--primary-color)" />}
                            title="Health Tracking"
                            description="Monitor your weight, symptoms, and appointments with ease."
                        />
                        <FeatureCard
                            icon={<Shield color="var(--secondary-color)" />}
                            title="Medical Trust"
                            description="Expert-backed guidance and partnerships with top hospitals."
                        />
                        <FeatureCard
                            icon={<Smile color="var(--accent-color)" />}
                            title="Emotional Support"
                            description="Daily mood check-ins and community connections."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{
            width: '60px', height: '60px',
            margin: '0 auto 1rem',
            borderRadius: '50%',
            backgroundColor: 'var(--light-gray)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {icon}
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: '#666', lineHeight: 1.6 }}>{description}</p>
    </div>
);

export default Home;
