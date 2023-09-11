import { Schema, model, Document } from "mongoose";

export interface LangType extends Document {
  Name: string;
  Command: string;
  FileName: string;
}

const LangSchema = new Schema<LangType>({
  Name: { type: String, required: true, unique: true },
  Command: { type: String, required: true, unique: true },
  FileName: { type: String, required: true, unique: true },
});

export const LangModel = model<LangType>("langs", LangSchema);
