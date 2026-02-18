import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";
import connectDB from '@/lib/mongodb';
import CommunityPost from '@/models/CommunityPost';
import User from '@/models/User';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const { id } = await params;
        const post = await CommunityPost.findOne({ _id: id, userId: user._id });
        if (!post) {
            // Check if it's the same user name if userId isn't set (legacy or different schema)
            const postByName = await CommunityPost.findOne({ _id: id, userName: user.name });
            if (!postByName) return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 });
            await CommunityPost.deleteOne({ _id: id });
        } else {
            await CommunityPost.deleteOne({ _id: id });
        }

        return NextResponse.json({ message: 'Post deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
