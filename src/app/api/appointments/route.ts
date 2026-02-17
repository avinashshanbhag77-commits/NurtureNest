import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Find user by email first to get userId
        const User = (await import('@/models/User')).default;
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const appointments = await Appointment.find({
            userId: user._id,
            status: { $ne: 'CANCELLED' }
        }).sort({ date: 1 });

        console.log(`Fetched ${appointments.length} active appointments for user ${user._id}`);
        return NextResponse.json(appointments);
    } catch (error) {
        console.error('Fetch appointments error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        await dbConnect();

        const User = (await import('@/models/User')).default;
        const user = await User.findOne({ email: session.user.email });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newAppointment = new Appointment({
            userId: user._id,
            title: data.title,
            date: new Date(data.date),
            doctorName: data.doctorName,
            location: data.location,
            type: data.type,
            notes: data.notes,
            symptoms: data.symptoms
        });

        await newAppointment.save();
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        console.error('Create appointment error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
