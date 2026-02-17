import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import TrackerView from '../../components/TrackerView';
import { redirect } from 'next/navigation';

async function getTrackerData() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return null;
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) return { initialWeek: 16, hasDueDate: false };

    let initialWeek = 16;
    let hasDueDate = false;

    if (user.dueDate) {
        hasDueDate = true;
        const dueDate = new Date(user.dueDate);
        const today = new Date();
        const diffTime = Math.abs(dueDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // Simple calculation: 40 weeks - remaining weeks
        const remainingWeeks = Math.ceil(diffDays / 7);
        initialWeek = Math.max(1, 40 - remainingWeeks);
    }

    return { initialWeek, hasDueDate };
}

export default async function TrackerPage() {
    const data = await getTrackerData();

    if (!data) {
        redirect('/auth/signin');
    }

    return <TrackerView initialWeek={data.initialWeek} hasDueDate={data.hasDueDate} />;
}
