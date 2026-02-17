import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import CommunityPost from '@/models/CommunityPost';

export async function GET() {
    try {
        await dbConnect();
        const posts = await CommunityPost.find().sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, content, userWeek } = await req.json();
        if (!title || !content) {
            return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const newPost = await CommunityPost.create({
            userId: user._id,
            userName: user.name,
            userWeek: userWeek || 'Week 16', // Default or from user logic
            title,
            content,
            likes: 0,
            comments: [],
            isPinned: false
        });

        return NextResponse.json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
