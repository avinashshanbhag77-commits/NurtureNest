import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    password?: string;
    dueDate?: Date;
    trimester?: string;
    subscriptionTier: 'free' | 'pro' | 'annual';
    subscriptionEndDate?: Date;
    usageStats: {
        aiRequests: number;
        doctorCalls: number;
        lastReset: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        password: { type: String }, // Optional for OAuth users
        dueDate: { type: Date },
        trimester: { type: String },
        subscriptionTier: {
            type: String,
            enum: ['free', 'pro', 'annual'],
            default: 'free'
        },
        subscriptionEndDate: { type: Date },
        usageStats: {
            aiRequests: { type: Number, default: 0 },
            doctorCalls: { type: Number, default: 0 },
            lastReset: { type: Date, default: Date.now },
        },
    },
    { timestamps: true }
);

// Prevent overwriting model during hot reload
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
