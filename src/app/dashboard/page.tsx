import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import HealthLog from '@/models/HealthLog';
import Appointment from '@/models/Appointment';
import DashboardView from '../../components/DashboardView';
import { redirect } from 'next/navigation';

async function getDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return null;
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) return null;

    const recentLogs = await HealthLog.find({ userId: user._id }).sort({ date: -1 }).limit(5);
    const upcomingAppointments = await Appointment.find({
        userId: user._id,
        date: { $gte: new Date() }
    }).sort({ date: 1 }).limit(3);

    // Serialize data to pass to Client Component
    return {
        user: {
            name: user.name,
            email: user.email,
            dueDate: user.dueDate ? user.dueDate.toISOString() : undefined,
        },
        recentLogs: JSON.parse(JSON.stringify(recentLogs)),
        upcomingAppointments: JSON.parse(JSON.stringify(upcomingAppointments)),
    };
}

export default async function DashboardPage() {
    const data = await getDashboardData();

    if (!data) {
        // Instead of redirecting immediately here, we return the view
        // The view or middleware will handle the case where user data is missing
        // This avoids conflicts with middleware's own redirection logic
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-center p-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-primary">Session Issue</h2>
                    <p className="text-gray-600 mb-6">We couldn't load your dashboard data. Please try signing in again.</p>
                    <a
                        href="/auth/signin"
                        className="px-6 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                        Go to Sign In
                    </a>
                </div>
            </div>
        );
    }

    return <DashboardView data={data} />;
}
