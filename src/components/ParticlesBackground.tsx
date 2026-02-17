"use client";

import React, { useEffect, useState } from 'react';

const ParticlesBackground: React.FC = () => {
    const [particles, setParticles] = useState<number[]>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 15 }, (_, i) => i));
    }, []);

    return (
        <div className="particles-container" style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {particles.map((i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        backgroundColor: i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)',
                        borderRadius: '50%',
                        opacity: 0.15,
                        filter: 'blur(2px)',
                        animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 5}s`
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float-particle {
                    0% { transform: translateY(0) translateX(0) scale(1); }
                    33% { transform: translateY(-50px) translateX(20px) scale(1.1); }
                    66% { transform: translateY(20px) translateX(-30px) scale(0.9); }
                    100% { transform: translateY(0) translateX(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ParticlesBackground;
