import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Calendar, Utensils, Activity, MessageCircle, User } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Tracker', path: '/tracker', icon: <Calendar size={18} /> },
        { name: 'Nutrition', path: '/nutrition', icon: <Utensils size={18} /> },
        { name: 'Wellness', path: '/wellness', icon: <Activity size={18} /> },
        { name: 'AI Support', path: '/ai-support', icon: <MessageCircle size={18} /> },
        { name: 'Community', path: '/community', icon: <User size={18} /> },
    ];

    const isActive = (path: string) => location.pathname === path;

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
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{ backgroundColor: 'var(--primary-color)', padding: '6px', borderRadius: '50%', color: 'white', display: 'flex' }}>
                        <Heart fill="white" size={20} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-color)', letterSpacing: '-0.5px' }}>
                        NurtureNest
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: isActive(link.path) ? 'var(--primary-color)' : 'var(--text-color)',
                                fontWeight: isActive(link.path) ? 600 : 400,
                                transition: 'color 0.2s'
                            }}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <Button size="sm">Get Premium</Button>
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
                            to={link.path}
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
                    <Button fullWidth onClick={() => setIsMenuOpen(false)}>Get Premium</Button>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </header>
    );
};

export default Header;
