"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingEvolution = ({ message = "Nurturing your request..." }: { message?: string }) => {
    const stages = ['🏊‍♂️', '🥚', '🧬', '🤰', '👶'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % stages.length);
        }, 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="loading-container">
            <div className="evolution-loader" style={{ fontSize: '4rem', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.5, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {stages[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
            <p style={{
                color: 'var(--primary-color)',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginTop: '1rem',
                textAlign: 'center'
            }}>
                {message}
            </p>
            <style jsx>{`
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    min-height: 250px;
                }
            `}</style>
        </div>
    );
};

export default LoadingEvolution;
