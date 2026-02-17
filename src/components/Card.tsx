"use client";

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'md', onClick, style: customStyle }) => {
    const paddingClass = {
        none: '0',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
    }[padding];

    const style: React.CSSProperties = {
        backgroundColor: 'var(--white)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        padding: paddingClass,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...customStyle,
    };

    return (
        <div
            className={`card ${className}`}
            style={style}
            onClick={onClick}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                }
            }}
        >
            {children}
        </div>
    );
};

export default Card;
