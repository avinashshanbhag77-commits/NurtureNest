import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { dueDate } = await req.json();
        if (!dueDate) {
            return NextResponse.json({ message: 'Missing due date' }, { status: 400 });
        }

        await dbConnect();
        await User.findOneAndUpdate(
            { email: session.user.email },
            { dueDate: new Date(dueDate) }
        );

        return NextResponse.json({ message: 'Due date updated' }, { status: 200 });

    } catch (error) {
        console.error('Update due date error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
