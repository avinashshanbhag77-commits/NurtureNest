import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    style,
    ...props
}) => {
    let backgroundColor = 'var(--primary-color)';
    let color = 'var(--white)';
    let border = 'none';

    if (variant === 'secondary') {
        backgroundColor = 'var(--secondary-color)';
        color = 'var(--text-color)';
    } else if (variant === 'outline') {
        backgroundColor = 'transparent';
        color = 'var(--primary-color)';
        border = '1px solid var(--primary-color)';
    } else if (variant === 'ghost') {
        backgroundColor = 'transparent';
        color = 'var(--text-color)';
    }

    const padding = {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
    }[size];

    const buttonStyle: React.CSSProperties = {
        backgroundColor,
        color,
        border,
        padding,
        borderRadius: 'var(--radius-lg)',
        width: fullWidth ? '100%' : 'auto',
        fontWeight: 600,
        fontSize: size === 'lg' ? '1.1rem' : '1rem',
        cursor: 'pointer',
        transition: 'opacity 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        ...style,
    };

    return (
        <button
            style={buttonStyle}
            {...props}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
        >
            {children}
        </button>
    );
};

export default Button;
