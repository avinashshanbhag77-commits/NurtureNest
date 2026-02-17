"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Calendar, Clock, MapPin, User, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppointmentType {
    _id: string;
    title: string;
    date: string;
    doctorName?: string;
    location?: string;
    type: string;
    notes?: string;
    symptoms?: string;
    status: string;
}

const formatIST = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(dateString));
};

const SUGGESTED_DOCTORS = [
    "Dr. Ananya Sharma (OB/GYN)",
    "Dr. Rajesh Iyer (Pediatrician)",
    "Dr. Sneha Patil (Fetal Medicine)",
    "Dr. Vikram Reddy (General Surgeon)",
    "Dr. Meera Kapoor (Nutritionist)"
];

const AppointmentsPage = () => {
    const { data: session } = useSession();
    const [appointments, setAppointments] = useState<AppointmentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [viewingAppt, setViewingAppt] = useState<AppointmentType | null>(null);
    const [message, setMessage] = useState('');
    const [newAppt, setNewAppt] = useState({
        title: '',
        date: '',
        doctorName: '',
        location: '',
        type: 'Checkup',
        notes: '',
        symptoms: ''
    });

    useEffect(() => {
        if (session) {
            fetchAppointments();
        }
    }, [session]);

    const fetchAppointments = async () => {
        try {
            const res = await fetch(`/api/appointments?t=${Date.now()}`, { cache: 'no-store' });
            const data = await res.json();
            if (res.ok) {
                // Double check filtering on frontend
                setAppointments(data.filter((a: any) => a.status !== 'CANCELLED'));
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const isRescheduling = !!newAppt.title && appointments.some(a => a.title === newAppt.title);
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppt)
            });
            if (res.ok) {
                setShowModal(false);
                fetchAppointments();
                if (isRescheduling) {
                    setMessage('Appointment Rescheduled');
                    setTimeout(() => setMessage(''), 3000);
                }
                setNewAppt({
                    title: '',
                    date: '',
                    doctorName: '',
                    location: '',
                    type: 'Checkup',
                    notes: '',
                    symptoms: ''
                });
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    const handleCancel = async (id: string) => {
        const originalAppointments = [...appointments];
        setAppointments(appointments.filter(a => a._id !== id));

        try {
            console.log(`Attempting to cancel appointment: ${id}`);
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'DELETE',
                cache: 'no-store'
            });
            if (!res.ok) {
                setAppointments(originalAppointments);
                alert('Failed to cancel appointment');
            }
        } catch (error) {
            setAppointments(originalAppointments);
            console.error('Error cancelling appointment:', error);
        }
    };

    if (!session) return <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>Please sign in to view appointments.</div>;

    return (
        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>Appointments</h1>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={20} /> Schedule New
                </Button>
            </div>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={{
                        position: 'fixed',
                        top: '100px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontWeight: 600,
                        zIndex: 1001,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}
                >
                    {message}
                </motion.div>
            )}

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
                    <AnimatePresence>
                        {appointments.filter(a => a.status !== 'CANCELLED').map((appt) => (
                            <motion.div
                                key={appt._id}
                                initial={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
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
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                            <Button size="sm" variant="outline" onClick={() => {
                                                if (confirm('Are you sure you want to cancel this appointment?')) {
                                                    handleCancel(appt._id);
                                                }
                                            }}>Cancel</Button>
                                            <Button size="sm" variant="outline" style={{ color: 'var(--primary-color)' }} onClick={() => setViewingAppt(appt)}>Details</Button>
                                            <Button size="sm" variant="ghost" onClick={() => {
                                                setNewAppt({
                                                    title: appt.title,
                                                    date: new Date(appt.date).toISOString().slice(0, 16),
                                                    doctorName: appt.doctorName || '',
                                                    location: appt.location || '',
                                                    type: appt.type,
                                                    notes: appt.notes || '',
                                                    symptoms: appt.symptoms || ''
                                                });
                                                setShowModal(true);
                                            }}>Reschedule</Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

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
                                        list="doctor-suggestions"
                                        value={newAppt.doctorName}
                                        onChange={(e) => setNewAppt({ ...newAppt, doctorName: e.target.value })}
                                        style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd' }}
                                    />
                                    <datalist id="doctor-suggestions">
                                        {SUGGESTED_DOCTORS.map(doc => <option key={doc} value={doc} />)}
                                    </datalist>
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
                                    rows={2}
                                    placeholder="Any specific questions for the doctor..."
                                    value={newAppt.notes}
                                    onChange={(e) => setNewAppt({ ...newAppt, notes: e.target.value })}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #ddd', resize: 'none' }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Symptoms (if any)</label>
                                <textarea
                                    rows={2}
                                    placeholder="Mention any symptoms like nausea, back pain, etc."
                                    value={newAppt.symptoms}
                                    onChange={(e) => setNewAppt({ ...newAppt, symptoms: e.target.value })}
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

            {viewingAppt && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
                    padding: '1rem'
                }}>
                    <Card style={{ maxWidth: '500px', width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ color: 'var(--primary-color)' }}>Appointment Details</h2>
                            <Button variant="ghost" onClick={() => setViewingAppt(null)}>&times;</Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{viewingAppt.title}</div>
                            <div style={{ display: 'flex', gap: '1rem', color: '#666' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={18} /> {formatIST(viewingAppt.date)}</span>
                            </div>

                            {viewingAppt.doctorName && (
                                <div><strong>Doctor:</strong> {viewingAppt.doctorName}</div>
                            )}

                            {viewingAppt.location && (
                                <div><strong>Location:</strong> {viewingAppt.location}</div>
                            )}

                            {viewingAppt.symptoms && (
                                <div style={{ backgroundColor: '#fff5f5', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #feb2b2' }}>
                                    <strong>Symptoms recorded:</strong>
                                    <p style={{ margin: '0.5rem 0 0', color: '#4a5568' }}>{viewingAppt.symptoms}</p>
                                </div>
                            )}

                            {viewingAppt.notes && (
                                <div style={{ backgroundColor: '#f0f9ff', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #3182ce' }}>
                                    <strong>Additional Notes:</strong>
                                    <p style={{ margin: '0.5rem 0 0', color: '#2d3748' }}>{viewingAppt.notes}</p>
                                </div>
                            )}

                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                                <Button fullWidth onClick={() => setViewingAppt(null)}>Close</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AppointmentsPage;
