import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { tier } = await req.json();
        if (!['free', 'pro', 'annual'].includes(tier)) {
            return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
        }

        await dbConnect();
        const updateData: any = {
            subscriptionTier: tier,
            // Reset usage stats on upgrade/change for demo purposes
            'usageStats.aiRequests': 0,
            'usageStats.doctorCalls': 0,
            'usageStats.lastReset': new Date()
        };

        if (tier !== 'free') {
            const endDate = new Date();
            if (tier === 'pro') endDate.setMonth(endDate.getMonth() + 1);
            if (tier === 'annual') endDate.setFullYear(endDate.getFullYear() + 1);
            updateData.subscriptionEndDate = endDate;
        }

        await User.findOneAndUpdate(
            { email: session.user.email },
            updateData
        );

        return NextResponse.json({ message: `Upgraded to ${tier} successfully` });
    } catch (error) {
        console.error('Error in upgrade API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
