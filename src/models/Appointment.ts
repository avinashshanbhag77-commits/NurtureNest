import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    title: string;
    doctor?: string;
    location?: string;
    notes?: string;
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
    },
    { timestamps: true }
);

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
