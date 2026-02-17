"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Calendar, Clock, MapPin, User, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface AppointmentType {
    _id: string;
    title: string;
    date: string;
    doctorName?: string;
    location?: string;
    type: string;
    notes?: string;
    status: string;
}

const AppointmentsPage = () => {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newAppt, setNewAppt] = useState({
        title: '',
        date: '',
        doctorName: '',
        location: '',
        type: 'Checkup',
        notes: ''
    });

    useEffect(() => {
        if (session) {
            fetchAppointments();
        }
    }, [session]);

    const fetchAppointments = async () => {
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();
            if (res.ok) {
                setAppointments(data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppt)
            });
            if (res.ok) {
                setShowModal(false);
                fetchAppointments();
                setNewAppt({
                    title: '',
                    date: '',
                    doctorName: '',
                    location: '',
                    type: 'Checkup',
                    notes: ''
                });
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    const handleCancel = async (id: string) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
        }
    };

    if (!session) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Please sign in to view appointments.</div>;

    return (
        <div className="appointments-page container" style={{ padding: '4rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Your Appointments</h1>
                    <p style={{ color: '#666' }}>Never miss a checkup for you and your baby.</p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} /> Schedule New
                </Button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>Loading appointments...</div>
            ) : appointments.length === 0 ? (
                <Card style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                    <Calendar size={48} color="var(--primary-color)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                    <h3>No appointments scheduled</h3>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>It's important to keep track of your regular checkups.</p>
                    <Button variant="outline" onClick={() => setShowModal(true)}>Schedule Your First Appointment</Button>
                </Card>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {appointments.map((appt) => (
                        <Card key={appt._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem' }}>
                            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                <div style={{
                                    backgroundColor: 'var(--secondary-color)',
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'center',
                                    minWidth: '70px'
                                }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{new Date(appt.date).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{new Date(appt.date).getDate()}</div>
                                </div>

                                <div>
                                    <h3 style={{ margin: '0 0 0.5rem' }}>{appt.title}</h3>
                                    <div style={{ display: 'flex', gap: '1.5rem', color: '#666', fontSize: '0.9rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Clock size={16} /> {new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {appt.doctorName && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <User size={16} /> {appt.doctorName}
                                            </span>
                                        )}
                                        {appt.location && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <MapPin size={16} /> {appt.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'flex-end' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '50px',
                                        backgroundColor: appt.status === 'CANCELLED' ? '#ffeded' : 'var(--light-gray)',
                                        color: appt.status === 'CANCELLED' ? '#ff6b6b' : 'inherit',
                                        fontSize: '0.8rem',
                                        fontWeight: 600
                                    }}>
                                        {appt.status}
                                    </span>
                                    <ChevronRight color="#ccc" />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button size="sm" variant="outline" onClick={() => {
                                        if (confirm('Are you sure you want to cancel this appointment?')) {
                                            handleCancel(appt._id);
                                        }
                                    }}>Cancel</Button>
                                    <Button size="sm" variant="ghost" onClick={() => {
                                        setNewAppt({
                                            title: appt.title,
                                            date: new Date(appt.date).toISOString().slice(0, 16),
                                            doctorName: appt.doctorName || '',
                                            location: appt.location || '',
                                            type: appt.type,
                                            notes: appt.notes || ''
                                        });
                                        setShowModal(true);
                                    }}>Reschedule</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    padding: '1rem'
                }}>
                    <Card style={{ maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2>Schedule Appointment</h2>
                            <Button variant="ghost" onClick={() => setShowModal(false)}>&times;</Button>
                        </div>

                        <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Regular Checkup"
                                    value={newAppt.title}
                                    onChange={(e) => setNewAppt({ ...newAppt, title: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Date & Time</label>
                                <input
                                    required
                                    type="datetime-local"
                                    value={newAppt.date}
                                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Doctor Name</label>
                                    <input
                                        type="text"
                                        placeholder="Dr. Smith"
                                        value={newAppt.doctorName}
                                        onChange={(e) => setNewAppt({ ...newAppt, doctorName: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Type</label>
                                    <select
                                        value={newAppt.type}
                                        onChange={(e) => setNewAppt({ ...newAppt, type: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                    >
                                        <option value="Checkup">Checkup</option>
                                        <option value="Ultrasound">Ultrasound</option>
                                        <option value="Blood Test">Blood Test</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Location</label>
                                <input
                                    type="text"
                                    placeholder="City Hospital"
                                    value={newAppt.location}
                                    onChange={(e) => setNewAppt({ ...newAppt, location: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Notes</label>
                                <textarea
                                    rows={3}
                                    placeholder="Any specific questions for the doctor..."
                                    value={newAppt.notes}
                                    onChange={(e) => setNewAppt({ ...newAppt, notes: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', resize: 'none' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <Button fullWidth type="submit">Schedule</Button>
                                <Button fullWidth variant="outline" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;
