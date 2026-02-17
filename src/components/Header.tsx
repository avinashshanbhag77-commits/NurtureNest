"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Calendar, Utensils, Activity, MessageCircle, User, LogOut, Zap, Clock } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import { motion } from 'framer-motion';
import Button from './Button';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <User size={18} /> },
        { name: 'Tracker', path: '/tracker', icon: <Calendar size={18} /> },
        { name: 'Appts', path: '/appointments', icon: <Clock size={18} /> },
        { name: 'Nutrition', path: '/nutrition', icon: <Utensils size={18} /> },
        { name: 'Wellness', path: '/wellness', icon: <Activity size={18} /> },
        { name: 'AI', path: '/ai-support', icon: <MessageCircle size={18} /> },
        { name: 'Community', path: '/community', icon: <Heart size={18} /> },
        { name: 'Pricing', path: '/pricing', icon: <Zap size={18} /> },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="header" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', marginRight: '1.5rem', flexShrink: 0 }}>
                    <div style={{ backgroundColor: 'var(--primary-color)', padding: '5px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                        <Heart fill="white" size={18} />
                    </div>
                    <span className="logo-text" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-color)', letterSpacing: '-0.5px' }}>
                        NurtureNest
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    {navLinks.map((link) => (
                        <motion.div
                            key={link.name}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={link.path}
                                className="nav-link"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    color: isActive(link.path) ? 'var(--primary-color)' : 'var(--text-color)',
                                    fontWeight: isActive(link.path) ? 700 : 500,
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem',
                                    padding: '0.5rem 0'
                                }}
                            >
                                <span className="nav-icon" style={{ opacity: isActive(link.path) ? 1 : 0.7 }}>{link.icon}</span>
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}

                    <div style={{ height: '24px', width: '1px', backgroundColor: '#e5e7eb', margin: '0 0.5rem' }}></div>

                    {session ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem' }}>
                                    {session.user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hi, {session.user?.name?.split(' ')[0]}</span>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => signOut()}>
                                <LogOut size={16} /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link href="/auth/signin">
                                <Button size="sm" variant="ghost">Login</Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'rgba(255, 183, 178, 0.1)',
                        color: 'var(--primary-color)',
                        padding: '8px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: '70px',
                    left: 0,
                    right: 0,
                    width: '100%',
                    height: 'calc(100vh - 70px)',
                    backgroundColor: 'rgba(255,255,255,0.98)',
                    zIndex: 1001,
                    padding: '2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    animation: 'fadeIn 0.3s ease',
                    overflowY: 'auto',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                padding: '0.75rem 1rem',
                                borderRadius: '10px',
                                backgroundColor: isActive(link.path) ? 'rgba(255, 183, 178, 0.15)' : '#f8f8f8',
                                color: isActive(link.path) ? 'var(--primary-color)' : 'var(--text-color)',
                                fontWeight: isActive(link.path) ? 700 : 500,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                fontSize: '1rem'
                            }}
                        >
                            <span style={{ color: isActive(link.path) ? 'var(--primary-color)' : '#666', display: 'flex' }}>{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                    <div style={{ borderTop: '1px solid #eee', margin: '1rem 0' }}></div>
                    {session ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '0.5rem', fontWeight: 600, fontSize: '1.2rem' }}>Hi, {session.user?.name}</div>
                            <Button fullWidth size="lg" variant="outline" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                                <LogOut size={20} /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
                                <Button fullWidth size="lg" variant="ghost">Login</Button>
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
                                <Button fullWidth size="lg">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 1400px) {
          .nav-icon { display: none; }
          .desktop-nav { gap: 0.6rem !important; }
        }
        @media (max-width: 1250px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (max-width: 480px) {
          .logo-text { display: none !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
