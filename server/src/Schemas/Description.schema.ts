import { Schema, model, Document } from "mongoose";

export interface DescriptionType extends Document {
  Content: string;
}

const DescriptionSchema = new Schema<DescriptionType>({
  Content: { type: String, required: true, unique: true },
});

export const DescriptionModel = model<DescriptionType>(
  "Descriptions",
  DescriptionSchema
);
