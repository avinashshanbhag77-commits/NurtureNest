import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Shield, Activity, Smile, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Home() {
  return (
    <div className="home-page" style={{ position: 'relative' }}>
      <ParticlesBackground />
      {/* Hero Section */}
      <section className="hero" style={{
        padding: '6rem 0 4rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--background-color) 0%, rgba(255,183,178,0.1) 100%)',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 1rem' }}>
            <span style={{
              backgroundColor: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--primary-color)',
              marginBottom: '1.25rem',
              display: 'inline-block',
              boxShadow: '0 4px 12px rgba(255, 183, 178, 0.3)'
            }}>
              ✨ Your Smart Pregnancy Companion
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', margin: '1rem 0', lineHeight: 1.1, fontWeight: 800 }}>
              A Healthier, Happier Journey for <span style={{ color: 'var(--primary-color)' }}>You & Baby</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
              Track your pregnancy, get personalized health tips, and find support—all in one place. Designed for moms, backed by experts.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
              <Link href="/dashboard">
                <Button size="lg" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', boxShadow: '0 10px 20px rgba(255, 183, 178, 0.4)' }}>
                  Start Your Journey <ChevronRight size={20} />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" style={{ padding: '1rem 2rem' }}>Learn More</Button>
              </Link>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="floating-illustration" style={{
            marginTop: '5rem',
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
            aspectRatio: '16/9',
            backgroundColor: '#fff',
            maxWidth: '1000px',
            margin: '5rem auto 2rem',
            zIndex: 1
          }}>
            <img
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop"
              alt="Baby and Mom"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,183,178,0.2) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Cute floating elements */}
            <div className="floating-icon" style={{ position: 'absolute', top: '15%', left: '8%', fontSize: '2.5rem', animation: 'float 5s ease-in-out infinite' }}>👶</div>
            <div className="floating-icon" style={{ position: 'absolute', bottom: '20%', right: '10%', fontSize: '2rem', animation: 'bounce 4s ease-in-out infinite 0.5s' }}>🧸</div>
            <div className="floating-icon" style={{ position: 'absolute', top: '25%', right: '15%', fontSize: '1.5rem', animation: 'float 6s ease-in-out infinite 1s' }}>✨</div>
            <div className="floating-icon" style={{ position: 'absolute', bottom: '15%', left: '12%', fontSize: '1.8rem', animation: 'bounce 3s ease-in-out infinite' }}>🍼</div>
          </div>
        </div>
      </section>

      {/* Week Preview Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Week at a Glance</h2>
              <p style={{ color: '#666' }}>Currently tracking: <strong>Week 16 (Month 4)</strong></p>
            </div>
            <Link href="/tracker"><Button variant="ghost">View Full Timeline <ArrowRight size={16} /></Button></Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
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
}

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
