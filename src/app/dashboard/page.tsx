import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
        redirect('/auth/signin');
    }

    return <DashboardView data={data} />;
}
