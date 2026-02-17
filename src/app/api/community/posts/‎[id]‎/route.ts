import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/db';
import Post from '@/models/Post';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectDB();
        const post = await Post.findOne({ _id: params.id, userId: session.user.id });
        if (!post) {
            // Check if it's the same user name if userId isn't set (legacy or different schema)
            const postByName = await Post.findOne({ _id: params.id, userName: session.user.name });
            if (!postByName) return NextResponse.json({ error: 'Post not found or unauthorized' }, { status: 404 });
            await Post.deleteOne({ _id: params.id });
        } else {
            await Post.deleteOne({ _id: params.id });
        }

        return NextResponse.json({ message: 'Post deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
