import { Schema, model, Document } from "mongoose";
import { TagType } from "./Tag.schema";
import { UserType } from "./Users.schema";

export interface QuestionType extends Document {
  Title: string;
  Tags: TagType["_id"][];
  Difficulty: "Easy" | "Medium" | "Hard";
  Creator_id: UserType["_id"];
  Content: string;
  Boilerplate: string;
}

const QuestionSchema = new Schema<QuestionType>({
  Title: { type: String, required: true, unique: true },
  Tags: [{ type: Schema.Types.ObjectId, required: true, ref: "tags" }],
  Difficulty: { type: String, required: true },
  Creator_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  Content: { type: String, required: true, unique: true },
  Boilerplate: { type: String, required: true },
});
export const QuestionModel = model<QuestionType>("questions", QuestionSchema);
