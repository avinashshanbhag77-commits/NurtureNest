import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment {
    userId: mongoose.Types.ObjectId;
    userName: string;
    text: string;
    createdAt: Date;
}

export interface ICommunityPost extends Document {
    userId: mongoose.Types.ObjectId;
    userName: string;
    userWeek?: string;
    title: string;
    content: string;
    likes: number;
    likedBy: mongoose.Types.ObjectId[];
    comments: IComment[];
    isPinned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const CommunityPostSchema: Schema<ICommunityPost> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        userName: { type: String, required: true },
        userWeek: { type: String },
        title: { type: String, required: true },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        comments: [CommentSchema],
        isPinned: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const CommunityPost: Model<ICommunityPost> = mongoose.models.CommunityPost || mongoose.model<ICommunityPost>('CommunityPost', CommunityPostSchema);

export default CommunityPost;
