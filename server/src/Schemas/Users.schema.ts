import { Schema, model, Document } from "mongoose";

export interface UserType extends Document {
  Name: string;
  Email: string;
  Password: string;
}

const UserSchema = new Schema<UserType>({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, unique: true },
});

export const UserModel = model<UserType>("users", UserSchema);
