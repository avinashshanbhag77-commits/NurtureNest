import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import HealthLog from '@/models/HealthLog';
import Appointment from '@/models/Appointment';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Fetch recent logs and upcoming appointments
        const recentLogs = await HealthLog.find({ userId: user._id }).sort({ date: -1 }).limit(5);
        const upcomingAppointments = await Appointment.find({
            userId: user._id,
            date: { $gte: new Date() }
        }).sort({ date: 1 }).limit(3);

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
                dueDate: user.dueDate,
            },
            recentLogs,
            upcomingAppointments
        });

    } catch (error) {
        console.error('Dashboard data fetch error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
