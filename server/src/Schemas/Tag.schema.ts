import { Schema, model, Document } from "mongoose";

export interface TagType extends Document {
  Name: string;
}

const TagSchema = new Schema<TagType>({
  Name: { type: String, required: true, unique: true },
});

export const TagModel = model<TagType>("tags", TagSchema);
