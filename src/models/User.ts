import { Schema, model, Document } from "mongoose";

export interface IDevice {
    deviceId: string;      // clientdan keladigan unique device id (browser fingerprint yoki uuid)
    token: string;         // refresh token shu qurilmaga tegishli
    lastUsed: Date;
}

export interface IAnswer {
    examId: string;        // qaysi exam session
    answers: Record<string, any>; // savol id => javob JSON
    submittedAt: Date;
    score: number
    total: number
    results: boolean[]
}

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    role: "student" | "instructor" | "admin";
    answers: IAnswer[];
    devices: IDevice[];
    active: boolean
}



const DeviceSchema = new Schema<IDevice>({
    token: { type: String, required: true },
    deviceId: { type: String, required: true },
    lastUsed: { type: Date, default: Date.now },
});



const UserSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "student" },
    active: { type: Boolean, default: true },
    answers: [
        {
            examId: { type: String, required: true },
            answers: { type: Schema.Types.Mixed, required: true },
            submittedAt: { type: Date, default: Date.now },
            score: { type: Number, required: true },
            total: { type: Number, required: true },
            results: { type: [Boolean], reuired: true }
        }
    ],
    devices: [DeviceSchema]
}, { timestamps: true });

export default model<IUser>("User", UserSchema);
