import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
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

        await dbConnect();
        const { id } = await params;

        console.log(`Cancelling appointment with ID: ${id}`);

        const updated = await Appointment.findByIdAndUpdate(id, {
            status: 'CANCELLED',
            $push: { statusLog: { status: 'CANCELLED', message: 'Appointment cancelled by user', timestamp: new Date() } }
        }, { new: true });

        if (!updated) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Appointment cancelled' });
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
