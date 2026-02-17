"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart, Calendar, Utensils, Activity, MessageCircle, User, LogOut, Zap } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";
import Button from './Button';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = useSession();

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <User size={18} /> },
        { name: 'Tracker', path: '/tracker', icon: <Calendar size={18} /> },
        { name: 'Nutrition', path: '/nutrition', icon: <Utensils size={18} /> },
        { name: 'Wellness', path: '/wellness', icon: <Activity size={18} /> },
        { name: 'AI Support', path: '/ai-support', icon: <MessageCircle size={18} /> },
        { name: 'Community', path: '/community', icon: <Heart size={18} /> },
        { name: 'Pricing', path: '/pricing', icon: <Zap size={18} /> },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <header className="header" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--primary-color)', padding: '6px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                        <Heart fill="white" size={20} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-color)', letterSpacing: '-0.5px' }}>
                        NurtureNest
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className="nav-link"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: isActive(link.path) ? 'var(--primary-color)' : 'var(--text-color)',
                                fontWeight: isActive(link.path) ? 600 : 400,
                                transition: 'color 0.2s',
                                fontSize: '0.95rem'
                            }}
                        >
                            <span className="nav-icon">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}

                    {session ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Hi, {session.user?.name?.split(' ')[0]}</span>
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
                    style={{ display: 'none', background: 'none', color: 'var(--text-color)' }}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div style={{
                    position: 'absolute',
                    top: '70px',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: isActive(link.path) ? 'var(--light-gray)' : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <div style={{ borderTop: '1px solid #eee', margin: '0.5rem 0' }}></div>
                    {session ? (
                        <>
                            <div style={{ padding: '0.5rem', fontWeight: 600 }}>Hi, {session.user?.name}</div>
                            <Button fullWidth variant="outline" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                                <LogOut size={16} /> Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                                <Button fullWidth variant="ghost">Login</Button>
                            </Link>
                            <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                                <Button fullWidth>Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            )}

            <style>{`
        @media (max-width: 1100px) {
          .nav-icon { display: none; }
          .desktop-nav { gap: 0.8rem !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
