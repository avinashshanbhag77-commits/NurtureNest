import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/lib/auth";
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        const User = (await import('@/models/User')).default;
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const deleted = await Appointment.deleteOne({ _id: id, userId: user._id });

        if (deleted.deletedCount === 0) {
            console.error(`Appointment ${id} not found or unauthorized for user ${user._id}`);
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        console.log(`Successfully deleted appointment: ${id}`);
        return NextResponse.json({ message: 'Appointment deleted successfully', id });
    } catch (error) {
        console.error('Delete appointment error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        await dbConnect();
        const { id } = await params;

        const updated = await Appointment.findByIdAndUpdate(id, {
            ...data,
            date: new Date(data.date),
            status: 'RESCHEDULED',
            $push: { statusLog: { status: 'RESCHEDULED', message: `Rescheduled to ${new Date(data.date).toLocaleString()}`, timestamp: new Date() } }
        }, { new: true });

        if (!updated) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Update appointment error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
