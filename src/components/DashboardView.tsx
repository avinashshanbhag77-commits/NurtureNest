"use client";

import React from 'react';
import Card from './Card';
import Button from './Button';
import { Calendar, Activity, FileText, User, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface DashboardData {
    user: {
        name: string;
        email: string;
        dueDate?: string;
    };
    recentLogs: any[];
    upcomingAppointments: any[];
}

const DashboardView: React.FC<{ data: DashboardData }> = ({ data }) => {
    const router = useRouter();
    const { user, recentLogs, upcomingAppointments } = data;

    // Calculate generic progress
    const dueDate = user.dueDate ? new Date(user.dueDate) : null;
    let week = 0;
    if (dueDate) {
        const today = new Date();
        const diffTime = Math.abs(dueDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        week = Math.max(1, 40 - Math.ceil(diffDays / 7));
    }

    return (
        <div className="dashboard-page container" style={{ paddingBottom: '4rem', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '2rem' }}>
                <div>
                    <h1 style={{ color: 'var(--primary-color)', marginBottom: '0.25rem', fontSize: '2.75rem', fontWeight: 800 }}>Welcome, {user.name}</h1>
                    <p style={{ color: '#666', fontSize: '1.2rem', fontWeight: 500 }}>Here is your pregnancy overview.</p>
                </div>
                <Link href="/tracker">
                    <Button size="lg">View Tracker</Button>
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
                {/* Status Card */}
                <Card style={{
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
                    color: 'white',
                    padding: '2.5rem',
                    boxShadow: '0 15px 35px rgba(255, 183, 178, 0.4)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '1.25rem', borderRadius: '50%' }}>
                            <Calendar size={40} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '3rem', fontWeight: 800 }}>Week {week || '--'}</h2>
                            <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1rem' }}>{dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : 'Set your due date in Tracker'}</p>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card style={{ padding: '2.5rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <Button size="md" variant="outline" style={{ flex: 1, minWidth: '140px' }}><Plus size={18} /> Log Symptom</Button>
                        <Button size="md" variant="outline" style={{ flex: 1, minWidth: '140px' }}><Plus size={18} /> Add Appt</Button>
                    </div>
                </Card>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
                {/* Upcoming Appointments */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}><Calendar size={24} /> Upcoming Appointments</h3>
                        <Link href="/appointments">
                            <Button variant="ghost" size="sm">View All</Button>
                        </Link>
                    </div>
                    {upcomingAppointments.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {upcomingAppointments.map((appt: any) => (
                                <Card key={appt._id} padding="md" style={{ borderLeft: '5px solid var(--primary-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{appt.title}</span>
                                        <span style={{ color: '#666', fontSize: '0.95rem', fontWeight: 500 }}>{new Date(appt.date).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ margin: '0.75rem 0 0', fontSize: '0.95rem', color: '#666' }}>{appt.doctorName || 'General'} @ {appt.location || 'NurtureNest'}</p>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card padding="lg" style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                            No upcoming appointments.
                        </Card>
                    )}
                </div>

                {/* Recent Health Logs */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}><Activity size={24} /> Recent Health Logs</h3>
                        <Link href="/tracker">
                            <Button variant="ghost" size="sm">View History</Button>
                        </Link>
                    </div>
                    {recentLogs.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {recentLogs.map((log: any) => (
                                <Card key={log._id} padding="md">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                        <span style={{ fontWeight: 700 }}>{new Date(log.date).toLocaleDateString()}</span>
                                        {log.weight && <span style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{log.weight} kg</span>}
                                    </div>
                                    {log.symptoms && log.symptoms.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                            {log.symptoms.map((s: string, i: number) => (
                                                <span key={i} style={{
                                                    fontSize: '0.85rem',
                                                    backgroundColor: 'var(--light-gray)',
                                                    color: 'var(--text-color)',
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontWeight: 500
                                                }}>{s}</span>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card padding="lg" style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                            No health logs yet. Start tracking!
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
