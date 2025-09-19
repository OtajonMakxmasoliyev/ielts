import { Schema, model, Document, Types } from "mongoose";

export interface IQuestion extends Document {
    title: string;
    slug?: string;
    type: "multiple_choice" | "essay" | "fill_blank" | "listening" | "speaking" | "matching";
    bodyMarkdown: string;        // savol markdown ko'rinishida
    choices?: string[]; // MCQ
    metadata?: Record<string, any>; // timeLimit, difficulty, bandTarget...
    attachments?: { url: string; type: string }[]; // audio/images
    createdBy: Types.ObjectId | string; // ✅ bu yer
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
    published: boolean;
}
const QuestionSchema = new Schema<IQuestion>({
    title: { type: String, required: true },
    slug: { type: String, index: true },
    type: { type: String, required: true },
    bodyMarkdown: { type: String, required: true },
    choices: [String],
    metadata: { type: Schema.Types.Mixed },
    attachments: [{ url: { type: String }, type: { type: String }, }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    published: { type: Boolean, default: false },
}, { timestamps: true });

export default model<IQuestion>("Question", QuestionSchema);
