"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Info, CheckCircle, Activity, Calendar as CalendarIcon } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { useRouter } from 'next/navigation';

interface TrackerViewProps {
    initialWeek: number;
    hasDueDate: boolean;
}

const TrackerView: React.FC<TrackerViewProps> = ({ initialWeek, hasDueDate }) => {
    const [currentWeek, setCurrentWeek] = useState(initialWeek);
    const [showDueDateModal, setShowDueDateModal] = useState(!hasDueDate);
    const [dateInput, setDateInput] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!hasDueDate) {
            setShowDueDateModal(true);
        }
    }, [hasDueDate]);

    const handleSetDueDate = async () => {
        if (!dateInput) return;
        try {
            const res = await fetch('/api/user/update-due-date', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dueDate: dateInput }),
            });
            if (res.ok) {
                setShowDueDateModal(false);
                router.refresh(); // Refresh server component to recalculate week
            }
        } catch (error) {
            console.error('Failed to update due date', error);
        }
    };

    // Mock data based on week (simplified for demo, normally would fetch specific week data)
    const weekData = {
        week: currentWeek,
        trimester: currentWeek <= 13 ? 'First Trimester' : currentWeek <= 26 ? 'Second Trimester' : 'Third Trimester',
        babySize: 'Avocado', // This would need a real mapping
        babyLength: '4.6 inches',
        babyWeight: '3.5 ounces',
        babyDevelopment: [
            "Your baby's eyes are working and can perceive light.",
            "The tiny bones in their ears are in place, so they can hear your voice!",
            "Facial muscles are developing, allowing for expressions like squinting."
        ],
        momChanges: [
            "You might feel the first flutters of movement (quickening).",
            "Your 'pregnancy glow' might be kicking in due to increased blood flow.",
            "Nasal congestion or nosebleeds are common due to hormonal changes."
        ],
        tips: [
            "Talk or sing to your baby—they can hear you now!",
            "Stay hydrated to help with increased blood volume.",
            "Consider a pregnancy pillow for better sleep support."
        ]
    };

    return (
        <div className="tracker-page">
            <div className="container">
                {/* Due Date Modal / Prompt */}
                {showDueDateModal && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '90%', maxWidth: '400px' }}>
                            <h3 style={{ marginTop: 0 }}>When is your baby due?</h3>
                            <p>We'll use this to calculate your current week.</p>
                            <input
                                type="date"
                                value={dateInput}
                                onChange={(e) => setDateInput(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                            />
                            <Button fullWidth onClick={handleSetDueDate}>Start Tracking</Button>
                        </div>
                    </div>
                )}

                {/* Week Selector */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '2rem 0', gap: '2rem' }}>
                    <Button variant="ghost" onClick={() => setCurrentWeek(w => Math.max(1, w - 1))}><ChevronLeft /></Button>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--primary-color)' }}>Week {currentWeek}</h2>
                        <p style={{ margin: 0, color: '#666', fontWeight: 600 }}>{weekData.trimester}</p>
                    </div>
                    <Button variant="ghost" onClick={() => setCurrentWeek(w => Math.min(40, w + 1))}><ChevronRight /></Button>
                </div>

                {/* Baby Size Visualization */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '150px', height: '150px',
                        margin: '0 auto 1rem',
                        borderRadius: '50%',
                        backgroundColor: '#E8F5E9',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '5rem',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                    }}>
                        🥑
                    </div>
                    <p style={{ fontSize: '1.2rem' }}>Baby is the size of an <strong>{weekData.babySize}</strong></p>
                    <div style={{ display: 'inline-flex', gap: '2rem', marginTop: '1rem', color: '#666' }}>
                        <span>📏 {weekData.babyLength}</span>
                        <span>⚖️ {weekData.babyWeight}</span>
                    </div>
                </div>

                {/* Development & Changes Grid */}
                <div className="grid-cols-2" style={{ marginBottom: '3rem' }}>
                    <Card>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)' }}>
                            <Info size={20} /> Baby's Development
                        </h3>
                        <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                            {weekData.babyDevelopment.map((item, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                            ))}
                        </ul>
                    </Card>

                    <Card>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)' }}>
                            <Activity size={20} /> Your Body
                        </h3>
                        <ul style={{ paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                            {weekData.momChanges.map((item, index) => (
                                <li key={index} style={{ marginBottom: '0.5rem' }}>{item}</li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Weekly Tips */}
                <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>💡 Tips for Week {currentWeek}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {weekData.tips.map((tip, index) => (
                            <Card key={index} padding="sm" className="tip-card">
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <CheckCircle color="var(--secondary-color)" size={24} style={{ minWidth: '24px' }} />
                                    <p style={{ margin: 0 }}>{tip}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Symptom Checker CTA */}
                <div style={{
                    backgroundColor: 'var(--primary-color)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    color: 'white',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <h3 style={{ margin: 0, color: 'white' }}>Feeling something new?</h3>
                    <p>Track your symptoms to get personalized advice and alerts.</p>
                    <Button variant="secondary" style={{ color: 'var(--text-color)' }}>Log Symptoms</Button>
                </div>
            </div>
        </div>
    );
};

export default TrackerView;
