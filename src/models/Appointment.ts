import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    title: string;
    doctor?: string;
    location?: string;
    notes?: string;
    status: 'SCHEDULED' | 'CANCELLED' | 'RESCHEDULED';
    statusLog: Array<{
        status: string;
        timestamp: Date;
        message: string;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        title: { type: String, required: true },
        doctor: { type: String },
        location: { type: String },
        notes: { type: String },
        status: {
            type: String,
            enum: ['SCHEDULED', 'CANCELLED', 'RESCHEDULED'],
            default: 'SCHEDULED'
        },
        statusLog: [{
            status: String,
            timestamp: { type: Date, default: Date.now },
            message: String
        }]
    },
    { timestamps: true }
);

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
