"use client";

import React from 'react';
import Card from './Card';
import Button from './Button';
import { Calendar, Activity, FileText, User, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
        <div className="dashboard-page container" style={{ paddingBottom: '4rem' }}>
            <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Welcome, {user.name}</h1>
                    <p style={{ color: '#666' }}>Here is your pregnancy overview.</p>
                </div>
                <Button onClick={() => router.push('/tracker')}>View Tracker</Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {/* Status Card */}
                <Card style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '1rem', borderRadius: '50%' }}>
                            <Calendar size={32} color="white" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '2.5rem' }}>Week {week || '--'}</h2>
                            <p style={{ margin: 0, opacity: 0.9 }}>{dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : 'Set your due date in Tracker'}</p>
                        </div>
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Button size="sm" variant="outline" style={{ flex: 1 }}><Plus size={16} /> Log Symptoms</Button>
                        <Button size="sm" variant="outline" style={{ flex: 1 }}><Plus size={16} /> Add Appt</Button>
                    </div>
                </Card>
            </div>

            <div className="grid-cols-2">
                {/* Upcoming Appointments */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={20} /> Upcoming Appointments</h3>
                        <Button variant="ghost" size="sm">View All</Button>
                    </div>
                    {upcomingAppointments.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {upcomingAppointments.map((appt: any) => (
                                <Card key={appt._id} padding="sm" style={{ borderLeft: '4px solid var(--accent-color)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{appt.title}</strong>
                                        <span style={{ color: '#666', fontSize: '0.9rem' }}>{new Date(appt.date).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#666' }}>{appt.doctor} @ {appt.location}</p>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card padding="md" style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                            No upcoming appointments.
                        </Card>
                    )}
                </div>

                {/* Recent Health Logs */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={20} /> Recent Health Logs</h3>
                        <Button variant="ghost" size="sm">View History</Button>
                    </div>
                    {recentLogs.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {recentLogs.map((log: any) => (
                                <Card key={log._id} padding="sm">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 600 }}>{new Date(log.date).toLocaleDateString()}</span>
                                        {log.weight && <span>{log.weight} kg</span>}
                                    </div>
                                    {log.symptoms && log.symptoms.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            {log.symptoms.map((s: string, i: number) => (
                                                <span key={i} style={{ fontSize: '0.8rem', backgroundColor: '#eee', padding: '2px 8px', borderRadius: '10px' }}>{s}</span>
                                            ))}
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card padding="md" style={{ textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                            No health logs yet. Start tracking!
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardView;
