import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHealthLog extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    weight?: number;
    mood?: string;
    symptoms?: string[];
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const HealthLogSchema: Schema<IHealthLog> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        weight: { type: Number },
        mood: { type: String },
        symptoms: { type: [String] },
        notes: { type: String },
    },
    { timestamps: true }
);

const HealthLog: Model<IHealthLog> = mongoose.models.HealthLog || mongoose.model<IHealthLog>('HealthLog', HealthLogSchema);

export default HealthLog;
