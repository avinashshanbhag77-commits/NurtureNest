import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import HealthLog from '@/models/HealthLog';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { date, weight, mood, symptoms, notes } = await req.json();

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const logDate = date ? new Date(date) : new Date();
        logDate.setHours(0, 0, 0, 0);

        // Find existing log for the same day to update, or create new
        const existingLog = await HealthLog.findOne({
            userId: user._id,
            date: {
                $gte: logDate,
                $lt: new Date(logDate.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingLog) {
            existingLog.weight = weight || existingLog.weight;
            existingLog.mood = mood || existingLog.mood;
            existingLog.symptoms = symptoms || existingLog.symptoms;
            existingLog.notes = notes || existingLog.notes;
            await existingLog.save();
            return NextResponse.json({ message: 'Health log updated successfully', data: existingLog });
        } else {
            const newLog = await HealthLog.create({
                userId: user._id,
                date: logDate,
                weight,
                mood,
                symptoms,
                notes
            });
            return NextResponse.json({ message: 'Health log created successfully', data: newLog });
        }

    } catch (error) {
        console.error('Error in health-log API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
