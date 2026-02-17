"use client";

import React from 'react';

const LoadingEvolution = ({ message = "Nurturing your request..." }: { message?: string }) => {
    return (
        <div className="loading-container">
            <div className="evolution-loader"></div>
            <p style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginTop: '1rem',
                animation: 'pulse 2s infinite'
            }}>
                {message}
            </p>
            <style jsx>{`
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                }
                .evolution-loader {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};

export default LoadingEvolution;
