import { Schema, model, Document } from "mongoose";

export interface DescriptionType extends Document {
  Content: string;
  Boilerplate: string;
}

const DescriptionSchema = new Schema<DescriptionType>({
  Content: { type: String, required: true, unique: true },
  Boilerplate: { type: String, required: true },
});

export const DescriptionModel = model<DescriptionType>(
  "Descriptions",
  DescriptionSchema
);
