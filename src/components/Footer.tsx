"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Github, Linkedin, Instagram, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: '#fdfbfb',
            borderTop: '1px solid #eee',
            padding: '4rem 0 2rem',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '3rem',
                marginBottom: '3rem'
            }}>
                {/* Brand Section */}
                <div>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
                        <div style={{ backgroundColor: 'var(--primary-color)', padding: '5px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                            <Heart fill="white" size={18} />
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-color)' }}>
                            NurtureNest
                        </span>
                    </Link>
                    <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
                        Your smart pregnancy companion, providing medically-backed insights and a supportive community for your journey to motherhood.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Product</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/tracker" style={{ color: '#666', textDecoration: 'none' }}>Pregnancy Tracker</Link></li>
                        <li><Link href="/ai-support" style={{ color: '#666', textDecoration: 'none' }}>AI Smart Support</Link></li>
                        <li><Link href="/community" style={{ color: '#666', textDecoration: 'none' }}>Community Hub</Link></li>
                        <li><Link href="/pricing" style={{ color: '#666', textDecoration: 'none' }}>Premium Plans</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Company</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <li><Link href="/about" style={{ color: '#666', textDecoration: 'none' }}>About Us</Link></li>
                        <li><Link href="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</Link></li>
                        <li><Link href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</Link></li>
                        <li><Link href="/contact" style={{ color: '#666', textDecoration: 'none' }}>Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social & Contact */}
                <div>
                    <h4 style={{ marginBottom: '1.5rem', color: 'var(--text-color)' }}>Connect With Us</h4>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Github size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Instagram size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Twitter size={20} />
                        </a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                        <Mail size={16} />
                        <span style={{ fontSize: '0.9rem' }}>support@nurturenest.com</span>
                    </div>
                </div>
            </div>

            <div className="container" style={{
                borderTop: '1px solid #eee',
                paddingTop: '2rem',
                textAlign: 'center',
                color: '#888',
                fontSize: '0.9rem'
            }}>
                <p>
                    &copy; {new Date().getFullYear()} NurtureNest. Made with ❤️ by <strong>Avinash Shanbhag</strong>.
                </p>
                <div style={{ marginTop: '0.5rem', opacity: 0.7 }}>
                    Helping mothers nurture the next generation since 2024.
                </div>
            </div>

            <style jsx>{`
                .social-icon {
                    color: #666;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .social-icon:hover {
                    color: var(--primary-color);
                    transform: translateY(-3px);
                }
                ul li a {
                    transition: color 0.2s ease;
                }
                ul li a:hover {
                    color: var(--primary-color) !important;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
